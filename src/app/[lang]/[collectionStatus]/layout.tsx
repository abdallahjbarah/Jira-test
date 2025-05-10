import React, { memo } from 'react';
import InnerPagesLayout from '@/layouts/InnerPagesLayout';

function CollectionStatusLayout({ children }: { children: React.ReactNode }) {
  return (
    <InnerPagesLayout headerProps={{ withNavItems: true }}>
      <main>{children}</main>
    </InnerPagesLayout>
  );
}

export default memo(CollectionStatusLayout);
