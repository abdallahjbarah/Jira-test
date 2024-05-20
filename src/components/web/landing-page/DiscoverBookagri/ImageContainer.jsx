import Image from 'next/image';
import CustomLink from '@components/ui/CustomLink';
import ArrowRight from '@components/svg/shared/ArrowRight';

export default function ImageContainer({ image, alt, className, title, path = '#' }) {
  return (
    <CustomLink className="group" path={path}>
      <div className="relative rounded-custom-32 overflow-hidden">
        {/* Image component */}
        <Image
          quality={100}
          placeholder="blur"
          src={image}
          alt={alt}
          className={`group-hover:opacity-75 object-cover transition-opacity duration-300 ease-in-out ${className}`}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'linear-gradient(118deg, rgba(0, 0, 0, 0.50) 2.75%, rgba(0, 0, 0, 0.00) 54.45%)'
        }} />
        {/* Content overlay */}
        <div className="absolute top-10 left-10 z-10">
          <h2 className="text-custom-32 font-bold text-primary_4 mb-2 select-none">
            {title}
          </h2>
          <div className="flex gap-2 items-center text-custom-24 font-medium text-primary_4 group-hover:text-primary_2 transition-all duration-200">
            <span>View All</span>
            <ArrowRight className="transition-transform fill-primary_4 group-hover:fill-primary_2 group-hover:translate-x-2" />
          </div>
        </div>
      </div>
    </CustomLink>
  );
}
