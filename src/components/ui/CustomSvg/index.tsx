'use client';
import React, { useEffect, useState } from 'react';

interface CustomSvgProps {
  src: string; // e.g. "/SVGs/myicon.svg"
  color?: string; // e.g. "#ff0000" or "currentColor"
  width?: number | string;
  height?: number | string;
  className?: string;
  alt?: string;
}

// Cache for storing already loaded SVGs
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
    // Create a cache key that includes the source and color
    const cacheKey = `${src}_${color}`;

    // Check if we already have this SVG in cache
    if (svgCache[cacheKey]) {
      // Apply the current dimensions to the cached SVG
      let cached = svgCache[cacheKey];
      cached = cached.replace(
        /width="[^"]*" height="[^"]*"/,
        `width="${width}" height="${height}"`,
      );
      setSvgContent(cached);
      return;
    }

    // If not in cache, fetch it
    fetch(src)
      .then((res) => res.text())
      .then((text) => {
        let updated = text;

        // Check if fill or stroke attributes exist and replace them
        if (text.includes('fill="') || text.includes('stroke="')) {
          // Only replace existing fill/stroke attributes with the provided color
          updated = text.replace(/(fill|stroke)="[^"]*"/g, `$1="${color}"`);
        }

        // Add a style to the <svg> tag
        updated = updated.replace(
          /<svg([^>]*)>/,
          `<svg$1 style="color: ${color};" width="${width}" height="${height}">`,
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
