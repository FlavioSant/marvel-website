interface RequestData<T> {
  attributionHTML: string;
  attributionText: string;
  code: number;
  copyright: string;
  data: {
    count: number;
    limit: number;
    offset: number;
    results: T[];
    total: number;
  };
  etag: string;
  status: string;
}
