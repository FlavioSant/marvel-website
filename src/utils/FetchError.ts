export type ResponseData = ResponseDataJSON | ResponseDataText;

export interface ResponseDataJSON {
  type: 'application/json';
  body: Record<string, any>;
}

export interface ResponseDataText {
  type: 'plain';
  body: string;
}

export class FetchError extends Error {
  public name: 'FetchError';
  public status: number;
  public data: ResponseData;

  constructor(response: Response, data: ResponseData) {
    super(
      `Fetch Error: Falha ao requisitar "${response.url}" com status: "${response.status}"`,
    );

    this.name = 'FetchError';
    this.status = response.status;
    this.data = data;
  }
}
