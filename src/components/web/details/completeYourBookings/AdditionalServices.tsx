import Checkbox from '@/components/ui/Checkbox';
import { Site } from '@/lib/types';

interface AdditionalServicesProps {
  onTransportationChange: (checked: boolean) => void;
  onGuideChange: (checked: boolean) => void;
  transportationChecked: boolean;
  guideChecked: boolean;
  airportChecked: boolean;
  guidePrice?: string;
  siteInfo: Site | undefined;
  onAirportChange: (checked: boolean) => void;
}

const AdditionalServices: React.FC<AdditionalServicesProps> = ({
  onTransportationChange,
  onGuideChange,
  transportationChecked,
  guideChecked,
  guidePrice,
  airportChecked,
  onAirportChange,
  siteInfo,
}) => {
  return (
    <div className='flex flex-col gap-2'>
      {siteInfo?.transportationIsIncluded && (
        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl font-custom-700 text-text_1 font-gellix-Bold'>
            Transportation
            {siteInfo?.transportationIsMandatory && (
              <span className='ml-2 text-sm font-custom-600 text-red-600 bg-red-50 px-2 py-1 rounded'>
                Mandatory
              </span>
            )}
            {!siteInfo?.transportationIsMandatory && (
              <span className='ml-2 text-sm font-custom-600 text-blue-600 bg-blue-50 px-2 py-1 rounded'>
                Optional
              </span>
            )}
          </h2>
          <div className='flex items-center gap-2'>
            <p className='font-custom-400 text-gray-500 text-xl font-sans'>
              {siteInfo?.transportation?.description}
            </p>
            <div className='ml-auto'>
              <Checkbox
                id='transportation'
                label=''
                checked={transportationChecked}
                onChange={onTransportationChange}
                disabled={siteInfo?.transportationIsMandatory}
              />
            </div>
          </div>
          {siteInfo?.transportation?.price !== undefined && (
            <p className='font-custom-600 font-gellix-Bold text-base text-text_1'>
              JOD {siteInfo.transportation.price}
            </p>
          )}
        </div>
      )}
      {siteInfo?.guideIsIncluded && (
        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl font-custom-700 text-text_1 font-gellix-Bold'>
            Guide
            {siteInfo?.guideIsMandatory && (
              <span className='ml-2 text-sm font-custom-600 text-red-600 bg-red-50 px-2 py-1 rounded'>
                Mandatory
              </span>
            )}
            {!siteInfo?.guideIsMandatory && (
              <span className='ml-2 text-sm font-custom-600 text-blue-600 bg-blue-50 px-2 py-1 rounded'>
                Optional
              </span>
            )}
          </h2>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <p className='font-custom-400 text-gray-500 text-xl font-sans'>
                {siteInfo?.guide?.description}
              </p>
              <div className='ml-auto'>
                <Checkbox
                  id='Guide'
                  label=''
                  checked={guideChecked}
                  onChange={onGuideChange}
                  disabled={siteInfo?.guideIsMandatory}
                />
              </div>
            </div>
            <p className='font-custom-600 font-gellix-Bold text-base text-text_1'>
              {siteInfo?.guide?.price !== undefined ? `JOD ${siteInfo.guide.price}` : guidePrice}
            </p>
          </div>
        </div>
      )}
      {siteInfo?.airportIsIncluded && (
        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl font-custom-700 text-text_1 font-gellix-Bold'>
            Airport
            <span className='ml-2 text-sm font-custom-600 text-blue-600 bg-blue-50 px-2 py-1 rounded'>
              Optional
            </span>
          </h2>
          <div className='flex items-center gap-2'>
            <p className='font-custom-400 text-gray-500 text-xl font-sans'>
              {siteInfo?.airport?.description}
            </p>
            <div className='ml-auto'>
              <Checkbox
                id='airport'
                label=''
                checked={airportChecked}
                onChange={onAirportChange}
              />
            </div>
          </div>
          {siteInfo?.airport?.price !== undefined && (
            <p className='font-custom-600 font-gellix-Bold text-base text-text_1'>
              JOD {siteInfo.airport.price}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdditionalServices;
