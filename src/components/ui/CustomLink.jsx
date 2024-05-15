'use client';

import PropTypes from 'prop-types';
import Link from 'next/link';

export default function CustomLink({ path, children, ...rest }) {
  return (
    <Link href={path} {...rest}>
      {children}
    </Link>
  );
}

CustomLink.propTypes = {
  path: PropTypes.string,
};
