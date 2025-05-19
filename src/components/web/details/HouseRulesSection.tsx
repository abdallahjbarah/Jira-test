import React from 'react';

interface HouseRulesSectionProps {
  rules?: string;
}

const HouseRulesSection: React.FC<HouseRulesSectionProps> = ({ rules = 'details' }) => {
  return (
    <div className='flex flex-col gap-11'>
      <p className='font-custom-700 font-gellix-Bold text-text_1 text-custom-30'>
        House Rules
      </p>
      <p>{rules}</p>
    </div>
  );
};

export default HouseRulesSection; 