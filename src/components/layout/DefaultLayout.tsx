import { ReactNode } from 'react';
import { Footer } from './Footer';
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
      <Footer attributionHTML={attributionHTML} />
    </div>
  );
};
