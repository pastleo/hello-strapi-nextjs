import { request as graphqlRequest } from 'graphql-request';

export async function fetchAPI(path, reqOptions = {}) {
  const { headers, ...options } = reqOptions;
  const res = await fetch([process.env.API_HOST, path].join(''), {
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    ...options,
  });
  return {
    ok: res.ok,
    ...(await res.json()),
  };
}

export function fetchAuthAPI(path, auth, reqOptions = {}) {
  const { headers, ...options } = reqOptions;
  return fetchAPI(path, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
      ...headers
    },
    ...options,
  });
}

export function graphqlFetcher(query) {
  return graphqlRequest(`${process.env.API_HOST}/graphql`, query);
}
