'use client';
import CustomSvg from '@/components/ui/CustomSvg';
import Divider from '@/components/ui/Divider';
import withFavourites from '@/lib/hocs/withFavourites';
import { Site } from '@/lib/types';
import {
  calculateGrandTotal,
  calculatePriceBreakdown,
  formatPriceBreakdownForDisplay,
} from '@/utils/helpers';
import useCurrency from '@/utils/hooks/useCurrency';
import useFavorite from '@/utils/hooks/useFavorite';
import React from 'react';

interface PriceBreakdown {
  label: string;
  amount: string;
  discount?: string;
}

interface BookingSummaryProps {
  title: string;
  location: string;
  openFavouritesModal: (site: Site) => void;
  siteInfo: Site | undefined;
  bookingData: any | undefined;
  transportationChecked?: boolean;
  guideChecked?: boolean;
  airportChecked?: boolean;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  title,
  location,
  openFavouritesModal,
  bookingData,
  siteInfo,
  transportationChecked = false,
  guideChecked = false,
  airportChecked = false,
}) => {
  const { currency } = useCurrency();
  const { isFavorite, removeFavorite } = useFavorite();

  const isCollectionFavorite = React.useMemo(() => {
    return isFavorite(siteInfo?._id || '');
  }, [isFavorite, siteInfo?._id]);

  const handleFavoriteToggle = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (isCollectionFavorite) {
        removeFavorite(siteInfo?._id || '');
      } else {
        if (siteInfo) {
          openFavouritesModal(siteInfo);
        }
      }
    },
    [isCollectionFavorite, removeFavorite, siteInfo, openFavouritesModal]
  );

  const heartIconSrc = React.useMemo(() => {
    return isCollectionFavorite
      ? '/SVGs/shared/heart-filled.svg'
      : '/SVGs/shared/heart-icon.svg';
  }, [isCollectionFavorite]);

  const numberOfNights = React.useMemo(() => {
    if (bookingData?.availability?.availabilitiesIds) {
      return bookingData.availability.availabilitiesIds.length;
    }
    return null;
  }, [bookingData?.availability?.availabilitiesIds]);

  const dynamicPriceBreakdown = React.useMemo(() => {
    if (!bookingData?.guests || !siteInfo?.pricingInformation) {
      return [];
    }

    const breakdown = calculatePriceBreakdown(
      siteInfo.pricingInformation,
      bookingData.guests,
      siteInfo.extras,
      numberOfNights,
      siteInfo.transportation?.price,
      siteInfo.guide?.price,
      transportationChecked,
      guideChecked
    );

    return formatPriceBreakdownForDisplay(breakdown, currency, numberOfNights);
  }, [
    bookingData?.guests,
    siteInfo?.pricingInformation,
    siteInfo?.extras,
    siteInfo?.transportation?.price,
    siteInfo?.guide?.price,
    currency,
    numberOfNights,
    transportationChecked,
    guideChecked,
  ]);

  const dynamicTotalAmount = React.useMemo(() => {
    if (!bookingData?.guests || !siteInfo?.pricingInformation) {
      return '0';
    }

    const breakdown = calculatePriceBreakdown(
      siteInfo.pricingInformation,
      bookingData.guests,
      siteInfo.extras,
      numberOfNights,
      siteInfo.transportation?.price,
      siteInfo.guide?.price,
      transportationChecked,
      guideChecked
    );

    const grandTotal = calculateGrandTotal(breakdown);
    return `${currency} ${grandTotal.toFixed(2)}`;
  }, [
    bookingData?.guests,
    siteInfo?.pricingInformation,
    siteInfo?.extras,
    siteInfo?.transportation?.price,
    siteInfo?.guide?.price,
    currency,
    numberOfNights,
    transportationChecked,
    guideChecked,
  ]);

  return (
    <div className='flex flex-col gap-16 flex-1 items-end order-1 lg:order-2'>
      <div className='shadow-customShadow_1 rounded-2xl border border-gray-200 overflow-hidden w-full'>
        <div className='relative'>
          <img
            src={siteInfo?.mainImage}
            alt={title}
            className='w-full h-[572px] object-cover'
          />
          <button
            className='absolute top-3 right-3 z-10 p-6 hover:!text-primary_2'
            onClick={handleFavoriteToggle}
          >
            <CustomSvg
              src={heartIconSrc}
              width={30}
              height={30}
              className={`transition-colors duration-200 text-white`}
            />
          </button>
        </div>
        <div className='p-6 flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <h3 className='text-2xl font-custom-700 text-text_1 font-gellix-Bold'>
              {title}
            </h3>
            <div className='flex justify-between items-center'>
              <p className='text-gray-500'>{location}</p>
              {siteInfo?.bookagriBadge && (
                <div className='flex items-center gap-1'>
                  <CustomSvg
                    src='/SVGs/shared/bookagri-gold.svg'
                    className='text-gold_1'
                    width={96}
                    height={24}
                  />
                </div>
              )}
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <h4 className='text-xl font-custom-700 text-text_1 font-gellix-Bold'>
              Price Breakdown
            </h4>
            <div className='flex flex-col gap-3'>
              {dynamicPriceBreakdown.map((item, index) => (
                <div key={index} className='flex justify-between items-center'>
                  <span
                    className={`text-gray-700 ${item.discount ? 'line-through' : ''}`}
                  >
                    {item.label}
                  </span>
                  <div className='flex flex-col items-end'>
                    <span className='font-custom-600'>{item.amount}</span>
                    {item.discount && (
                      <span className='text-sm text-green-600'>
                        {item.discount}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <Divider className='w-full my-2' />
              <div className='flex justify-between items-center'>
                <span className='font-custom-700 text-text_1'>
                  Total ({currency})
                </span>
                <span className='font-custom-700 text-text_1'>
                  {dynamicTotalAmount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withFavourites(BookingSummary);
