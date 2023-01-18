import { createFetchError } from './createFectchError';

export interface FetchAPIRequestInit extends Omit<RequestInit, 'body'> {
  body?: Record<string, any>;
}

export interface FetchAPIResponse<T> {
  response: Response;
  data?: T;
}

export const fetchAPI = async <T = Record<string, any>>(
  input: RequestInfo,
  init?: FetchAPIRequestInit,
): Promise<FetchAPIResponse<T>> => {
  const apiURL = import.meta.env.VITE_API_URL;

  const urlSearchParams = new URLSearchParams();

  urlSearchParams.append('ts', import.meta.env.VITE_API_TS);
  urlSearchParams.append('apikey', import.meta.env.VITE_API_KEY);
  urlSearchParams.append('hash', import.meta.env.VITE_API_HASH);

  const hasFilterParams = input.toString().includes('?');

  const requestURL = `${apiURL}${input}${
    hasFilterParams ? '&' : '?'
  }${urlSearchParams.toString()}`;

  const response = await fetch(requestURL, {
    ...init,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      ...init?.headers,
    },
    ...(init?.body
      ? { body: JSON.stringify({ ...init.body }) }
      : { body: null }),
  });

  const status = response.status;

  if (status !== 200 && status !== 201 && status !== 204) {
    const error = await createFetchError(response);

    throw error;
  }

  if (status === 204) {
    return { response };
  }

  const data = await response.json();

  return { response, data };
};
