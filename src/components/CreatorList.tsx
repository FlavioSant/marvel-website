import { Link } from 'react-router-dom';

interface CreatorListProps {
  creators: Creator[];
}

export const CreatorList = ({ creators }: CreatorListProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5 mt-6">
      {creators.map(creator => (
        <Link
          key={`creator-${creator.id}`}
          to={`/creators/${creator.id}`}
          className="flex flex-col gap-4 overflow-hidden cursor-pointer transform transition duration-200 hover:scale-105"
        >
          <img
            alt={creator.fullName}
            className="w-full h-auto min-h-[430px] max-h-[430px] object-contain"
            src={`${creator.thumbnail.path}.${creator.thumbnail.extension}`}
          />

          <h5 className="font-semibold text-lg uppercase">
            {creator.fullName}
          </h5>
        </Link>
      ))}
    </div>
  );
};
