import React from 'react';
import Image from 'next/image';
import LeafImg from '@images/home/Leaf.png';

interface DestinationItemProps {
  title: string;
  isHighlighted?: boolean;
  onClick?: () => void;
}

const DestinationItem: React.FC<DestinationItemProps> = ({
  title,
  isHighlighted = false,
  onClick,
}) => {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
        isHighlighted ? 'bg-green-100 hover:bg-green-200' : 'hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      <div className='w-5 h-5 relative'>
        <Image
          src={LeafImg}
          alt='Leaf icon'
          width={20}
          height={20}
          className='object-contain'
        />
      </div>
      <span className='text-gray-800 font-medium'>{title}</span>
    </div>
  );
};

export default DestinationItem;
