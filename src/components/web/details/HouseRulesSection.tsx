import React from 'react';

interface HouseRulesSectionProps {
  rules?: string;
}

const HouseRulesSection: React.FC<HouseRulesSectionProps> = ({ rules }) => {
  return (
    <div className='flex flex-col gap-11'>
      <p className='font-custom-700 font-gellix-Bold text-text_1 text-custom-30'>
        House Rules
      </p>
      <div 
          className='font-custom-400 font-sans text-custom-22 text-text_2'
          dangerouslySetInnerHTML={{ __html: rules || '' }}
        />
    </div>
  );
};

export default HouseRulesSection; 