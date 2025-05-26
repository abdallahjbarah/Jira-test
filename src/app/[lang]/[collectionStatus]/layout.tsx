import React, { memo } from 'react';
import InnerPagesLayout from '@/layouts/InnerPagesLayout';
import FilterBar from '@/components/shared/FilterBar';

function CollectionStatusLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { collectionStatus: string };
}) {
  return (
    <InnerPagesLayout headerProps={{ withNavItems: true }}>
      <main>
        {params?.collectionStatus !== 'products' && (
          <div className='container mb-[68px] flex items-center justify-center'>
            <FilterBar />
          </div>
        )}
        {children}
      </main>
    </InnerPagesLayout>
  );
}

export default memo(CollectionStatusLayout);
