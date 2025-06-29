import React, { useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import CustomSvg from '@/components/ui/CustomSvg';

interface ImageUploaderProps {
  initialImage?: string;
  onImageChange?: (file: File) => void;
  altText?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  initialImage = '/avatar-placeholder.png',
  onImageChange,
  altText = 'Profile Image',
  size = 'md',
  className = '',
}) => {
  const [image, setImage] = useState<string>(initialImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
        if (onImageChange) {
          onImageChange(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = '/SVGs/shared/profile-2user.svg';
  };

  return (
    <div className={cn(`relative ${className}`)}>
      <div
        className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-secondary_3 relative cursor-pointer`}
        onClick={handleClick}
      >
        <img
          src={image}
          alt={altText}
          className='w-full h-full object-cover'
          onError={handleImageError}
        />

        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer text-white hover:text-primary_1'>
          <CustomSvg
            src='/SVGs/shared/camera-icon.svg'
            alt='Upload'
            width={30}
            height={30}
          />
        </div>
      </div>

      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileChange}
        accept='image/*'
        className='hidden'
      />
    </div>
  );
};

export default ImageUploader;
