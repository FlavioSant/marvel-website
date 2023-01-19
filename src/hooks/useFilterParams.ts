interface UseFilterParamsProps {
  orderBy: string | null;
  pagination?: {
    page: number;
    perPage: number;
  };
}

export const useFilterParams = ({
  orderBy,
  pagination,
}: UseFilterParamsProps) => {
  const urlSearchParams = new URLSearchParams();

  if (orderBy) {
    urlSearchParams.append('orderBy', orderBy);
  }

  if (pagination) {
    const offset = Math.ceil(pagination.perPage * (pagination.page - 1));

    urlSearchParams.append('offset', offset ? `${offset}` : `${0}`);
  }

  if (pagination && pagination.perPage) {
    urlSearchParams.append(
      'limit',
      pagination.perPage ? `${pagination.perPage}` : '',
    );
  }

  return urlSearchParams;
};
