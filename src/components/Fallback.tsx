import { FallbackError } from './FallbackError';
import { Loading } from './Loading';

interface FallbackProps {
  isLoading: boolean;
  error: Error | null;
}

export const Fallback = ({ error, isLoading }: FallbackProps) => {
  if (isLoading) {
    return <Loading />;
  }

  return <FallbackError error={error} />;
};
