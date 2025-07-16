import React from 'react';
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
    <div className='bg-white rounded-lg shadow-lg w-[22.5rem] sm:w-[20rem] border border-solid border-secondary_3 max-h-[min(80vh,600px)] flex flex-col'>
      <div className='p-6 pb-4 border-b border-gray-100 flex-shrink-0 shadow-sm bg-gradient-to-b from-gray-50 to-white'>
        <ProfileDropDownHeader />
      </div>

      <div className='flex-1 overflow-y-auto px-6 py-4 customScroll min-h-0'>
        <div className='space-y-4'>
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

        <div className='space-y-4'>
          <ProfileMenuItem
            label={t('profile.helpCenter')}
            sublabel={t('profile.contactUs')}
            icon='/SVGs/shared/help.svg'
            href='#'
            onClick={openHelpCenterModal}
            isHelpCenter={true}
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
        <div className='space-y-4'>
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
      </div>

      <div className='px-6 py-4 border-t border-gray-200 flex-shrink-0 shadow-inner bg-gray-50'>
        <div className='p-2 rounded-lg border border-gray-200 shadow-sm bg-white hover:shadow-md transition-shadow duration-200'>
          <FilledButton
            text={t('profile.logout')}
            buttonType='button'
            className='text-primary_6 !text-custom-14 flex items-center gap-2 py-2 bg-transparent hover:bg-transparent w-full justify-start'
            onClick={handleLogout}
            isButton
          />
        </div>
      </div>

      <FAQModal isOpen={isFAQModalOpen} onClose={closeFAQModal} />
      {isHelpCenterModalOpen && (
        <HelpCenterModal
          isOpen={isHelpCenterModalOpen}
          onClose={closeHelpCenterModal}
        />
      )}
    </div>
  );
};

export default ProfileMenuContent;
