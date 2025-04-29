'use client';

import React from 'react';
import Link from 'next/link';

interface CustomLinkProps {
  path: string;
  children: React.ReactNode;
  [key: string]: any; // for rest props
}

export default function CustomLink({
  path,
  children,
  ...rest
}: CustomLinkProps): React.ReactElement {
  return (
    <Link href={path} {...rest}>
      {children}
    </Link>
  );
}
