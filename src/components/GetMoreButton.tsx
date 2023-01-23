import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import { Loading } from './Loading';

interface GetMoreButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
}

export const GetMoreButton = ({
  onClick,
  isLoading,
  disabled,
  ...rest
}: GetMoreButtonProps) => {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className={classNames(
            'block mx-auto mt-20 relative bg-red-500 disabled:bg-red-400 disabled:cursor-not-allowed before:h-4 before:ml-4 before:bg-red-500 before:border-red-500 before:border-solid before:border-t-0 before:border-r-0 before:border-b-[16px] before:border-l-[16px] before:block after:content-[""] after:block after:h-4 after:mr-4 after:bg-red-500 after:border-solid after:border-red-500 after:border-t-[16px] after:border-r-[16px] after:border-b-0 after:border-l-0',
            disabled ? 'before:border-[#f87171] after:border-[#f87171]' : '',
          )}
          {...rest}
        >
          <span
            className={classNames(
              "block px-9 text-neutral-50 font-medium uppercase text-sm text-center before:content-[''] before:border-t-0 before:border-r-0 before:border-b-[16px] before:border-l-[16px] before:border-solid before:border-[#e62429_#f5f5f5] before:block before:absolute before:left-0 before:top-0 after:content-[''] after:block after:absolute after:bottom-0 after:right-0 after:border-solid after:border-[#e62429_#f5f5f5] after:border-t-[16px] after:border-r-[16px] after:border-b-0 after:border-l-0 after:transform-[rotate(180deg)]",
              disabled
                ? 'before:border-[#f87171_#f5f5f5] after:border-[#f87171_#f5f5f5]'
                : '',
            )}
          >
            Carregar mais
          </span>
        </button>
      )}
    </>
  );
};
