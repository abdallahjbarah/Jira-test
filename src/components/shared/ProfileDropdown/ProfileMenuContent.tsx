import React from 'react';
import Link from 'next/link';
import CustomSvg from '@/components/ui/CustomSvg';
import ProfileMenuItem from './ProfileMenuItem';
import ProfileDivider from './ProfileDivider';
import { useTranslation } from '@/contexts/TranslationContext';
import FilledButton from '@/components/ui/buttons/FilledButton';
import Divider from '@/components/ui/Divider';
import FAQModal from '@/components/shared/FAQs';
import useModal from '@/hooks/useModal';

const ProfileMenuContent: React.FC = () => {
  const { t } = useTranslation();
  const {
    isOpen: isFAQModalOpen,
    openModal: openFAQModal,
    closeModal: closeFAQModal,
  } = useModal();

  return (
    <div className='bg-white rounded-lg shadow-lg w-[22.5rem] p-6 border border-solid border-secondary_3 max-h-[44.813rem] overflow-y-auto'>
      {/* Profile Header */}
      <div className='flex flex-col items-center justify-center mb-6'>
        <div className='w-16 h-16 rounded-full overflow-hidden mb-2 bg-gray-100 flex items-center justify-center'>
          <CustomSvg
            src='/SVGs/shared/profile-2user.svg'
            width={40}
            height={40}
            alt='Profile'
            className='text-primary_2 ml-[9px]'
          />
        </div>
        <h3 className='text-base font-semibold'>Abeer Alkilany</h3>
        <p className='text-sm text-gray-500'>a.kilon79@gmail.com</p>
      </div>

      <div className='space-y-4 '>
        <ProfileMenuItem
          label={t('profile.personalInfo')}
          sublabel={t('profile.editPersonalInfo')}
          icon='/SVGs/shared/user-info.svg'
          href='/profile/personal-info'
        />
        <Divider />
        <ProfileMenuItem
          label={t('profile.security')}
          sublabel={t('profile.changePassword')}
          icon='/SVGs/shared/lock.svg'
          href='/profile/security'
        />
        <Divider />

        <ProfileMenuItem
          label={t('profile.myBookings')}
          sublabel={t('profile.bookingSettings')}
          icon='/SVGs/shared/bookings.svg'
          href='/profile/bookings'
        />
        <Divider />

        <ProfileMenuItem
          label={t('profile.currency')}
          sublabel='USD'
          icon='/SVGs/shared/currency.svg'
          href='/profile/currency'
        />
        <Divider />

        <ProfileMenuItem
          label={t('profile.language')}
          sublabel='English'
          icon='/SVGs/shared/language.svg'
          href='/profile/language'
        />
      </div>

      <ProfileDivider title={t('profile.support')} />

      <div className='space-y-4 '>
        <ProfileMenuItem
          label={t('profile.helpCenter')}
          sublabel={t('profile.contactUs')}
          icon='/SVGs/shared/help.svg'
          href='/help'
        />

        <ProfileMenuItem
          label={t('profile.faqs')}
          sublabel={t('profile.haveQuestions')}
          icon='/SVGs/shared/faq.svg'
          href='#'
          onClick={openFAQModal}
        />
      </div>

      <ProfileDivider title={t('profile.aboutBookagri')} />
      <div className='space-y-4 '>
        <ProfileMenuItem
          label={t('about-us')}
          sublabel={t('profile.missionVision')}
          icon='/SVGs/shared/info-circle.svg'
          href='/about'
        />
        <Divider />
        <ProfileMenuItem
          label={t('profile.privacyPolicy')}
          sublabel={t('profile.checkPrivacy')}
          icon='/SVGs/shared/shield-security.svg'
          href='/privacy-policy'
        />
        <Divider />
        <ProfileMenuItem
          label={t('profile.termsOfService')}
          sublabel={t('profile.checkTerms')}
          icon='/SVGs/shared/document-text.svg'
          href='/terms'
        />
      </div>

      <div className='mt-2 px-4 pt-2 border-t border-gray-100'>
        <FilledButton
          path='/logout'
          text={t('profile.logout')}
          buttonType='button'
          className='text-primary_6 !text-custom-14 flex items-center gap-2 py-2 bg-transparent hover:bg-transparent'
        />
      </div>

      <FAQModal isOpen={isFAQModalOpen} onClose={closeFAQModal} />
    </div>
  );
};

export default ProfileMenuContent;
