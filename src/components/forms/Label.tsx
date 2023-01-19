import classNames from 'classnames';

export interface LabelProps {
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}

export const Label = ({ children, htmlFor, className }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={classNames(
        'block mb-1 font-medium text-sm text-neutral-800',
        className,
      )}
    >
      {children}
    </label>
  );
};
