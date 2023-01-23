interface SerieListProps {
  series: Serie[];
}

export const SerieList = ({ series }: SerieListProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5 mt-6">
      {series.map(serie => (
        <div key={`serie-${serie.id}`} className="flex flex-col gap-4">
          <img
            alt={serie.title}
            className="w-full h-auto max-h-[500px] shadow-xl"
            src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`}
          />

          <h5 className="font-semibold text-lg uppercase">{serie.title}</h5>
        </div>
      ))}
    </div>
  );
};
