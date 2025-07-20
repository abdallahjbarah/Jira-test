'use client';
import React, { useEffect, useState } from 'react';

interface CustomSvgProps {
  src: string;
  color?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  alt?: string;
}

const svgCache: Record<string, string> = {};

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
    const cacheKey = `${src}_${color}`;

    if (svgCache[cacheKey]) {
      let cached = svgCache[cacheKey];
      cached = cached.replace(
        /width="[^"]*" height="[^"]*"/,
        `width="${width}" height="${height}"`
      );
      setSvgContent(cached);
      return;
    }

    fetch(src)
      .then(res => res.text())
      .then(text => {
        let updated = text;

        if (text.includes('fill="') || text.includes('stroke="')) {
          updated = text.replace(/(fill|stroke)="[^"]*"/g, `$1="${color}"`);
        }

        // Add a style to the <svg> tag
        updated = updated.replace(
          /<svg([^>]*)>/,
          `<svg$1 style="color: ${color};" width="${width}" height="${height}">`
        );

        // Store in cache
        svgCache[cacheKey] = updated;

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
