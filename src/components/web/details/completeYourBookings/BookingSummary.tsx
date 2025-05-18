import CustomSvg from '@/components/ui/CustomSvg';
import Divider from '@/components/ui/Divider';
import FilledButton from '@/components/ui/buttons/FilledButton';

interface PriceBreakdown {
  label: string;
  amount: string;
}

interface BookingSummaryProps {
  imageUrl: string;
  title: string;
  location: string;
  priceBreakdown: PriceBreakdown[];
  totalAmount: string;
  onFavoriteToggle: () => void;
  onSubmit: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  imageUrl,
  title,
  location,
  priceBreakdown,
  totalAmount,
  onFavoriteToggle,
  onSubmit,
}) => {
  return (
    <div className='flex flex-col gap-16 flex-1 items-end'>
      <div className='shadow-customShadow_1 rounded-2xl border border-gray-200 overflow-hidden'>
        <div className='relative'>
          <img
            src={imageUrl}
            alt={title}
            className='w-full h-[572px] object-cover'
          />
          <button
            className='absolute top-3 right-3 z-10 p-6 hover:!text-primary_2'
            onClick={onFavoriteToggle}
          >
            <CustomSvg
              src='/SVGs/shared/heart-icon.svg'
              width={30}
              height={30}
              color={'#fff'}
              className='transition-colors duration-200'
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
              <div className='flex items-center gap-1'>
                <CustomSvg
                  src='/SVGs/shared/bookagri-gold.svg'
                  className='text-gold_1'
                  width={96}
                  height={24}
                />
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <h4 className='text-xl font-custom-700 text-text_1 font-gellix-Bold'>
              Price Breakdown
            </h4>
            <div className='flex flex-col gap-3'>
              {priceBreakdown.map((item, index) => (
                <div key={index} className='flex justify-between items-center'>
                  <span className='text-gray-700'>{item.label}</span>
                  <span className='font-custom-600'>{item.amount}</span>
                </div>
              ))}
              <Divider className='w-full my-2' />
              <div className='flex justify-between items-center'>
                <span className='font-custom-700 text-text_1'>Total (JOD)</span>
                <span className='font-custom-700 text-text_1'>{totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FilledButton
        text='Submit'
        width='w-[186px]'
        className='bg-primary_1 text-white px-6 py-3 rounded-lg font-custom-700 text-sm font-gellix-Bold max-w-[186px] min-w-[186px] mb-24 lg:mb-0'
        icon={null}
        onClick={onSubmit}
        buttonType='button'
        isDisable={false}
        isButton
      />
    </div>
  );
};

export default BookingSummary; 