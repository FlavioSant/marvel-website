import { PropsWithChildren } from 'react';
import { Header } from './Header/Header';

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="w-full h-full">{children}</main>
    </div>
  );
};
