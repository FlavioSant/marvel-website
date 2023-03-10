import { Link, useParams } from 'react-router-dom';
import { useQuery } from '../../hooks/useQuery';
import { ComicList } from '../../components/ComicList';
import { SerieList } from '../../components/SerieList';
import { Fallback } from '../../components/Fallback';
import { DefaultLayout } from '../../components/layout/DefaultLayout';

export const Creator = () => {
  const params = useParams();

  const queryCreator = useQuery<RequestData<Creator>>(`/creators/${params.id}`);
  const queryCreatorComics = useQuery<RequestData<Comic>>(
    `/creators/${params.id}/comics?limit=10&offset=0&orderBy=-focDate`,
  );
  const querySeries = useQuery<RequestData<Serie>>(
    `/creators/${params.id}/series?limit=10&offset=0&orderBy=-startYear`,
  );

  const creator = queryCreator.fallback
    ? null
    : queryCreator.data.data.results[0];
  const comics = queryCreatorComics.fallback
    ? null
    : queryCreatorComics.data.data;
  const series = querySeries.fallback ? null : querySeries.data.data;

  return (
    <DefaultLayout attributionHTML={queryCreator.data?.attributionHTML}>
      <div className="bg-neutral-100 min-h-[calc(100vh_-_120px)]">
        {queryCreator.fallback ? (
          <Fallback
            error={queryCreator.error}
            isLoading={queryCreator.isLoading}
          />
        ) : (
          <>
            {creator && (
              <>
                <section id="hero" className="bg-neutral-900">
                  <div className="container mx-auto py-20 px-4 xl:px-0">
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                      <figure className="min-h-[410px] max-h-[640px] md:h-[420px] lg:w-[40%] lg:max-w-[405px]">
                        <img
                          src={`${creator.thumbnail.path}.${creator.thumbnail.extension}`}
                          alt={creator.fullName}
                          className="w-full h-full object-contain"
                        />
                      </figure>

                      <div className="flex flex-col w-full">
                        <h1 className="font-semibold text-4xl sm:text-6xl mx-auto text-neutral-50 uppercase">
                          {creator.fullName}
                        </h1>

                        <div className="h-1 w-8 mx-auto my-4 bg-red-500 border-0" />
                      </div>
                    </div>
                  </div>
                </section>

                <section id="comics">
                  <div className="container mx-auto pt-20 px-4 xl:px-0">
                    <h2 className="font-semibold text-2xl text-neutral-800">
                      ??ltimos Quadrinhos:
                    </h2>

                    {queryCreatorComics.fallback ? (
                      <Fallback
                        error={queryCreatorComics.error}
                        isLoading={queryCreatorComics.isLoading}
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

                        <Link
                          to={`/creators/${params.id}/comics`}
                          className='block w-full md:w-max mx-auto mt-10 relative bg-red-500 disabled:bg-red-400 disabled:cursor-not-allowed before:h-4 before:ml-4 before:bg-red-500 before:border-red-500 before:border-solid before:border-t-0 before:border-r-0 before:border-b-[16px] before:border-l-[16px] before:block after:content-[""] after:block after:h-4 after:mr-4 after:bg-red-500 after:border-solid after:border-red-500 after:border-t-[16px] after:border-r-[16px] after:border-b-0 after:border-l-0'
                        >
                          <span className="block px-9 text-neutral-50 font-medium uppercase text-sm text-center before:content-[''] before:border-t-0 before:border-r-0 before:border-b-[16px] before:border-l-[16px] before:border-solid before:border-[#e62429_#f5f5f5] before:block before:absolute before:left-0 before:top-0 after:content-[''] after:block after:absolute after:bottom-0 after:right-0 after:border-solid after:border-[#e62429_#f5f5f5] after:border-t-[16px] after:border-r-[16px] after:border-b-0 after:border-l-0 after:transform-[rotate(180deg)]">
                            Ver todos os quadrinhos de {creator.fullName}
                          </span>
                        </Link>
                      </>
                    )}
                  </div>
                </section>

                <div className="container mx-auto px-4 xl:px-0">
                  <hr className="h-px my-10 md:my-20 bg-neutral-200 border-0" />
                </div>

                <section id="series">
                  <div className="container mx-auto pb-20 px-4 xl:px-0">
                    <h2 className="font-semibold text-2xl text-neutral-800">
                      ??ltimas S??ries:
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
                            Nenhuma serie encontrada.
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
