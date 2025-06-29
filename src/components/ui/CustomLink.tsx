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
  return (
    <Link prefetch={true} href={`/${lang}${path}`} {...rest} draggable={false}>
      {children}
    </Link>
  );
}
