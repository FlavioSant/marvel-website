interface CharacterListProps {
  characters: Character[];
}

export const CharacterList = ({ characters }: CharacterListProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
      {characters.map((character, index) => (
        <div
          key={`character-${character.id}-${index}`}
          className="bg-neutral-900"
        >
          <figure className="h-[170px] lg:h-[210px]">
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              className="w-full h-full object-cover"
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
  );
};
