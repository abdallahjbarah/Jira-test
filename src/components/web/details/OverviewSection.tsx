import React from 'react';

interface OverviewSectionProps {
  overview: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({
  overview,
  isExpanded,
  onToggleExpand,
}) => (
  <div className='flex flex-col gap-4' id='Overview'>
    <div className='flex justify-between items-center'>
      <h1 className='font-custom-700 text-text_1 text-custom-22 laptopM:text-custom-30'>
        Overview
      </h1>
      <h4 className='font-custom-400 font-sans text-text_2 text-custom-20 underline'>
        Translate
      </h4>
    </div>
    <div className='relative'>
      <p
        className={`laptopM:max-w-[52.5rem] font-custom-400 font-sans text-text_1 text-custom-20 laptopM:text-custom-30 break-words ${!isExpanded ? 'line-clamp-3' : ''}`}
      >
        {overview}
        <span>
          {' '}
          <button
            onClick={onToggleExpand}
            className='text-text_1 hover:text-primary_2 font-custom-400 text-custom-20 laptopM:text-custom-25 font-gellix-Bold transition-colors duration-200 mt-2'
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        </span>
      </p>
    </div>
  </div>
);

export default OverviewSection;
