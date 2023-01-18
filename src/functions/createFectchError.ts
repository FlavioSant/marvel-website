import { FetchError, ResponseData } from '../utils/FetchError';

export const createFetchErrorData = async (
  response: Response,
): Promise<ResponseData> => {
  const type = response.headers.get('content-type');

  if (
    type &&
    typeof type === 'string' &&
    type.indexOf('application/json') > -1
  ) {
    const body = await response.json();

    return {
      type: 'application/json',
      body,
    };
  }

  const body = await response.text();

  return {
    type: 'plain',
    body,
  };
};

export const createFetchError = async (response: Response) => {
  const data = await createFetchErrorData(response);

  return new FetchError(response, data);
};
