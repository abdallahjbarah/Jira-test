import React from 'react';
import ExpandableTextSection from '../../../shared/ExpandableTextSection';

interface ThingsToKnowProps {
  content: string;
}

const ThingsToKnow: React.FC<ThingsToKnowProps> = ({ content }) => {
  return (
    <ExpandableTextSection
      title='Things to Know'
      content={content}
      maxLength={200}
    />
  );
};

export default ThingsToKnow;
