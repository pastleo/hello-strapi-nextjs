import { useState, useEffect, useCallback } from 'react';

export function useLocalState(key, defaultValue) {
  const [state, setState] = useState(defaultValue);
  const updateState = useCallback((newState) => {
    localStorage.setItem(key, JSON.stringify(newState));
    setState(newState)
  }, []);

  useEffect(() => {
    const existingItemJSON = localStorage.getItem(key);
    if (existingItemJSON === null) return;

    try {
      setState(JSON.parse(existingItemJSON))
    } catch (jsonErr) {
      console.error(jsonErr);
    }
  }, []);

  return [state, updateState];
}

export function useErrorMsg() {
  const [authError, setAuthError] = useState('');
  const receiveError = useCallback(error => {
    const errorMessages = [
      error.message,
      ...Object.entries(error.details).map(([key, err]) => `${key}: ${err.message}`)
    ];
    console.log({ errorMessages });
    setAuthError(errorMessages.join(', '))
  }, []);

  return [authError, receiveError];
}
