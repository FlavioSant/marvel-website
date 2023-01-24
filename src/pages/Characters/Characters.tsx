import { useEffect, useState } from 'react';
import { DefaultLayout } from '../../components/layout/DefaultLayout';

import { fetchAPI } from '../../functions/fetchAPI';
import { useHandler } from '../../hooks/useHandler';
import { useFilterParams } from '../../hooks/useFilterParams';

import { Loading } from '../../components/Loading';
import { Select } from '../../components/forms/Select';
import { CharacterList } from '../../components/CharacterList';
import { GetMoreButton } from '../../components/GetMoreButton';

import banner from '../../assets/marvel-banner.jpg';

export const Characters = () => {
  const { handler } = useHandler();
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
  const [isLoadingMoreCharacters, setIsLoadingMoreCharacters] = useState(false);
  const [orderBy, setOrderBy] = useState('');
  const [pagination, setPagination] = useState({ page: 1, perPage: 50 });

  const [requestData, setRequestData] = useState<RequestData<Character> | null>(
    null,
  );

  const searchParams = useFilterParams({ orderBy, pagination });

  const fetchInitialData = handler(async () => {
    setIsLoadingInitialData(true);

    try {
      const { data } = await fetchAPI<RequestData<Character>>(
        `/characters?limit=50&offset=0`,
      );

      if (!data) {
        throw new Error('Failed to get characters.');
      }

      setRequestData(data);
    } finally {
      setIsLoadingInitialData(false);
    }
  });

  const fetchMoreCharacters = handler(async () => {
    setIsLoadingMoreCharacters(true);

    try {
      const { data } = await fetchAPI<RequestData<Character>>(
        `/characters?${searchParams.toString()}`,
      );

      if (!data) {
        throw new Error('Failed to get more characters.');
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
      setIsLoadingMoreCharacters(false);
    }
  });

  const fetchCharactersByOrder = handler(async () => {
    setIsLoadingInitialData(true);

    try {
      const { data } = await fetchAPI<RequestData<Character>>(
        `/characters?${searchParams.toString()}`,
      );

      if (!data) {
        throw new Error('Failed to get characters.');
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
      fetchMoreCharacters();
    }
  }, [pagination.page, pagination.perPage]);

  useEffect(() => {
    if (orderBy) {
      fetchCharactersByOrder();
    }
  }, [orderBy]);

  const totalCount = requestData?.data.total || 0;

  return (
    <DefaultLayout attributionHTML={requestData?.attributionHTML}>
      <section id="hero" className="relative">
        <img
          src={banner}
          alt="Banner"
          className="w-full h-[400px] object-cover"
        />
        <div className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-full bg-black/75">
          <h1 className="font-semibold text-4xl sm:text-6xl text-neutral-200 uppercase">
            Personagens
          </h1>
          <p className="font-medium text-center text-lg text-neutral-200 mt-4">
            Conheça os personagens do poderoso universo cinematográfico da
            Marvel.
          </p>
        </div>
      </section>

      <section
        id="personagens"
        className="bg-neutral-100 min-h-[calc(100vh_-_120px)]"
      >
        <div className="container mx-auto py-20 px-4 lg:px-0">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
            <h2 className="font-medium text-2xl text-neutral-800">
              Lista de personagens:
            </h2>

            <Select
              name="orderBy"
              label="Ordenar por"
              className="w-64"
              value={orderBy}
              onChange={value => setOrderBy(value)}
              options={[
                { label: 'Nome ascendente', value: 'name' },
                { label: 'Nome descendente', value: '-name' },
                { label: 'Modificação ascendente', value: 'modified' },
                { label: 'Modificação descendente', value: '-modified' },
              ]}
            />
          </div>

          <hr className="h-px mt-2 mb-8 bg-neutral-200 border-0" />

          {isLoadingInitialData ? (
            <Loading />
          ) : (
            <>
              {requestData && requestData.data.results.length > 0 ? (
                <CharacterList characters={requestData.data.results} />
              ) : (
                <p className="flex justify-center font-medium text-base text-neutral-800">
                  Nenhum personangem encontrado.
                </p>
              )}

              <GetMoreButton
                type="button"
                isLoading={isLoadingMoreCharacters}
                disabled={requestData?.data.results.length === totalCount}
                onClick={() =>
                  setPagination({ ...pagination, page: pagination.page + 1 })
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
