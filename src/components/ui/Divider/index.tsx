import { cn } from '@/utils/cn';
import React from 'react';

interface DividerProps {
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ className }) => {
  return <hr className={cn('border-t border-secondary_3', className)} />;
};

export default Divider;
