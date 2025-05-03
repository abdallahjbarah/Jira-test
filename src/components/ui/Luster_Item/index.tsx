import React, { ReactNode } from 'react';
import styles from './style.module.scss';

interface Luster_ItemProps {
  children: ReactNode;
  className: string;
}

export default function Luster_Item({
  children,
  className,
}: Luster_ItemProps): React.ReactElement {
  return (
    <div
      className={`${styles['custom-luster']} ${styles['luster']} ${className}`}
    >
      {children}
    </div>
  );
}
