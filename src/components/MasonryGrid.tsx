import { ReactNode } from 'react';
import Masonry from 'react-responsive-masonry';

interface MasonryGridProps {
  children: ReactNode;
}

export function MasonryGrid({ children }: MasonryGridProps) {
  return (
    <Masonry columnsCount={3} gutter="20px">
      {children}
    </Masonry>
  );
}
