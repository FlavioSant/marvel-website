import { useEffect, useState } from 'react';
import { fetchAPI } from '../functions/fetchAPI';

export interface UseQueryRequestInit extends Omit<RequestInit, 'body'> {
  body?: Record<string, any>;
}

export interface UseQuery<T> {
  data: T | null;
  error: Error | null;
}

export type UseQueryResult<T> =
  | UseQueryResultLoading
  | UseQueryResultError
  | UseQueryResultEmpty
  | UseQueryResultSuccess<T>;

export type UseQueryResultLoading = {
  state: 'loading';
  fallback: true;
  isLoading: true;
  error: null;
  data: null;
  refetch: () => Promise<void>;
};

export type UseQueryResultError = {
  state: 'error';
  fallback: true;
  isLoading: false;
  error: Error;
  data: null;
  refetch: () => Promise<void>;
};

export interface UseQueryResultEmpty {
  state: 'empty';
  fallback: true;
  isLoading: false;
  error: null;
  data: null;
  refetch: () => Promise<void>;
}

export interface UseQueryResultSuccess<T> {
  state: 'fullfilled';
  fallback: false;
  isLoading: false;
  error: null;
  data: T;
  refetch: () => Promise<void>;
}

export const useQuery = <T = Record<string, any>>(
  input: RequestInfo,
  init?: UseQueryRequestInit,
): UseQueryResult<T> => {
  const [isLoading, setIsLoading] = useState(true);
  const [queryState, setQueryState] = useState<UseQuery<T>>({
    data: null,
    error: null,
  });

  const fetchQuery = async () => {
    setIsLoading(true);

    try {
      const { data } = await fetchAPI<T>(input, { ...init });

      if (!data) {
        setQueryState({ data: null, error: null });
        return;
      }

      setQueryState({ data, error: null });
    } catch (err) {
      setQueryState({ data: null, error: err as Error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuery();
  }, [JSON.stringify(input), JSON.stringify(init)]);

  const refetch = fetchQuery;

  if (isLoading) {
    return {
      state: 'loading',
      fallback: true,
      isLoading: true,
      error: null,
      data: null,
      refetch,
    };
  }

  if (queryState.error) {
    return {
      state: 'error',
      fallback: true,
      isLoading: false,
      error: queryState.error,
      data: null,
      refetch,
    };
  }

  if (!queryState.data) {
    return {
      state: 'empty',
      fallback: true,
      isLoading: false,
      error: null,
      data: null,
      refetch,
    };
  }

  return {
    state: 'fullfilled',
    fallback: false,
    isLoading: false,
    error: null,
    data: queryState.data,
    refetch,
  };
};
