import React, { memo } from 'react';
import InnerPagesLayout from '@/layouts/InnerPagesLayout';
import FilterBar from '@/components/shared/FilterBar';

function CollectionStatusLayout({ children }: { children: React.ReactNode }) {
  return (
    <InnerPagesLayout headerProps={{ withNavItems: true }}>
      <main>
        <div className='container mb-[68px] flex items-center justify-center'>
          <FilterBar />
        </div>
        {children}
      </main>
    </InnerPagesLayout>
  );
}

export default memo(CollectionStatusLayout);
