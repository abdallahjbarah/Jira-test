import { useTranslation } from '../../../../contexts/TranslationContext';
import CustomSvg from '../../../ui/CustomSvg';

function ShowExperience({
  type,
  onClick,
}: {
  type: string;
  onClick: () => void;
}) {
  const { t } = useTranslation();
  return (
    <div
      className='flex items-center justify-between cursor-pointer'
      onClick={onClick}
    >
      <div className='flex items-center gap-4'>
        <CustomSvg
          src={'/SVGs/shared/experiences-icon.svg'}
          width={30}
          height={30}
          color='black'
        />
        <p className='font-custom-400 text-text_1 font-sans text-custom-15 mobileM:text-custom-18 laptopM:text-custom-20'>
          {t('booking.show')} {type}
        </p>
      </div>
      <CustomSvg
        src={'/SVGs/home/ios-arrow.svg'}
        width={35}
        height={35}
        color='black'
      />
    </div>
  );
}

export default ShowExperience;
