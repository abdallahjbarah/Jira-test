interface BookagriLogoSvgProps {
  width?: string;
  height?: string;
}

export default function BookagriLogoSvg({
  width = '11.8125rem',
  height = '3rem',
}: BookagriLogoSvgProps): React.ReactElement {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 189 48'
      fill='none'
    >
      // ... existing code ...
    </svg>
  );
}
