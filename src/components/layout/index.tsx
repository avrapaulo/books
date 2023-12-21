import { ReactNode } from 'react';
import { Header } from '@/components/header';

interface HeaderProps {
  children: ReactNode;
}

export const Layout = ({ children }: HeaderProps) => (
  <>
    <Header />
    <main>
      <div className="mx-auto max-w-7xl">{children}</div>
    </main>
  </>
);
