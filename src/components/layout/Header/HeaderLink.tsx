import React from 'react';
import CustomLink from '@components/ui/CustomLink';

interface HeaderLinkProps {
  path: string;
  text: string;
  isActive: boolean;
}

export default function HeaderLink({
  path,
  text,
  isActive,
}: HeaderLinkProps): React.ReactElement {
  return (
    <li
      className={`
        ${isActive ? 'text-primary_1 font-custom-800' : 'text-primary_4 font-custom-400'} 
        transition-all duration-200 text-custom-22 hover:font-custom-800 hover:text-primary_1`}
    >
      <CustomLink path={path}>{text}</CustomLink>
    </li>
  );
}
