import classNames from 'classnames';
import { ReactNode } from 'react';

interface ModalOverlayProps {
  onClick?: () => void;
  children: ReactNode;
}

export const ModalOverlay = ({ children, onClick }: ModalOverlayProps) => {
  return (
    <div
      onClick={onClick}
      className={classNames(
        'flex items-center justify-center fixed top-0 left-0 w-full h-full overflow-y-auto cursor-default bg-neutral-900/30 z-50',
      )}
    >
      {children}
    </div>
  );
};
