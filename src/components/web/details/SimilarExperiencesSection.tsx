import CollectionCard from '@/components/web/collections/CollectionCard';
import { SimilarSite } from '@/lib/types';
import React from 'react';

interface SimilarExperiencesSectionProps {
  similarExperiences: SimilarSite[];
}

const SimilarExperiencesSection: React.FC<SimilarExperiencesSectionProps> = ({
  similarExperiences,
}) => (
  <div className='flex flex-col gap-6 mobileM:gap-8 laptopM:gap-11 px-8 tabletM:px-4'>
    <p className='font-custom-700 font-gellix-Bold text-text_1 text-custom-20 mobileM:text-custom-22 laptopM:text-custom-30'>
      Similar Experiences
    </p>
    <p className='font-custom-400 font-sems text-text_3 text-custom-14 mobileM:text-custom-18 laptopM:text-custom-28'>
      If you enjoyed this, you might also like
    </p>
    <div className='flex gap-6 overflow-x-auto hide-scrollbar pb-4'>
      {similarExperiences.map(similarExperience => (
        <div
          key={similarExperience._id}
          className='min-w-[19.5rem] max-w-[19.5rem] flex-shrink-0'
        >
          <CollectionCard collection={similarExperience as any} />
        </div>
      ))}
    </div>
  </div>
);

export default SimilarExperiencesSection;
