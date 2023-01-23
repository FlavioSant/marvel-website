import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '../../hooks/useQuery';
import { useHandler } from '../../hooks/useHandler';
import { useFilterParams } from '../../hooks/useFilterParams';
import { fetchAPI } from '../../functions/fetchAPI';

import { Loading } from '../../components/Loading';
import { ComicList } from '../../components/ComicList';
import { Fallback } from '../../components/Fallback';
import { Select } from '../../components/forms/Select';
import { GetMoreButton } from '../../components/GetMoreButton';
import { DefaultLayout } from '../../components/layout/DefaultLayout';

import bannerComics from '../../assets/banner-comics.jpg';

export const CharacterComics = () => {
  const params = useParams();
  const { handler } = useHandler();
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
  const [isLoadingMoreComics, setIsLoadingMoreComics] = useState(false);
  const [orderBy, setOrderBy] = useState('');
  const [pagination, setPagination] = useState({ page: 1, perPage: 50 });

  const [requestData, setRequestData] = useState<RequestData<Comic> | null>(
    null,
  );

  const queryCharacter = useQuery<RequestData<Character>>(
    `/characters/${params.id}`,
  );

  const searchParams = useFilterParams({ orderBy, pagination });

  const fetchInitialData = handler(async () => {
    setIsLoadingInitialData(true);

    try {
      const { data } = await fetchAPI<RequestData<Comic>>(
        `/characters/${params.id}/comics?limit=50&offset=0&orderBy=title`,
      );

      if (!data) {
        throw new Error('Failed to get characters.');
      }

      setRequestData(data);
    } finally {
      setIsLoadingInitialData(false);
    }
  });

  const fetchMoreCharacterComics = handler(async () => {
    setIsLoadingMoreComics(true);

    try {
      const { data } = await fetchAPI<RequestData<Comic>>(
        `/characters/${params.id}/comics?${searchParams.toString()}`,
      );

      if (!data) {
        throw new Error('Failed to get more character comics.');
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
      setIsLoadingMoreComics(false);
    }
  });

  const fetchCharacterComicsByOrder = handler(async () => {
    setIsLoadingInitialData(true);

    try {
      const { data } = await fetchAPI<RequestData<Comic>>(
        `/characters/${params.id}/comics?${searchParams.toString()}`,
      );

      if (!data) {
        throw new Error('Failed to get character comics.');
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
      fetchMoreCharacterComics();
    }
  }, [pagination.page, pagination.perPage]);

  useEffect(() => {
    if (orderBy) {
      fetchCharacterComicsByOrder();
    }
  }, [orderBy]);

  const character = queryCharacter.fallback
    ? null
    : queryCharacter.data.data.results[0];

  const totalCount = requestData?.data.total || 0;

  return (
    <DefaultLayout attributionHTML={requestData?.attributionHTML}>
      {queryCharacter.fallback ? (
        <Fallback
          error={queryCharacter.error}
          isLoading={queryCharacter.isLoading}
        />
      ) : (
        <>
          <section id="hero" className="relative">
            <img
              src={bannerComics}
              alt="Banner"
              className="w-full h-[400px] object-cover"
            />
            <div className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-full bg-black/75">
              <h1 className="font-semibold text-4xl sm:text-6xl text-neutral-200 uppercase">
                Quadrinhos
              </h1>
              {character && (
                <p className="font-medium text-center text-lg text-neutral-200 mt-4">
                  Conheça todos os quadrinhos em que {character.name} faz parte.
                </p>
              )}
            </div>
          </section>

          <section
            id="personagens"
            className="bg-neutral-100 min-h-[calc(100vh_-_120px)]"
          >
            <div className="container mx-auto py-20 px-4 md:px-0">
              {isLoadingInitialData ? (
                <Loading />
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
                    <h2 className="font-medium text-2xl text-neutral-800">
                      Lista de quadrinhos:
                    </h2>

                    <Select
                      name="orderBy"
                      label="Ordenar por"
                      className="w-64"
                      value={orderBy}
                      onChange={value => setOrderBy(value)}
                      options={[
                        { label: 'Título de A-Z', value: 'title' },
                        { label: 'Título de Z-A', value: '-title' },
                        { label: 'Data de venda', value: 'onsaleDate' },
                        { label: 'Número de emissão', value: 'issueNumber' },
                      ]}
                    />
                  </div>

                  <hr className="h-px mt-2 mb-8 bg-neutral-200 border-0" />

                  {requestData && requestData.data.results.length > 0 ? (
                    <ComicList comics={requestData.data.results} />
                  ) : (
                    <p className="flex justify-center font-medium text-base text-neutral-800">
                      Nenhum quadrinho encontrado.
                    </p>
                  )}

                  <GetMoreButton
                    type="button"
                    isLoading={isLoadingMoreComics}
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
        </>
      )}
    </DefaultLayout>
  );
};
