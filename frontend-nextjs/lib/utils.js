export function timeoutPromise(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

export function createAsyncReader(asyncFn) {
  let status = 'pending';
  let result, error;

  const suspender = asyncFn().then(r => {
    status = 'success';
    result = r;
  }, e => {
    status = 'failed';
    error = e;
  });

  return () => {
    if (status === 'pending') throw suspender; // KEY POINT: throw promise!
    if (status === 'failed') throw error;
    if (status === 'success') return result;
  }
}

const dataReaders = new Map();
if (typeof window !== 'undefined') {
  window.dataReaders = dataReaders;
}
export function useData(key, fetcher) {
  prepareDataReader(key, fetcher);
  return [dataReaders.get(key), { [`data-${key}`]: JSON.stringify(dataReaders.get(key)()) }];
}

function prepareDataReader(key, fetcher) {
  if (dataReaders.has(key)) return;
  if (typeof window !== 'undefined') {
    let value;
    try {
      value = JSON.parse((document.querySelector(`[data-${key}]`).dataset)[key]);
    } catch (_e) {}

    if (typeof value !== 'undefined') {
      dataReaders.set(key, () => value);
      return;
    }
  }
  dataReaders.set(
    key,
    createAsyncReader(async () => fetcher(key)),
  );
}
