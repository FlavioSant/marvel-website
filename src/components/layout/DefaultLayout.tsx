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
      <footer className="text-center text-neutral-50 w-full bg-neutral-800 py-4 border-t border-red-600">
        {attributionHTML && (
          <div dangerouslySetInnerHTML={{ __html: attributionHTML }} />
        )}
      </footer>
    </div>
  );
};
