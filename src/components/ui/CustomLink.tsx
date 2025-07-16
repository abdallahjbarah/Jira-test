'use client';

import React from 'react';
import Link, { LinkProps } from 'next/link';
import { useParams } from 'next/navigation';

interface CustomLinkProps extends Omit<LinkProps, 'href'> {
  children: React.ReactNode;
  path: string;
  [key: string]: any;
}

export default function CustomLink({
  path,
  children,
  ...rest
}: CustomLinkProps): React.ReactElement {
  const { lang } = useParams();
  // Always redirect to /en/collections if path is /collections
  const href = path === '/collections' ? '/en/collections' : `/${lang}${path}`;
  return (
    <Link prefetch={true} href={href} {...rest} draggable={false}>
      {children}
    </Link>
  );
}
