import CustomSvg from '@/components/ui/CustomSvg';
import Divider from '@/components/ui/Divider';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from '../../../contexts/TranslationContext';
import { Locale } from '../../../utils';

interface Amenity {
  _id: string;
  nameEn: string;
  nameAr: string;
  category: {
    _id: string;
    nameEn: string;
    nameAr: string;
  }[];
  iconPath: string;
}

interface AmenitiesPopupProps {
  amenities: Amenity[];
  onClose: () => void;
  paramsLang: Locale;
}

const AmenitiesPopup: React.FC<AmenitiesPopupProps> = ({
  amenities,
  onClose,
  paramsLang,
}) => {
  const isArabic = paramsLang === 'ar';
  const groupedAmenities = amenities.reduce(
    (acc, amenity) => {
      const categoryId = amenity.category[0]._id;
      const categoryName = isArabic
        ? amenity.category[0].nameAr
        : amenity.category[0].nameEn;

      if (!acc[categoryId]) {
        acc[categoryId] = {
          name: categoryName,
          items: [],
        };
      }

      acc[categoryId].items.push(amenity);
      return acc;
    },
    {} as Record<string, { name: string; items: Amenity[] }>
  );
  const { t } = useTranslation();
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-8'>
          <h2 className='font-custom-700 text-custom-20 mobileM:text-custom-22 laptopM:text-custom-30 text-text_1'>
            {t('amenities.allAmenities')}
          </h2>
          <button onClick={onClose} className='p-2'>
            <CustomSvg
              src='/SVGs/shared/close-icon.svg'
              width={24}
              height={24}
            />
          </button>
        </div>

        <div className='space-y-8'>
          {Object.values(groupedAmenities).map(category => (
            <div key={category.name} className='space-y-6'>
              <h3 className='font-custom-700 text-custom-16 mobileM:text-custom-20 laptopM:text-custom-24 text-text_1 font-gellix-Bold'>
                {category.name}
              </h3>
              <div className='flex flex-col gap-6'>
                {category.items.map(amenity => (
                  <div
                    key={amenity._id}
                    className='flex justify-start items-center gap-2'
                  >
                    <Image
                      src={amenity.iconPath}
                      alt={isArabic ? amenity.nameAr : amenity.nameEn}
                      width={50}
                      height={50}
                      className='w-[30px] h-[30px] mobileM:w-[40px] mobileM:h-[40px] laptopM:w-[50px] laptopM:h-[50px]'
                    />
                    <p className='font-custom-400 text-custom-14 mobileM:text-custom-18 laptopM:text-custom-20 text-text_1 text-center line-clamp-2'>
                      {isArabic ? amenity.nameAr : amenity.nameEn}
                    </p>
                  </div>
                ))}
              </div>
              <Divider className='w-full my-8' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AmenitiesPopup;
