import classNames from 'classnames';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: ReactNode;
  className?: string;
}

export const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={classNames(
        'flex items-center justify-center gap-x-2 rounded-md text-sm text-white font-semibold py-2.5 px-7 w-max hover:brightness-90 disabled:opacity-80 disabled:cursor-not-allowed bg-red-500 transition-colors',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
