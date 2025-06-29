'use client';
import React from 'react';
import TabsNavigation, { TabItem } from './index';

const BookingsTabs: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (tabId: number) => {
    setActiveTab(tabId);
  };

  const tabs: TabItem[] = [
    {
      id: 0,
      label: 'Upcoming',
      content: (
        <div className='p-6'>
          <h3 className='text-custom-24 font-custom-600 mb-4'>
            Upcoming Bookings
          </h3>
          <p className='text-text_2'>
            You have upcoming bookings scheduled. Manage your reservations here.
          </p>
        </div>
      ),
    },
    {
      id: 1,
      label: 'Completed',
      content: (
        <div className='p-6'>
          <h3 className='text-custom-24 font-custom-600 mb-4'>
            Completed Bookings
          </h3>
          <p className='text-text_2'>
            View your history of completed bookings and their details.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      label: 'Cancelled',
      content: (
        <div className='p-6'>
          <h3 className='text-custom-24 font-custom-600 mb-4'>
            Cancelled Bookings
          </h3>
          <p className='text-text_2'>
            These bookings were cancelled. You can review the details here.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className='container py-8'>
      <TabsNavigation
        tabs={tabs}
        defaultActiveTab={0}
        onChange={handleTabChange}
      />
    </div>
  );
};

export default BookingsTabs;
