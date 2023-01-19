import classNames from 'classnames';
import { X } from 'phosphor-react';
import { ReactNode, useEffect } from 'react';
import { ModalOverlay } from './ModalOverlay';

interface ModalProps {
  onClose: () => void;
  size?: 'sm' | 'lg' | 'xl';
  title: string;
  children: ReactNode;
  footerComponent?: JSX.Element;
  background?: 'light' | 'dark';
}

export const Modal = ({
  children,
  onClose,
  title,
  size = 'lg',
  footerComponent,
  background = 'dark',
}: ModalProps) => {
  useEffect(() => {
    const keyEvent = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', keyEvent);

    return () => window.removeEventListener('keydown', keyEvent);
  }, [onClose]);

  return (
    <ModalOverlay>
      <div
        onClick={e => e.stopPropagation()}
        className={classNames(
          'flex flex-col gap-4 rounded-lg p-4 shadow-md w-full overflow-auto',
          background === 'light' ? 'bg-white' : 'bg-neutral-800',
          {
            'max-w-lg': size === 'sm',
            'max-w-3xl': size === 'lg',
            'max-w-5xl': size === 'xl',
          },
        )}
      >
        <header className="flex items-center justify-between">
          <h2
            className={classNames(
              'text-xl font-semibold',
              background === 'light' ? 'text-gray-900' : 'text-gray-50',
            )}
          >
            {title}
          </h2>
          <button
            aria-label="Clique para fechar a janela"
            className={classNames(
              'border-none bg-transparent hover:text-red-500',
              background === 'light' ? 'text-gray-900' : 'text-gray-50',
            )}
            onClick={() => onClose()}
            title="Fechar janela"
          >
            <X size={20} />
          </button>
        </header>

        <main className="flex flex-col max-h-[600px] overflow-x-hidden overflow-y-auto transition-colors">
          {children}
        </main>

        {footerComponent && footerComponent}
      </div>
    </ModalOverlay>
  );
};
