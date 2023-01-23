interface ComicListProps {
  comics: Comic[];
}

export const ComicList = ({ comics }: ComicListProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5 mt-6">
      {comics.map(comic => (
        <div key={`comic-${comic.id}`} className="flex flex-col gap-4">
          <img
            alt={comic.title}
            className="w-full h-auto shadow-xl"
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          />

          <h5 className="font-semibold text-xl uppercase">{comic.title}</h5>
        </div>
      ))}
    </div>
  );
};
