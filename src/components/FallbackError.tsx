import { useEffect, useState } from 'react';
import { CaretDown, CaretUp } from 'phosphor-react';
import { parseError } from '../functions/parseError';
import { Button } from './Button';

interface FallbackErrorProps {
  error: Error | null;
}

export const FallbackError = ({ error }: FallbackErrorProps) => {
  const [seeDetails, setSeeDetails] = useState(false);

  useEffect(() => {
    console.error(error);
  }, []);

  return (
    <div className="container flex flex-col items-center justify-center gap-4 p-4 mx-auto">
      <h3 className="font-semibold text-4xl text-neutral-100">Ooops...</h3>
      <p className="font-medium text-base text-neutral-200">
        A página que você procura encontrou um erro.
      </p>

      {error ? (
        <>
          <Button
            type="button"
            onClick={() => setSeeDetails(!seeDetails)}
            title="Clique para visualizar os detalhes do erro."
          >
            {seeDetails ? 'Esconder' : 'Ver detalhes'}
            {seeDetails ? (
              <CaretUp size={20} weight="bold" />
            ) : (
              <CaretDown size={20} weight="bold" />
            )}
          </Button>

          {seeDetails && (
            <code className="bg-neutral-700 border border-neutral-600 rounded-lg text-white text-xs py-4 px-2 w-full overflow-y-auto">
              <pre>{JSON.stringify(parseError(error), null, 2)}</pre>
            </code>
          )}
        </>
      ) : (
        <p className="font-medium text-base text-neutral-100">
          Nenhum conteúdo recebido pela API.
        </p>
      )}
    </div>
  );
};
