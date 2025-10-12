'use client';
import BookingSuccess from '@/components/shared/BookingFlow/BookingSuccess';
import ExpandableTextSection from '@/components/shared/ExpandableTextSection';
import CircularLoader from '@/components/ui/CircularLoader';
import Divider from '@/components/ui/Divider';
import {
  AdditionalServices,
  BookingDetails,
  BookingSummary,
  PaymentMethods,
} from '@/components/web/details/completeYourBookings';
import SmartSubmitButton from '@/components/web/details/completeYourBookings/SmartSubmitButton';
import { useTranslation } from '@/contexts/TranslationContext';
import { useBookingData } from '@/hooks/useBookingData';
import useModal from '@/hooks/useModal';
import InnerPagesLayout from '@/layouts/InnerPagesLayout';
import useMutateBooking from '@/lib/apis/bookings/useMutateBooking';
import { useFetchDetails } from '@/lib/apis/details/useFetchDetails';
import { useUploadFile } from '@/lib/apis/files/useUploadFile';
import { useFetchPaymentMethods } from '@/lib/apis/paymentMethod/useFetchPaymentMethod';
import { BookingStatus, FileFolder } from '@/lib/enums';
import { Locale } from '@utils/constants';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

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
  // Helper function to parse datetime values for experiences (supports both timestamps and zoned strings)
  const parseDateTime = (value: string | number | undefined): Date | null => {
    if (!value) return null;

    // If it's a number (timestamp), use it directly
    if (typeof value === 'number') {
      return new Date(value);
    }

    // If it's a zoned string like "2025-10-04 16:00 GMT+3", parse it
    if (typeof value === 'string') {
      // Try parsing as-is first
      const directParse = new Date(value);
      if (!isNaN(directParse.getTime())) {
        return directParse;
      }

      // If direct parsing fails, try normalizing GMT to UTC
      const normalizedString = value.replace('GMT', 'UTC');
      const normalizedParse = new Date(normalizedString);
      if (!isNaN(normalizedParse.getTime())) {
        return normalizedParse;
      }
    }

    return null;
  };

  // Helper function to extract time from string without timezone conversion
  const extractTimeFromString = (
    timeString: string | number | undefined
  ): string => {
    if (!timeString) return '';

    if (typeof timeString === 'number') {
      // If it's a timestamp, convert to date and format
      const date = new Date(timeString);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    }

    if (typeof timeString === 'string') {
      // Extract time portion from string like "2025-10-04 07:30 GMT+1"
      const timeMatch = timeString.match(/(\d{1,2}):(\d{2})/);
      if (timeMatch) {
        const hours = parseInt(timeMatch[1]);
        const minutes = timeMatch[2];
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
        return `${displayHours}:${minutes} ${period}`;
      }
    }

    return '';
  };

  // Helper function to format guest information
  const formatGuestInfo = (
    guests: { adults: number; children: number; infants: number } | undefined
  ) => {
    if (!guests) return '';

    const parts = [];
    if (guests.adults > 0) {
      parts.push(`${guests.adults} Adult${guests.adults > 1 ? 's' : ''}`);
    }
    if (guests.children > 0) {
      parts.push(`${guests.children} Child${guests.children > 1 ? 'ren' : ''}`);
    }
    if (guests.infants > 0) {
      parts.push(`${guests.infants} Infant${guests.infants > 1 ? 's' : ''}`);
    }

    return parts.join(', ');
  };
  const {
    data: detailsData,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
    error: detailsError,
  } = useFetchDetails(params.id);

  const { t } = useTranslation();

  // Initialize form with default values based on mandatory status
  const getDefaultValues = () => {
    const siteInfo = detailsData?.data?.site;
    return {
      transportationChecked: siteInfo?.transportationIsMandatory ?? false,
      guideChecked: siteInfo?.guideIsMandatory ?? false,
      airportChecked: false, // Airport is always optional
      selectedPaymentMethod: null,
      financialReceipt: null,
    };
  };

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: getDefaultValues(),
    mode: 'onChange',
  });

  // Update form values when site data is loaded
  React.useEffect(() => {
    if (detailsData?.data) {
      const siteInfo = detailsData.data.site;
      setValue(
        'transportationChecked',
        siteInfo.transportationIsMandatory ?? false
      );
      setValue('guideChecked', siteInfo.guideIsMandatory ?? false);
    }
  }, [detailsData?.data, setValue]);

  // Handlers that prevent unchecking mandatory items
  const handleTransportationChange = (checked: boolean) => {
    const siteInfo = detailsData?.data?.site;
    // If mandatory, always keep it checked
    if (siteInfo?.transportationIsMandatory) {
      setValue('transportationChecked', true);
    } else {
      setValue('transportationChecked', checked);
    }
  };

  const handleGuideChange = (checked: boolean) => {
    const siteInfo = detailsData?.data?.site;
    // If mandatory, always keep it checked
    if (siteInfo?.guideIsMandatory) {
      setValue('guideChecked', true);
    } else {
      setValue('guideChecked', checked);
    }
  };

  const transportationChecked = watch('transportationChecked');
  const guideChecked = watch('guideChecked');
  const airportChecked = watch('airportChecked');
  const selectedPaymentMethod = watch('selectedPaymentMethod');
  const financialReceipt = watch('financialReceipt');

  // Ensure mandatory items stay checked
  React.useEffect(() => {
    if (detailsData?.data) {
      const siteInfo = detailsData.data.site;
      if (siteInfo.transportationIsMandatory && !transportationChecked) {
        setValue('transportationChecked', true);
      }
      if (siteInfo.guideIsMandatory && !guideChecked) {
        setValue('guideChecked', true);
      }
    }
  }, [detailsData?.data, transportationChecked, guideChecked, setValue]);

  const router = useRouter();

  const { getBookingData, updateBookingData, clearBookingData } =
    useBookingData();
  const bookingData = getBookingData(params.id);

  // Booking success modal state
  const {
    isOpen: isSuccessModalOpen,
    openModal: openSuccessModal,
    closeModal: closeSuccessModal,
  } = useModal();
  const [successBookingId, setSuccessBookingId] = React.useState<string>('');

  // Redirect to details page if bookingData is missing
  React.useEffect(() => {
    if (!bookingData) {
      router.replace(`/${params.lang}/details/${params.id}`);
    }
  }, [bookingData, params.lang, params.id, router]);

  // Helper function to get the correct date/time based on site type
  const getBookingDateTime = () => {
    if (!bookingData?.availability) {
      return {
        startTime: detailsData?.data?.site.schedule?.startDateTime || '',
        endTime: detailsData?.data?.site.schedule?.endDateTime || '',
        startDate: detailsData?.data?.site.schedule?.startDateTime || '',
        endDate: detailsData?.data?.site.schedule?.endDateTime || '',
      };
    }

    // For stays, the structure is different - availability contains startDate/endDate
    if (detailsData?.data?.site.type === 'Stay') {
      // For stays, the availability data structure is different
      const startTime =
        bookingData.availability.startDate ||
        bookingData.availability.startDateTime ||
        detailsData?.data?.site.schedule?.startDateTime ||
        '';
      const endTime =
        bookingData.availability.endDate ||
        bookingData.availability.endDateTime ||
        detailsData?.data?.site.schedule?.endDateTime ||
        '';
      const startDate =
        bookingData.availability.startDate ||
        bookingData.availability.startDateTime ||
        detailsData?.data?.site.schedule?.startDateTime ||
        '';
      const endDate =
        bookingData.availability.endDate ||
        bookingData.availability.endDateTime ||
        detailsData?.data?.site.schedule?.endDateTime ||
        '';

      return {
        startTime,
        endTime,
        startDate,
        endDate,
      };
    }

    // For experiences, use startDateTime/endDateTime from the selected slot
    // For experiences, the availability data contains startDateTime and endDateTime directly
    // These can now be either timestamps (numbers) or zoned strings
    const startTime =
      bookingData.availability.startDateTime ||
      detailsData?.data?.site.schedule?.startDateTime ||
      '';
    const endTime =
      bookingData.availability.endDateTime ||
      detailsData?.data?.site.schedule?.endDateTime ||
      '';
    const startDate =
      bookingData.availability.startDateTime ||
      detailsData?.data?.site.schedule?.startDateTime ||
      '';
    const endDate =
      bookingData.availability.endDateTime ||
      detailsData?.data?.site.schedule?.endDateTime ||
      '';

    return {
      startTime,
      endTime,
      startDate,
      endDate,
    };
  };

  const bookingDateTime = getBookingDateTime();

  const { mutate: bookCollection, isPending: isBookingCollectionPending } =
    useMutateBooking({
      onSuccess: data => {
        setSuccessBookingId(data.booking._id);
        if (data.booking.status != BookingStatus.DRAFT) {
          openSuccessModal();
        }

        if (data.paymentUrl) {
          window.open(data.paymentUrl, '_blank');
        }

        setTimeout(() => {
          clearBookingData(params.id);
        }, 200);
      },
      onError: error => {
        toast.error(error.json.message);
      },
    });

  const { mutate: uploadFile, isPending: isUploadingFile } = useUploadFile({
    onSuccess: data => {
      bookCollection({
        siteId: detailsData?.data?.site._id || '',
        availabilityId:
          detailsData?.data?.site.type === 'Stay'
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

  const onSubmit: SubmitHandler<BookingFormData> = data => {
    // Check if payment method is selected
    if (!data.selectedPaymentMethod) {
      toast.error('Please select a payment method to proceed.');
      return;
    }

    // Check if selected payment method is on-site payment
    const selectedPaymentMethodObj = (paymentMethods || []).find(
      m => m._id === data.selectedPaymentMethod
    );
    const isOnSitePayment = isPayOnSite(selectedPaymentMethodObj?.name);

    // Use either the data parameter or the watched value
    const hasFile = data.financialReceipt || financialReceipt;

    // If it's an on-site payment, proceed without file attachment
    if (isOnSitePayment) {
      bookCollection({
        siteId: detailsData?.data?.site._id || '',
        availabilityId:
          detailsData?.data?.site.type === 'Stay'
            ? bookingData?.availability?.availabilitiesIds
            : bookingData?.availability?.slotIds[0] || '',
        paymentMethod: data.selectedPaymentMethod || '',
        guests: bookingData?.guests,
        hasGuide: data.guideChecked,
        hasTransportation: data.transportationChecked,
        hasAirport: data.airportChecked,
        attachment: null, // No attachment for on-site payments
      });
      return;
    }

    // For non-on-site payments, check if file is attached
    if (!hasFile) {
      toast.error(
        'Please attach a financial receipt to proceed with your booking.'
      );
      return;
    }

    // Proceed with file attachment for non-on-site payment
    const fileToUpload = data.financialReceipt || financialReceipt;
    uploadFile({
      file: fileToUpload!,
      folderName: FileFolder.PAYMENT_INFO,
    });
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

  const isPayOnSite = (name: string | undefined) =>
    name === 'On-site Cash Payment' ||
    name === 'On-site Card Payment' ||
    name === 'Credit/Debit Card (Visa/Mastercard)';

  // Find the selected payment method object
  const selectedPaymentMethodObj = (paymentMethods || []).find(
    m => m._id === selectedPaymentMethod
  );
  const disableAttachment = isPayOnSite(selectedPaymentMethodObj?.name);

  const enabledPaymentMethods = (paymentMethods || []).filter(m => m.isEnabled);

  return (
    <>
      <BookingSuccess
        isOpen={isSuccessModalOpen}
        onClose={closeSuccessModal}
        bookingId={successBookingId}
        lang={params.lang}
      />
      <InnerPagesLayout headerProps={{ withNavItems: true }}>
        <main className='container'>
          <form id='booking-form' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-8 mobileM:gap-24 laptopM:gap-32'>
              <h1
                className='
            text-custom-20 mobileM:text-custom-35
            laptopM:text-custom-48 font-custom-700 text-text_1 font-gellix-Bold'
              >
                {t('completeYourBooking.completeYourBookingAndPay')}
              </h1>
              <div className='flex flex-col lg:flex-row justify-between w-full gap-20'>
                <div className='flex flex-col gap-2 flex-1 order-2 lg:order-1'>
                  <BookingDetails
                    time={
                      detailsData?.data?.site.type !== 'Stay'
                        ? (() => {
                            try {
                              const startTimeFormatted = extractTimeFromString(
                                bookingDateTime.startTime
                              );
                              const endTimeFormatted = extractTimeFromString(
                                bookingDateTime.endTime
                              );

                              if (startTimeFormatted && endTimeFormatted) {
                                return `${startTimeFormatted} - ${endTimeFormatted}`;
                              } else {
                                // Try to get time from site schedule as fallback
                                if (
                                  detailsData?.data?.site.schedule
                                    ?.startDateTime &&
                                  detailsData?.data?.site.schedule?.endDateTime
                                ) {
                                  const scheduleStartFormatted =
                                    extractTimeFromString(
                                      detailsData.data.site.schedule
                                        .startDateTime
                                    );
                                  const scheduleEndFormatted =
                                    extractTimeFromString(
                                      detailsData.data.site.schedule.endDateTime
                                    );
                                  if (
                                    scheduleStartFormatted &&
                                    scheduleEndFormatted
                                  ) {
                                    return `${scheduleStartFormatted} - ${scheduleEndFormatted}`;
                                  }
                                }
                                return '02:00 PM - 04:00 PM';
                              }
                            } catch (error) {
                              return '02:00 PM - 04:00 PM';
                            }
                          })()
                        : ''
                    }
                    date={(() => {
                      if (detailsData?.data?.site.type === 'Stay') {
                        try {
                          const startDate = new Date(bookingDateTime.startDate);
                          const endDate = new Date(bookingDateTime.endDate);

                          if (
                            !isNaN(startDate.getTime()) &&
                            !isNaN(endDate.getTime())
                          ) {
                            return `${startDate.toLocaleDateString('en-US', {
                              // weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                              timeZone: 'GMT',
                            })} - ${endDate.toLocaleDateString('en-US', {
                              // weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                              timeZone: 'GMT',
                            })}`;
                          } else {
                            return 'Check-in - Check-out';
                          }
                        } catch (error) {
                          return 'Check-in - Check-out';
                        }
                      } else {
                        try {
                          const start = parseDateTime(
                            bookingDateTime.startDate
                          );
                          const end = parseDateTime(bookingDateTime.endDate);

                          if (start && end) {
                            if (
                              start.getFullYear() === end.getFullYear() &&
                              start.getMonth() === end.getMonth() &&
                              start.getDate() === end.getDate()
                            ) {
                              return `(${start.toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'short',
                                day: 'numeric',
                              })})`;
                            } else {
                              return `(${start.toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'short',
                                day: 'numeric',
                              })} - ${end.toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'short',
                                day: 'numeric',
                              })})`;
                            }
                          } else {
                            // Try to get date from site schedule as fallback
                            if (
                              detailsData?.data?.site.schedule?.startDateTime &&
                              detailsData?.data?.site.schedule?.endDateTime
                            ) {
                              const scheduleStart = parseDateTime(
                                detailsData.data.site.schedule.startDateTime
                              );
                              const scheduleEnd = parseDateTime(
                                detailsData.data.site.schedule.endDateTime
                              );
                              if (scheduleStart && scheduleEnd) {
                                return `(${scheduleStart.toLocaleDateString(
                                  'en-US',
                                  {
                                    weekday: 'long',
                                    month: 'short',
                                    day: 'numeric',
                                  }
                                )})`;
                              }
                            }
                            return '(Selected Date)';
                          }
                        } catch (error) {
                          return '(Selected Date)';
                        }
                      }
                    })()}
                    people={(() => {
                      const guests = bookingData?.guests;
                      if (!guests) return '';
                      const parts = [];
                      if (guests.adults > 0)
                        parts.push(
                          `${guests.adults} Adult${guests.adults > 1 ? 's' : ''}`
                        );
                      if (guests.children > 0)
                        parts.push(
                          `${guests.children} Child${guests.children > 1 ? 'ren' : ''}`
                        );
                      if (guests.infants > 0)
                        parts.push(
                          `${guests.infants} Infant${guests.infants > 1 ? 's' : ''}`
                        );
                      return parts.join(', ');
                    })()}
                    onGuestUpdate={guests => {
                      updateBookingData(params.id, {
                        guests,
                      });
                    }}
                  />
                  {detailsData?.data?.site.airportIsIncluded ||
                    detailsData?.data?.site.guideIsIncluded ||
                    (detailsData?.data?.site.transportationIsIncluded && (
                      <Divider className='w-full my-8' />
                    ))}
                  <AdditionalServices
                    transportationChecked={transportationChecked}
                    guideChecked={guideChecked}
                    onTransportationChange={handleTransportationChange}
                    onGuideChange={handleGuideChange}
                    siteInfo={detailsData?.data?.site}
                    airportChecked={airportChecked}
                    onAirportChange={checked =>
                      setValue('airportChecked', checked)
                    }
                  />
                  {detailsData?.data?.site.thingsToKnow && (
                    <>
                      <Divider className='w-full my-8' />

                      <ExpandableTextSection
                        title={t('completeYourBooking.thingsToKnow')}
                        content={detailsData?.data?.site.thingsToKnow || ''}
                      />
                    </>
                  )}

                  {detailsData?.data?.site.stayNearby && (
                    <>
                      <Divider className='w-full my-8' />
                      <ExpandableTextSection
                        title={t('completeYourBooking.stayNearby')}
                        content={detailsData?.data?.site.stayNearby || ''}
                      />
                    </>
                  )}

                  {detailsData?.data?.site.stayHouseRules && (
                    <>
                      <Divider className='w-full my-8' />
                      <ExpandableTextSection
                        title={t('completeYourBooking.stayHouseRules')}
                        content={detailsData?.data?.site.stayHouseRules || ''}
                      />
                    </>
                  )}

                  {detailsData?.data?.site.cancellationPolicy && (
                    <>
                      <Divider className='w-full my-8' />
                      <ExpandableTextSection
                        title={t('completeYourBooking.cancellationPolicy')}
                        content={detailsData?.data?.site.cancellationPolicy}
                      />
                    </>
                  )}
                  <Divider className='w-full my-8' />

                  {enabledPaymentMethods.length > 0 && (
                    <>
                      <PaymentMethods
                        methods={enabledPaymentMethods}
                        selectedMethod={selectedPaymentMethod || ''}
                        onMethodChange={method =>
                          setValue('selectedPaymentMethod', method)
                        }
                      />
                      <Divider className='w-full my-8' />
                    </>
                  )}

                  <SmartSubmitButton
                    control={control}
                    name='financialReceipt'
                    disableAttachment={disableAttachment}
                    onSubmit={handleSubmit(onSubmit)}
                    isBookingCollectionPending={isBookingCollectionPending}
                    isUploadingFile={isUploadingFile}
                  />
                </div>
                <BookingSummary
                  siteInfo={detailsData?.data?.site}
                  title={detailsData?.data?.site.name || ''}
                  location={
                    `${detailsData?.data?.site.country?.name}, ${detailsData?.data?.site.city}` ||
                    ''
                  }
                  bookingData={bookingData}
                  transportationChecked={transportationChecked}
                  guideChecked={guideChecked}
                  airportChecked={airportChecked}
                />
              </div>
            </div>
          </form>
        </main>
      </InnerPagesLayout>
    </>
  );
};

export default CompleteYourBooking;
