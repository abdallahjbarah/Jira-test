'use client';
import FilledButton from '@/components/ui/buttons/FilledButton';
import Divider from '@/components/ui/Divider';
import InnerPagesLayout from '@/layouts/InnerPagesLayout';
import { Locale } from '@utils/constants';
import {
  BookingDetails,
  AdditionalServices,
  ThingsToKnow,
  CancellationPolicy,
  PaymentMethods,
  BookingSummary,
} from '@/components/web/details/completeYourBookings';
import { useState } from 'react';
import { useFetchPaymentMethods } from '@/lib/apis/paymentMethod/useFetchPaymentMethod';
import CircularLoader from '@/components/ui/CircularLoader';

interface CompleteYourBookingProps {
  params: { lang: Locale };
}

const CompleteYourBooking: React.FC<CompleteYourBookingProps> = ({
  params,
}) => {
  const [transportationChecked, setTransportationChecked] = useState(true);
  const [guideChecked, setGuideChecked] = useState(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Cliq');

  const staticPaymentMethods = [
    {
      name: 'Cliq',
      icon: '/SVGs/shared/payment-icons/cliqIcon.svg',
      value: 'Cliq',
    },
    {
      name: 'eWallets',
      icon: '/SVGs/shared/payment-icons/eWalletIcon.svg',
      value: 'eWallets',
    },
    {
      name: 'Bank Transfer',
      icon: '/SVGs/shared/payment-icons/bankTransferIcon.svg',
      value: 'Bank Transfer',
    },
    {
      name: 'On-site Card Payment',
      icon: '/SVGs/shared/payment-icons/onSiteCardPaymentIcon.svg',
      value: 'On-site Card Payment',
    },
    {
      name: 'On-site Cash Payment',
      icon: '/SVGs/shared/payment-icons/onSiteCashPaymentIcon.svg',
      value: 'On-site Cash Payment',
    },
    {
      name: 'Exchange Offices',
      icon: '/SVGs/shared/payment-icons/ExchangeIcon.svg',
      value: 'Exchange Offices',
    },
  ];

  const priceBreakdown = [
    { label: 'JOD 20 x 2 adults', amount: 'JOD 40' },
    { label: 'JOD 10 x 2 children', amount: 'JOD 20' },
    { label: 'Free x 1 infant', amount: 'Free' },
    { label: 'Tax', amount: 'JOD 2' },
  ];

  const handleSubmit = () => {
    console.log('first');
  };

  const handleFavoriteToggle = () => {
    // Handle favorite toggle
  };

  const handleReadMore = () => {
    // Handle read more click
  };

  const { data: paymentMethods, isLoading: isPaymentMethodsLoading, isError, error } =
    useFetchPaymentMethods();

  if (isPaymentMethodsLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <CircularLoader size={50} />
      </div>
    );
  }

  if (isError) {
    return (
      <InnerPagesLayout headerProps={{ withNavItems: false }}>
        <main className='container py-[6.25rem]'>
          <div>Error fetching payment methods: {error?.message}</div>
        </main>
      </InnerPagesLayout>
    );
  }

  return (
    <InnerPagesLayout headerProps={{ withNavItems: false }}>
      <main className='container'>
        <div className='flex flex-col gap-32'>
          <h1 className='text-5xl font-custom-700 text-text_1 font-gellix-Bold'>
            Complete your booking and pay
          </h1>
          <div className='flex flex-col lg:flex-row justify-between w-full gap-20'>
            <div className='flex flex-col gap-2 flex-1'>
              <BookingDetails
                time='09:00 - 11:30 AM'
                date='Thursday, 10 Sep'
                people='2 Adults, 2 Children, 1 Infant'
                onEdit={() => {}}
              />
              <Divider className='w-full my-8' />
              <AdditionalServices
                transportationChecked={transportationChecked}
                guideChecked={guideChecked}
                onTransportationChange={setTransportationChecked}
                onGuideChange={setGuideChecked}
                guidePrice='JOD 50'
              />
              <Divider className='w-full my-8' />
              <ThingsToKnow
                content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia est laborum......'
                onReadMore={handleReadMore}
              />
              <Divider className='w-full my-8' />
              <CancellationPolicy
                policy='Cancel up to 24 hours before the start time for a full refund'
              />
              <Divider className='w-full my-8' />

              <PaymentMethods
                methods={paymentMethods?.data || []}
                staticMethods={staticPaymentMethods}
                selectedMethod={selectedPaymentMethod}
                onMethodChange={setSelectedPaymentMethod}
              />
              <Divider className='w-full my-8' />
              <FilledButton
                text='Attach the financial receipt'
                width='w-[186px]'
                className='bg-primary_1 text-white px-6 py-3 rounded-lg font-custom-700 text-sm font-gellix-Bold max-w-[312px] min-w-[312px] mb-24'
                icon={null}
                onClick={() => {}}
                buttonType='button'
                isDisable={false}
                isButton
              />
            </div>
            <BookingSummary
              imageUrl='https://images.unsplash.com/photo-1518548419970-58e3b4079ab2'
              title='Forest Walk with Traditional Homemade Breakfast Experience in Balqa'
              location='Balqa, Jordan'
              priceBreakdown={priceBreakdown}
              totalAmount='JOD 112'
              onFavoriteToggle={handleFavoriteToggle}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </main>
    </InnerPagesLayout>
  );
};

export default CompleteYourBooking;
