import { useEffect, useState } from 'react';
import { fetchAPI } from '../../functions/fetchAPI';
import { useHandler } from '../../hooks/useHandler';
import { useFilterParams } from '../../hooks/useFilterParams';

import { Loading } from '../../components/Loading';
import { Select } from '../../components/forms/Select';
import { CreatorList } from '../../components/CreatorList';
import { GetMoreButton } from '../../components/GetMoreButton';
import { DefaultLayout } from '../../components/layout/DefaultLayout';

import bannerComics from '../../assets/banner-comics.jpg';

export const Creators = () => {
  const { handler } = useHandler();
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
  const [isLoadingMoreCreators, setIsLoadingMoreCreators] = useState(false);
  const [orderBy, setOrderBy] = useState('');
  const [pagination, setPagination] = useState({ page: 1, perPage: 50 });

  const [requestData, setRequestData] = useState<RequestData<Creator> | null>(
    null,
  );

  const searchParams = useFilterParams({ orderBy, pagination });

  const fetchInitialData = handler(async () => {
    setIsLoadingInitialData(true);

    try {
      const { data } = await fetchAPI<RequestData<Creator>>(
        `/creators?limit=50&offset=0&orderBy=firstName`,
      );

      if (!data) {
        throw new Error('Failed to get creators.');
      }

      setRequestData(data);
    } finally {
      setIsLoadingInitialData(false);
    }
  });

  const fetchMoreCreators = handler(async () => {
    setIsLoadingMoreCreators(true);

    try {
      const { data } = await fetchAPI<RequestData<Creator>>(
        `/creators?${searchParams.toString()}`,
      );

      if (!data) {
        throw new Error('Failed to get more creators.');
      }

      const newResults = data.data.results;

      setRequestData(state =>
        state
          ? {
              ...state,
              data: {
                ...state.data,
                results: [...state.data.results, ...newResults],
              },
            }
          : null,
      );
    } finally {
      setIsLoadingMoreCreators(false);
    }
  });

  const fetchCreatorsByOrder = handler(async () => {
    setIsLoadingInitialData(true);

    try {
      const { data } = await fetchAPI<RequestData<Creator>>(
        `/creators?${searchParams.toString()}`,
      );

      if (!data) {
        throw new Error('Failed to get creators.');
      }

      setRequestData(data);
    } finally {
      setIsLoadingInitialData(false);
    }
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (pagination.page > 1) {
      fetchMoreCreators();
    }
  }, [pagination.page, pagination.perPage]);

  useEffect(() => {
    if (orderBy) {
      fetchCreatorsByOrder();
    }
  }, [orderBy]);

  const totalCount = requestData?.data.total || 0;

  return (
    <DefaultLayout attributionHTML={requestData?.attributionHTML}>
      <section id="hero" className="relative">
        <img
          src={bannerComics}
          alt="Banner"
          className="w-full h-[400px] object-cover"
        />
        <div className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-full bg-black/75">
          <h1 className="font-semibold text-4xl sm:text-6xl text-neutral-200 uppercase">
            Criadores
          </h1>
          <p className="font-medium text-center text-lg text-neutral-200 mt-4">
            Conheça quem são os grandes criadores das histórias em quadrinhos.
          </p>
        </div>
      </section>

      <section
        id="criadores"
        className="bg-neutral-100 min-h-[calc(100vh_-_120px)]"
      >
        <div className="container mx-auto py-20 px-4 md:px-0">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
            <h2 className="font-medium text-2xl text-neutral-800">
              Lista de criadores:
            </h2>

            <Select
              name="orderBy"
              label="Ordenar por"
              className="w-64"
              value={orderBy}
              onChange={value => setOrderBy(value)}
              options={[
                { label: 'Nome de A-Z', value: 'firstName' },
                { label: 'Nome de Z-A', value: '-firstName' },
                { label: 'Sobrenome de A-Z', value: 'lastName' },
                { label: 'Sobrenome de Z-A', value: '-lastName' },
              ]}
            />
          </div>

          <hr className="h-px mt-2 mb-8 bg-neutral-200 border-0" />

          {isLoadingInitialData ? (
            <Loading />
          ) : (
            <>
              {requestData && requestData.data.results.length > 0 ? (
                <CreatorList creators={requestData.data.results} />
              ) : (
                <p className="flex justify-center font-medium text-base text-neutral-800">
                  Nenhum criador encontrado.
                </p>
              )}

              <GetMoreButton
                type="button"
                isLoading={isLoadingMoreCreators}
                disabled={requestData?.data.results.length === totalCount}
                onClick={() =>
                  setPagination({
                    ...pagination,
                    page: pagination.page + 1,
                  })
                }
              >
                Carregar mais
              </GetMoreButton>
            </>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
};
