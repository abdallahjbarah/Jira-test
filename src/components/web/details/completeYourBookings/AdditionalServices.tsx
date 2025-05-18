import Checkbox from '@/components/ui/Checkbox';

interface AdditionalServicesProps {
  onTransportationChange: (checked: boolean) => void;
  onGuideChange: (checked: boolean) => void;
  transportationChecked: boolean;
  guideChecked: boolean;
  guidePrice: string;
}

const AdditionalServices: React.FC<AdditionalServicesProps> = ({
  onTransportationChange,
  onGuideChange,
  transportationChecked,
  guideChecked,
  guidePrice,
}) => {
  return (
    <div className='flex flex-col gap-2'>
      {/* Transportation Section */}
      <div className='flex flex-col gap-2'>
        <h2 className='text-3xl font-custom-700 text-text_1 font-gellix-Bold'>
          Transportation
        </h2>
        <div className='flex items-center gap-2'>
          <p className='font-custom-400 text-gray-500 text-xl font-sans'>
            Extra fees applied
          </p>
          <button className='underline text-sm font-custom-400 text-text_1 font-sans'>
            Learn more
          </button>
          <div className='ml-auto'>
            <Checkbox
              id='transportation'
              label=''
              checked={transportationChecked}
              onChange={onTransportationChange}
            />
          </div>
        </div>
      </div>
      {/* Guide Section */}
      <div className='flex flex-col gap-2'>
        <h2 className='text-3xl font-custom-700 text-text_1 font-gellix-Bold'>
          Guide
        </h2>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <p className='font-custom-400 text-gray-500 text-xl font-sans'>
              (Guide required for Arabic and non-Arabic speakers)
            </p>
            <button className='underline text-sm font-custom-400 text-text_1 font-sans'>
              Learn more
            </button>
            <div className='ml-auto'>
              <Checkbox
                id='Guide'
                label=''
                checked={guideChecked}
                onChange={onGuideChange}
              />
            </div>
          </div>
          <p className='font-custom-600 font-gellix-Bold text-base text-text_1'>
            {guidePrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdditionalServices; 