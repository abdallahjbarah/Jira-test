'use client';
import Divider from '@/components/ui/Divider';
import InnerPagesLayout from '@/layouts/InnerPagesLayout';
import { Locale } from '@utils/constants';
import {
  BookingDetails,
  AdditionalServices,
  PaymentMethods,
  BookingSummary,
} from '@/components/web/details/completeYourBookings';
import { useFetchPaymentMethods } from '@/lib/apis/paymentMethod/useFetchPaymentMethod';
import CircularLoader from '@/components/ui/CircularLoader';
import { useBookingData } from '@/hooks/useBookingData';
import { useFetchDetails } from '@/lib/apis/details/useFetchDetails';
import ExpandableTextSection from '@/components/shared/ExpandableTextSection';
import { useForm, SubmitHandler } from 'react-hook-form';
import FinancialReceiptUpload from '@/components/web/bookings/FinancialReceiptUpload';
import { toast } from 'react-toastify';
import { useTranslation } from '@/contexts/TranslationContext';
import useMutateBooking from '@/lib/apis/bookings/useMutateBooking';
import { useUploadFile } from '@/lib/apis/files/useUploadFile';
import { FileFolder } from '@/lib/enums';
import { useRouter } from 'next/navigation';

interface CompleteYourBookingProps {
  params: { lang: Locale; id: string };
}

interface BookingFormData {
  transportationChecked: boolean;
  guideChecked: boolean;
  airportChecked: boolean;
  selectedPaymentMethod: string | null;
  financialReceipt: File | null;
}

const CompleteYourBooking: React.FC<CompleteYourBookingProps> = ({
  params,
}) => {
  // const queryClient = useQueryClient();
  const {
    data: detailsData,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
    error: detailsError,
  } = useFetchDetails(params.id);

  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      transportationChecked: true,
      guideChecked: true,
      airportChecked: true,
      selectedPaymentMethod: null,
      financialReceipt: null,
    },
  });

  // Watch form values for real-time updates
  const transportationChecked = watch('transportationChecked');
  const guideChecked = watch('guideChecked');
  const airportChecked = watch('airportChecked');
  const selectedPaymentMethod = watch('selectedPaymentMethod');

  const router = useRouter();

  const { getBookingData, updateBookingData, clearBookingData } =
    useBookingData();
  const bookingData = getBookingData(params.id);

  const { mutate: bookCollection, isPending: isBookingCollectionPending } =
    useMutateBooking({
      onSuccess: (data) => {
        toast.success(t('booking.financialReceipt.success'));
        clearBookingData(params.id);
        router.push(`/my-bookings/${data._id}`);
      },
      onError: () => {
        toast.error(t('booking.financialReceipt.error'));
      },
    });

  const { mutate: uploadFile, isPending: isUploadingFile } = useUploadFile({
    onSuccess: (data) => {
      bookCollection({
        siteId: detailsData?.data?._id || '',
        availabilityId:
          detailsData?.data?.type === 'Stay'
            ? bookingData?.availability?.availabilitiesIds
            : bookingData?.availability?.slotIds[0] || '',
        paymentMethod: selectedPaymentMethod || '',
        guests: bookingData?.guests,
        hasGuide: guideChecked,
        hasTransportation: transportationChecked,
        hasAirport: airportChecked,
        attachment: data,
      });
    },
    onError: () => {
      toast.error(t('booking.financialReceipt.error'));
    },
  });

  const onSubmit: SubmitHandler<BookingFormData> = (data) => {
    // if payment method is not selected show an error
    if (!data.financialReceipt) {
      toast.error(t('booking.financialReceipt.error'));
      return;
    }

    // if financialReceipt is not null, upload it useing @useUploadFile
    if (data.financialReceipt) {
      uploadFile({
        file: data.financialReceipt,
        folderName: FileFolder.PAYMENT_INFO,
      });
    }
  };

  const {
    data: paymentMethods,
    isLoading: isPaymentMethodsLoading,
    isError,
    error,
  } = useFetchPaymentMethods();

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-32'>
            <h1 className='text-5xl font-custom-700 text-text_1 font-gellix-Bold'>
              Complete your booking and pay
            </h1>
            <div className='flex flex-col lg:flex-row justify-between w-full gap-20'>
              <div className='flex flex-col gap-2 flex-1'>
                <BookingDetails
                  // time here is timestamp convert to readable format
                  time={`${new Date(
                    detailsData?.data?.schedule.startDateTime || '',
                  ).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })} - ${new Date(
                    detailsData?.data?.schedule.endDateTime || '',
                  ).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}`}
                  // dates are timestamp convert to readable format
                  date={`${new Date(
                    bookingData?.availability?.startDate ||
                      detailsData?.data?.schedule.startDateTime ||
                      '',
                  ).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                  })} - ${new Date(
                    bookingData?.availability?.endDate ||
                      detailsData?.data?.schedule.endDateTime ||
                      '',
                  ).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                  })}`}
                  // if one of the guests values are 0 don't show it
                  people={`${bookingData?.guests?.adults > 0 ? `${bookingData?.guests?.adults} Adults` : ''} ${bookingData?.guests?.children > 0 ? `${bookingData?.guests?.children} Children` : ''} ${bookingData?.guests?.infants > 0 ? `${bookingData?.guests?.infants} Infant` : ''}`}
                  onGuestUpdate={(guests) => {
                    updateBookingData(params.id, {
                      guests: guests,
                    });
                  }}
                />
                <Divider className='w-full my-8' />
                <AdditionalServices
                  transportationChecked={transportationChecked}
                  guideChecked={guideChecked}
                  onTransportationChange={(checked) =>
                    setValue('transportationChecked', checked)
                  }
                  onGuideChange={(checked) => setValue('guideChecked', checked)}
                  guidePrice='JOD 50'
                  siteInfo={detailsData?.data}
                  airportChecked={airportChecked}
                  onAirportChange={(checked) =>
                    setValue('airportChecked', checked)
                  }
                />
                {detailsData?.data?.thingsToKnow && (
                  <>
                    <Divider className='w-full my-8' />

                    <ExpandableTextSection
                      title='Things to Know'
                      content={detailsData?.data?.thingsToKnow || ''}
                    />
                  </>
                )}

                {detailsData?.data?.stayNearby && (
                  <>
                    <Divider className='w-full my-8' />
                    <ExpandableTextSection
                      title='Stay Nearby'
                      content={detailsData?.data?.stayNearby || ''}
                    />
                  </>
                )}

                {detailsData?.data?.stayHouseRules && (
                  <>
                    <Divider className='w-full my-8' />
                    <ExpandableTextSection
                      title='Stay House Rules'
                      content={detailsData?.data?.stayHouseRules || ''}
                    />
                  </>
                )}

                {detailsData?.data?.cancellationPolicy && (
                  <>
                    <Divider className='w-full my-8' />
                    <ExpandableTextSection
                      title='Cancellation Policy'
                      content={detailsData?.data?.cancellationPolicy}
                    />
                  </>
                )}
                <Divider className='w-full my-8' />

                <PaymentMethods
                  methods={paymentMethods || []}
                  selectedMethod={selectedPaymentMethod || ''}
                  onMethodChange={(method) =>
                    setValue('selectedPaymentMethod', method)
                  }
                />
                <Divider className='w-full my-8' />

                <FinancialReceiptUpload
                  control={control}
                  name='financialReceipt'
                  className='mb-24'
                />
              </div>
              <BookingSummary
                siteInfo={detailsData?.data}
                title={detailsData?.data?.name || ''}
                location={
                  `${detailsData?.data?.country?.name}, ${detailsData?.data?.city}` ||
                  ''
                }
                onSubmit={handleSubmit(onSubmit)}
                bookingData={bookingData}
                isBookingCollectionPending={isBookingCollectionPending}
                isUploadingFile={isUploadingFile}
              />
            </div>
          </div>
        </form>
      </main>
    </InnerPagesLayout>
  );
};

export default CompleteYourBooking;
