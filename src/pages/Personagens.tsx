import { useQuery } from '../hooks/useQuery';
import { Fallback } from '../components/Fallback';
import { DefaultLayout } from '../components/layout/DefaultLayout';

import banner from '../assets/marvel-banner.jpg';

export const Personagens = () => {
  const urlSearchParams = new URLSearchParams();

  urlSearchParams.append('orderBy', 'name');
  urlSearchParams.append('limit', '18');
  urlSearchParams.append('offset', '0');

  const query = useQuery<RequestData<Character>>(
    `/characters?${urlSearchParams.toString()}`,
  );

  console.log({ query: query.data });

  return (
    <DefaultLayout>
      <section id="hero" className="relative">
        <img
          src={banner}
          alt="Banner"
          className="w-full h-[400px] object-cover"
        />
        <div className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-full bg-black/75">
          <h1 className="font-semibold text-6xl text-neutral-200 uppercase">
            Personagens
          </h1>
          <p className="font-medium text-center text-lg text-neutral-200 mt-4">
            Conheça os personagens do poderoso universo cinematográfico da
            Marvel.
          </p>
        </div>
      </section>

      {query.fallback ? (
        <Fallback error={query.error} isLoading={query.isLoading} />
      ) : (
        <section id="personagens" className="bg-neutral-100">
          <div className="container mx-auto p-4 lg:p-6">
            <div className="grid grid-cols-6 gap-4 lg:gap-6">
              {query.data.data.results.map(character => (
                <div key={character.id} className="bg-neutral-900">
                  <figure className="h-[170px] lg:h-[210px]">
                    <img
                      src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                      className="w-full h-full"
                    />
                  </figure>

                  <div className="border-t-4 border-red-500 px-4 pt-4 pb-8">
                    <p className="font-bold uppercase text-base text-neutral-50">
                      {character.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </DefaultLayout>
  );
};
