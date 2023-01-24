import { ReactNode } from 'react';
import { Header } from './Header/Header';

interface DefaultLayoutProps {
  children: ReactNode;
  attributionHTML?: string;
}

export const DefaultLayout = ({
  children,
  attributionHTML,
}: DefaultLayoutProps) => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="w-full h-full">{children}</main>
      <footer className="flex gap-2 items-center justify-center w-full bg-neutral-800 py-4 border-t border-red-600">
        <p className="text-base font-normal text-neutral-50">
          Por{' '}
          <a
            href="https://flaviosantos.dev/"
            rel="noreferrer"
            target="_blank"
            className="text-base font-normal text-neutral-50 hover:text-amber-500 transition-colors"
          >
            Flávio Santos
          </a>
        </p>

        <p className="text-base font-normal text-neutral-50">|</p>

        {attributionHTML && (
          <p
            className="text-base font-normal text-neutral-50 hover:text-amber-500 transition-colors"
            dangerouslySetInnerHTML={{ __html: attributionHTML }}
          />
        )}
      </footer>
    </div>
  );
};
