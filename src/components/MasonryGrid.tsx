import { ReactNode } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

interface MasonryGridProps {
  children: ReactNode;
}

export function MasonryGrid({ children }: MasonryGridProps) {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 3 }}
    >
      <Masonry gutter="12px">
        {children}
      </Masonry>
    </ResponsiveMasonry>
  );
}
