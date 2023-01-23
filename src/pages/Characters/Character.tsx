import { useParams } from 'react-router-dom';
import { useQuery } from '../../hooks/useQuery';
import { ComicList } from './components/ComicList';
import { SerieList } from './components/SerieList';
import { Fallback } from '../../components/Fallback';
import { DefaultLayout } from '../../components/layout/DefaultLayout';

export const Character = () => {
  const params = useParams();

  const queryCharacter = useQuery<RequestData<Character>>(
    `/characters/${params.id}`,
  );
  const queryComics = useQuery<RequestData<Comic>>(
    `/characters/${params.id}/comics?limit=10&offset=0&orderBy=-focDate`,
  );
  const querySeries = useQuery<RequestData<Serie>>(
    `/characters/${params.id}/series?limit=10&offset=0&orderBy=-startYear`,
  );

  const character = queryCharacter.fallback
    ? null
    : queryCharacter.data.data.results[0];
  const comics = queryComics.fallback ? null : queryComics.data.data;
  const series = querySeries.fallback ? null : querySeries.data.data;

  return (
    <DefaultLayout attributionHTML={queryCharacter.data?.attributionHTML}>
      <section
        id="personagem"
        className="bg-neutral-100 min-h-[calc(100vh_-_120px)]"
      >
        {queryCharacter.fallback ? (
          <Fallback
            error={queryCharacter.error}
            isLoading={queryCharacter.isLoading}
          />
        ) : (
          <>
            {character && (
              <>
                <section id="hero" className="bg-neutral-900">
                  <div className="container mx-auto py-20 px-4 xl:px-0">
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                      <figure className="min-h-[410px] max-h-[640px] md:h-[420px] lg:w-[40%] lg:max-w-[405px]">
                        <img
                          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                          alt={character.name}
                          className="w-full h-full"
                        />
                      </figure>

                      <div className="flex flex-col w-full">
                        <h1 className="font-semibold text-4xl sm:text-6xl mx-auto text-neutral-50 uppercase">
                          {character.name}
                        </h1>

                        <div className="h-1 w-8 mx-auto my-4 bg-red-500 border-0" />

                        <p className="font-medium text-lg text-neutral-200 text-center mx-auto max-w-[800px]">
                          {character.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="comics">
                  <div className="container mx-auto pt-20 px-4 xl:px-0">
                    <h2 className="font-semibold text-2xl text-neutral-800">
                      Últimos Quadrinhos:
                    </h2>

                    {queryComics.fallback ? (
                      <Fallback
                        error={queryComics.error}
                        isLoading={queryComics.isLoading}
                      />
                    ) : (
                      <>
                        {comics && comics.results.length > 0 ? (
                          <ComicList comics={comics.results} />
                        ) : (
                          <p className="font-medium text-xl text-neutral-800">
                            Nenhum quadrinho encontrado.
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </section>

                <div className="container mx-auto px-4 xl:px-0">
                  <hr className="h-px my-20 bg-neutral-200 border-0" />
                </div>

                <section id="series">
                  <div className="container mx-auto pb-20 px-4 xl:px-0">
                    <h2 className="font-semibold text-2xl text-neutral-800">
                      Últimas Séries:
                    </h2>

                    {querySeries.fallback ? (
                      <Fallback
                        error={querySeries.error}
                        isLoading={querySeries.isLoading}
                      />
                    ) : (
                      <>
                        {series && series.results.length > 0 ? (
                          <SerieList series={series.results} />
                        ) : (
                          <p className="font-medium text-xl text-neutral-800">
                            Nenhum quadrinho encontrado.
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </section>
              </>
            )}
          </>
        )}
      </section>
    </DefaultLayout>
  );
};
