import { Modal } from './Modal';
import { Button } from '../Button';
import { ModalOverlay } from './ModalOverlay';
import { parseError } from '../../functions/parseError';

interface ModalErrorProps {
  exception: {
    error: Error | null;
    seeDetails: boolean;
  };
  onClose: () => void;
  onShowDetails: () => void;
}

export const ModalError = ({
  exception,
  onClose,
  onShowDetails,
}: ModalErrorProps) => {
  return (
    <ModalOverlay>
      <Modal title="" onClose={onClose}>
        <div className="flex flex-col items-center gap-4 max-h-[500px] w-full h-full overflow-x-hidden overflow-y-auto">
          {exception.error ? (
            <>
              <h4 className="text-lg text-neutral-50 font-bold">
                {exception.error?.name}
              </h4>
              <p className="text-base text-center text-neutral-200 font-medium">
                {exception.error?.message}
              </p>

              <Button onClick={onShowDetails}>
                {exception.seeDetails ? 'Esconder' : 'Ver detalhes'}
              </Button>

              {exception.seeDetails && (
                <code className="bg-neutral-700 border border-neutral-600 rounded-lg text-white text-xs py-4 px-2 w-full overflow-y-auto">
                  <pre>
                    {JSON.stringify(parseError(exception.error), null, 2)}
                  </pre>
                </code>
              )}
            </>
          ) : (
            <p className="font-medium text-base text-neutral-100">
              Nenhum conteúdo recebido pela API.
            </p>
          )}

          <Button onClick={onClose}>OK</Button>
        </div>
      </Modal>
    </ModalOverlay>
  );
};
