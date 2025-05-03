import React, { ReactNode } from 'react';
import styles from './style.module.scss';

interface MovingColorfulBorderProps {
  children: ReactNode;
  className?: string;
}

export default function MovingColorfulBorder({
  children,
  className = '',
}: MovingColorfulBorderProps): React.ReactElement {
  return (
    <div className={`${styles['border-box']} ${className}`}>{children}</div>
  );
}
