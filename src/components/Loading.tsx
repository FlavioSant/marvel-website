import { LoadingSpinner } from './LoadingSpinner';

export const Loading = () => {
  return (
    <div className="container mx-auto flex flex-col items-center py-8 px-4">
      <LoadingSpinner />
      <p className="text-base text-neutral-800 font-medium">Carregando...</p>
    </div>
  );
};
