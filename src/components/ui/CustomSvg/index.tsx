import React, { useEffect, useState } from 'react';

interface CustomSvgProps {
  src: string; // e.g. "/SVGs/myicon.svg"
  color?: string; // e.g. "#ff0000" or "currentColor"
  width?: number | string;
  height?: number | string;
  className?: string;
  alt?: string;
}

const CustomSvg: React.FC<CustomSvgProps> = ({
  src,
  color = 'currentColor',
  width = 24,
  height = 24,
  className = '',
  alt = '',
}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then((text) => {
        // Remove hardcoded fill/stroke attributes
        let updated = text.replace(/(fill|stroke)="[^"]*"/g, '');
        // Add a style to the <svg> tag
        updated = updated.replace(
          /<svg([^>]*)>/,
          `<svg$1 style="color: ${color};" width="${width}" height="${height}">`,
        );
        setSvgContent(updated);
      });
  }, [src, color, width, height]);

  if (!svgContent) return null;

  return (
    <span
      className={className}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default CustomSvg;
