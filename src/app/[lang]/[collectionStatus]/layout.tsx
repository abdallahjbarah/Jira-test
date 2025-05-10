import React, { memo } from 'react';
import InnerPagesLayout from '@/layouts/InnerPagesLayout';

function CollectionStatusLayout({ children }: { children: React.ReactNode }) {
  return (
    <InnerPagesLayout headerProps={{ withNavItems: false }}>
      <main>{children}</main>
    </InnerPagesLayout>
  );
}

export default memo(CollectionStatusLayout);
