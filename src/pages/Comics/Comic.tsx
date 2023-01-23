import { useParams } from 'react-router-dom';
import { CharacterList } from '../../components/CharacterList';
import { Fallback } from '../../components/Fallback';
import { DefaultLayout } from '../../components/layout/DefaultLayout';
import { useQuery } from '../../hooks/useQuery';

export const Comic = () => {
  const params = useParams();

  const queryComic = useQuery<RequestData<Comic>>(`/comics/${params.id}`);
  const queryComicCharacters = useQuery<RequestData<Character>>(
    `/comics/${params.id}/characters`,
  );

  const comic = queryComic.fallback ? null : queryComic.data.data.results[0];
  const comicCharacters = queryComicCharacters.fallback
    ? null
    : queryComicCharacters.data.data.results;

  return (
    <DefaultLayout attributionHTML={queryComic.data?.attributionHTML}>
      <div className="bg-neutral-100 min-h-[calc(100vh_-_120px)]">
        {queryComic.fallback ? (
          <Fallback error={queryComic.error} isLoading={queryComic.isLoading} />
        ) : (
          <>
            {comic && (
              <>
                <section id="hero" className="bg-neutral-900">
                  <div className="container mx-auto py-20 px-4 xl:px-0">
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                      <figure>
                        <img
                          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                          alt={comic.title}
                          className="w-full h-full"
                        />
                      </figure>

                      <div className="flex flex-col w-full">
                        <h1 className="font-semibold text-4xl mx-auto text-neutral-50 uppercase">
                          {comic.title}
                        </h1>

                        <div className="h-1 w-8 mx-auto my-4 bg-red-500 border-0" />

                        <p className="font-medium text-lg text-neutral-50 text-center mx-auto max-w-[800px]">
                          Criadores:
                        </p>

                        {comic.creators && (
                          <div className="flex flex-wrap gap-4 mx-auto mt-4">
                            {comic.creators.items.map(creator => (
                              <div
                                key={`creator-${creator.name}`}
                                className="py-1 px-3 rounded bg-neutral-600 w-max"
                              >
                                <p className="font-medium text-sm text-neutral-100">
                                  {creator.name}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        <p className="font-base text-lg text-neutral-200 text-center mt-10 mx-auto max-w-[800px]">
                          {comic.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="characters">
                  <div className="container mx-auto py-20 px-4 xl:px-0">
                    <h2 className="font-semibold text-2xl text-neutral-800">
                      Personagens:
                    </h2>

                    {queryComicCharacters.fallback ? (
                      <Fallback
                        error={queryComicCharacters.error}
                        isLoading={queryComicCharacters.isLoading}
                      />
                    ) : (
                      <>
                        {comicCharacters && comicCharacters.length > 0 ? (
                          <CharacterList characters={comicCharacters} />
                        ) : (
                          <p className="font-medium text-xl text-neutral-800">
                            Nenhum personagem encontrado.
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
      </div>
    </DefaultLayout>
  );
};
