'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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
  const { lang } = useParams();
  return (
    <Link prefetch={true} href={`/${lang}${path}`} {...rest}>
      {children}
    </Link>
  );
}
