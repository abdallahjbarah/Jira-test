import React from 'react';
import Link from 'next/link';
import CustomSvg from '@/components/ui/CustomSvg';
import ProfileMenuItem from './ProfileMenuItem';
import ProfileDivider from './ProfileDivider';
import { useTranslation } from '@/contexts/TranslationContext';
import FilledButton from '@/components/ui/buttons/FilledButton';
import Divider from '@/components/ui/Divider';
import FAQModal from '@/components/shared/FAQs';
import HelpCenterModal from '@/components/shared/HelpCenter';
import useModal from '@/hooks/useModal';
import useUser from '@/utils/hooks/useUser';
import ProfileDropDownHeader from './ProfileDropDownHeader';

const ProfileMenuContent: React.FC = () => {
  const { t } = useTranslation();
  const {
    isOpen: isFAQModalOpen,
    openModal: openFAQModal,
    closeModal: closeFAQModal,
  } = useModal();

  const {
    isOpen: isHelpCenterModalOpen,
    openModal: openHelpCenterModal,
    closeModal: closeHelpCenterModal,
  } = useModal();

  const { logout, userData } = useUser();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='bg-white rounded-lg shadow-lg w-[22.5rem] p-6 border border-solid border-secondary_3 max-h-[44.813rem] overflow-y-auto'>
      <ProfileDropDownHeader />
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
          href='/my-bookings'
        />
        <Divider />

        <ProfileMenuItem
          label={t('profile.currency')}
          sublabel={userData?.user.currency}
          icon='/SVGs/shared/currency.svg'
          href='/profile/currency'
        />
      </div>

      <ProfileDivider title={t('profile.support')} />

      <div className='space-y-4 '>
        <ProfileMenuItem
          label={t('profile.helpCenter')}
          sublabel={t('profile.contactUs')}
          icon='/SVGs/shared/help.svg'
          href='#'
          onClick={openHelpCenterModal}
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
          href='/#AboutUs'
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
          href='/terms-and-conditions'
        />
      </div>

      <div className='mt-2 px-4 pt-2 border-t border-gray-100'>
        <FilledButton
          text={t('profile.logout')}
          buttonType='button'
          className='text-primary_6 !text-custom-14 flex items-center gap-2 py-2 bg-transparent hover:bg-transparent'
          onClick={handleLogout}
          isButton
        />
      </div>

      <FAQModal isOpen={isFAQModalOpen} onClose={closeFAQModal} />
      <HelpCenterModal isOpen={isHelpCenterModalOpen} onClose={closeHelpCenterModal} />
    </div>
  );
};

export default ProfileMenuContent;
