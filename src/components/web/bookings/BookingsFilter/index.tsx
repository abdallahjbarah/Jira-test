import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import TabsNavigation, { TabItem } from '@/components/ui/TabsNavigation';
import { FormProvider, useForm } from 'react-hook-form';
import SearchBar from '@/components/ui/SearchBar';
import { BookingStatus } from '@/lib/enums';

interface BookingsFilterProps {
  onFilterChange: (tabId: number) => void;
  onSearch: (query: string) => void;
  upcomingCount?: number;
  completedCount?: number;
  cancelledCount?: number;
}

const BookingsFilter = ({
  onFilterChange,
  onSearch,
  upcomingCount = 0,
  completedCount = 0,
  cancelledCount = 0
}: BookingsFilterProps) => {
  const { t } = useTranslation();

  const tabs: TabItem[] = [
    {
      id: BookingStatus.PENDING,
      label: t('bookingStatus.upcoming') || 'Upcoming',
      content: (
        <div className='mt-8'>
          <p className='text-custom-30 font-custom-500 text-[#000000]'>
            You have <span className='text-[#47C409]'>{upcomingCount}</span> upcoming {upcomingCount === 1 ? 'booking' : 'bookings'}
          </p>
        </div>
      ),
    },
    {
      id: BookingStatus.COMPLETED,
      label: t('bookingStatus.completed') || 'Completed',
      content: (
        <div className='mt-8'>
          <p className='text-custom-30 font-custom-500 text-[#000000]'>
            You have <span className='text-[#47C409]'>{completedCount}</span> completed {completedCount === 1 ? 'booking' : 'bookings'}
          </p>
        </div>
      ),
    },
    {
      id: BookingStatus.CANCELLED,
      label: t('bookingStatus.cancelled') || 'Cancelled',
      content: (
        <div className='mt-8'>
          <p className='text-custom-30 font-custom-500 text-[#000000]'>
            You have <span className='text-[#47C409]'>{cancelledCount}</span> cancelled {cancelledCount === 1 ? 'booking' : 'bookings'}
          </p>
        </div>
      ),
    },
  ];

  const formMethods = useForm();

  return (
    <FormProvider {...formMethods}>
      <div className='flex items-center justify-between flex-col-reverse tabletM:flex-row gap-[1.5rem]'>
        <TabsNavigation
          tabs={tabs}
          defaultActiveTab={BookingStatus.PENDING}
          containerClassName='w-full laptopM:w-auto'
          showContent={true}
          onChange={(tabId) => {
            formMethods.setValue('status', tabId);
            onFilterChange(tabId);
          }}
        />

        <SearchBar
          placeholder='Search'
          onChange={onSearch}
          className='laptopM:max-w-[19.5rem] w-full'
        />
      </div>
    </FormProvider>
  );
};

export default BookingsFilter;
