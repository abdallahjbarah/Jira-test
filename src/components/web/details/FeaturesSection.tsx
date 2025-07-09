import React from 'react';
import CustomSvg from '@/components/ui/CustomSvg';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  features: Feature[];
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features }) => (
  <div className='flex laptopM:flex-col flex-wrap gap-6 items-start min-h-[240px] laptopM:max-h-[240px]'>
    {features.map((feature, index) => (
      <div
        className='flex w-full laptopM:w-auto gap-2 items-start laptopM:justify-center max-w-[400px]'
        key={index}
      >
        <CustomSvg src={feature.icon} width={24} height={24} color='red' />
        <div className='flex flex-col justify-start'>
          <p className='font-custom-400 font-sans text-text_1 text-custom-20 '>
            {feature.title}
          </p>
          <p className='font-custom-400 font-sans text-text_3 text-custom-14 '>
            {feature.description}
          </p>
        </div>
      </div>
    ))}
  </div>
);

export default FeaturesSection;
