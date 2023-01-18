import { LoadingSpinner } from './LoadingSpinner';

import { FallbackError } from './FallbackError';

interface FallbackProps {
  isLoading: boolean;
  error: Error | null;
}

export const Fallback = ({ error, isLoading }: FallbackProps) => {
  if (isLoading) {
    return (
      <div className="container mx-auto flex flex-col items-center p-4">
        <LoadingSpinner />
        <p className="text-base text-neutral-800 font-medium">Carregando...</p>
      </div>
    );
  }

  return <FallbackError error={error} />;
};
