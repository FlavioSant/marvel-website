import { Link } from 'react-router-dom';

interface ComicListProps {
  comics: Comic[];
}

export const ComicList = ({ comics }: ComicListProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5 mt-6">
      {comics.map(comic => (
        <Link
          key={`comic-${comic.id}`}
          to={`/comics/${comic.id}`}
          className="flex flex-col gap-4 overflow-hidden cursor-pointer transform transition duration-200 hover:scale-105"
        >
          <img
            alt={comic.title}
            className="w-full h-auto min-h-[430px] max-h-[430px] shadow-xl object-contain"
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          />

          <h5 className="font-semibold text-lg uppercase">{comic.title}</h5>
        </Link>
      ))}
    </div>
  );
};
