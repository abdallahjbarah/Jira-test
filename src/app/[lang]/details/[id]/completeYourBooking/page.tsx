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
import React from 'react';

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
  // Helper function to format guest information
  const formatGuestInfo = (guests: { adults: number; children: number; infants: number } | undefined) => {
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
    const siteInfo = detailsData?.data;
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
      const siteInfo = detailsData.data;
      setValue('transportationChecked', siteInfo.transportationIsMandatory ?? false);
      setValue('guideChecked', siteInfo.guideIsMandatory ?? false);
    }
  }, [detailsData?.data, setValue]);

  // Handlers that prevent unchecking mandatory items
  const handleTransportationChange = (checked: boolean) => {
    const siteInfo = detailsData?.data;
    // If mandatory, always keep it checked
    if (siteInfo?.transportationIsMandatory) {
      setValue('transportationChecked', true);
    } else {
      setValue('transportationChecked', checked);
    }
  };

  const handleGuideChange = (checked: boolean) => {
    const siteInfo = detailsData?.data;
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
      const siteInfo = detailsData.data;
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

  // Redirect to details page if bookingData is missing
  React.useEffect(() => {
    if (!bookingData) {
      router.replace(`/${params.lang}/details/${params.id}`);
    }
  }, [bookingData, params.lang, params.id, router]);

  // Debug log to help troubleshoot data issues
  console.log('📊 Booking Data Retrieved:', {
    bookingData,
    availability: bookingData?.availability,
    guests: bookingData?.guests,
    type: bookingData?.type,
    detailsType: detailsData?.data?.type,
    detailsSchedule: detailsData?.data?.schedule
  });

  // Helper function to get the correct date/time based on site type
  const getBookingDateTime = () => {
    console.log('🔍 Debug - getBookingDateTime called with:', {
      bookingData,
      detailsData: detailsData?.data,
      availability: bookingData?.availability,
      siteType: detailsData?.data?.type,
      schedule: detailsData?.data?.schedule
    });

    if (!bookingData?.availability) {
      console.log('⚠️ No booking availability data, using fallback');
      return {
        startTime: detailsData?.data?.schedule?.startDateTime || '',
        endTime: detailsData?.data?.schedule?.endDateTime || '',
        startDate: detailsData?.data?.schedule?.startDateTime || '',
        endDate: detailsData?.data?.schedule?.endDateTime || ''
      };
    }

    // For stays, the structure is different - availability contains startDate/endDate
    if (detailsData?.data?.type === 'Stay') {
      console.log('🏠 Stay type detected, using startDate/endDate');
      // For stays, the availability data structure is different
      const startTime = bookingData.availability.startDate || bookingData.availability.startDateTime || detailsData?.data?.schedule?.startDateTime || '';
      const endTime = bookingData.availability.endDate || bookingData.availability.endDateTime || detailsData?.data?.schedule?.endDateTime || '';
      const startDate = bookingData.availability.startDate || bookingData.availability.startDateTime || detailsData?.data?.schedule?.startDateTime || '';
      const endDate = bookingData.availability.endDate || bookingData.availability.endDateTime || detailsData?.data?.schedule?.endDateTime || '';
      
      console.log('🏠 Stay datetime values:', { startTime, endTime, startDate, endDate });
      
      return {
        startTime,
        endTime,
        startDate,
        endDate
      };
    }

    // For experiences, use startDateTime/endDateTime from the selected slot
    console.log('🎯 Experience type detected, using startDateTime/endDateTime');
    // For experiences, the availability data contains startDateTime and endDateTime directly
    const startTime = bookingData.availability.startDateTime || detailsData?.data?.schedule?.startDateTime || '';
    const endTime = bookingData.availability.endDateTime || detailsData?.data?.schedule?.endDateTime || '';
    const startDate = bookingData.availability.startDateTime || detailsData?.data?.schedule?.startDateTime || '';
    const endDate = bookingData.availability.endDateTime || detailsData?.data?.schedule?.endDateTime || '';
    
    console.log('🎯 Experience datetime values:', { startTime, endTime, startDate, endDate });
    
    return {
      startTime,
      endTime,
      startDate,
      endDate
    };
  };

  const bookingDateTime = getBookingDateTime();

  // Debug the final bookingDateTime object
  console.log('📅 Final bookingDateTime object:', bookingDateTime);
  console.log('📅 bookingDateTime validation:', {
    startTimeValid: bookingDateTime.startTime && !isNaN(new Date(bookingDateTime.startTime).getTime()),
    endTimeValid: bookingDateTime.endTime && !isNaN(new Date(bookingDateTime.endTime).getTime()),
    startDateValid: bookingDateTime.startDate && !isNaN(new Date(bookingDateTime.startDate).getTime()),
    endDateValid: bookingDateTime.endDate && !isNaN(new Date(bookingDateTime.endDate).getTime()),
  });

  const { mutate: bookCollection, isPending: isBookingCollectionPending } =
    useMutateBooking({
      onSuccess: (data) => {
        toast.success(t('booking.financialReceipt.success'));
        router.push(`/my-bookings/${data._id}`);
        setTimeout(() => {
          clearBookingData(params.id);
        }, 200); // Delay to allow navigation to complete
      },
      onError: (error) => {
        toast.error(error.json.message);
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
    console.log('Form submitted with data:', data);
    console.log('Financial receipt from data:', data.financialReceipt);
    console.log('Financial receipt from watch:', financialReceipt);

    // Check if payment method is selected
    if (!data.selectedPaymentMethod) {
      toast.error('Please select a payment method to proceed.');
      return;
    }

    // Check if selected payment method is on-site payment
    const selectedPaymentMethodObj = (paymentMethods || []).find(
      (m) => m._id === data.selectedPaymentMethod
    );
    const isOnSitePayment = isPayOnSite(selectedPaymentMethodObj?.name);

    console.log('Selected payment method:', selectedPaymentMethodObj?.name);
    console.log('Is on-site payment:', isOnSitePayment);
    console.log('File attached from data:', !!data.financialReceipt);
    console.log('File attached from watch:', !!financialReceipt);

    // Use either the data parameter or the watched value
    const hasFile = data.financialReceipt || financialReceipt;
    console.log('Has file (combined check):', !!hasFile);

    // Allow submission if:
    // 1. It's an on-site payment (no file needed), OR
    // 2. A file is attached (for any payment method)
    if (isOnSitePayment || hasFile) {
      if (isOnSitePayment) {
        console.log('Proceeding with on-site payment without file attachment');
        bookCollection({
          siteId: detailsData?.data?._id || '',
          availabilityId:
            detailsData?.data?.type === 'Stay'
              ? bookingData?.availability?.availabilitiesIds
              : bookingData?.availability?.slotIds[0] || '',
          paymentMethod: data.selectedPaymentMethod || '',
          guests: bookingData?.guests,
          hasGuide: data.guideChecked,
          hasTransportation: data.transportationChecked,
          hasAirport: data.airportChecked,
          attachment: null, // No attachment for on-site payments
        });
      } else {
        console.log('Proceeding with file attachment for non-on-site payment');
        const fileToUpload = data.financialReceipt || financialReceipt;
        uploadFile({
          file: fileToUpload!,
          folderName: FileFolder.PAYMENT_INFO,
        });
      }
      return;
    }

    // If we reach here, it's a non-on-site payment with no file attached
    console.log('File attachment required for non-on-site payment but not provided');
    toast.error('Please attach a financial receipt to proceed with your booking.');
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
    name === 'On-site Cash Payment' || name === 'On-site Card Payment';

  // Find the selected payment method object
  const selectedPaymentMethodObj = (paymentMethods || []).find(
    (m) => m._id === selectedPaymentMethod
  );
  const disableAttachment = isPayOnSite(selectedPaymentMethodObj?.name);

  const enabledPaymentMethods = (paymentMethods || []).filter((m) => m.isEnabled);

  return (
    <InnerPagesLayout headerProps={{ withNavItems: true }}>
      <main className='container'>
        <form id="booking-form" onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-32'>
            <h1 className='text-5xl font-custom-700 text-text_1 font-gellix-Bold'>
              Complete your booking and pay
            </h1>
            <div className='flex flex-col lg:flex-row justify-between w-full gap-20'>
              <div className='flex flex-col gap-2 flex-1'>
                <BookingDetails
                  time={
                    detailsData?.data?.type === 'Stay'
                      ? (() => {
                          try {
                            // For stays, use checkin/checkout times if available
                            if (detailsData?.data?.checkinTime && detailsData?.data?.checkoutTime) {
                              return `${detailsData.data.checkinTime} - ${detailsData.data.checkoutTime}`;
                            }
                            
                            const startTime = new Date(bookingDateTime.startTime);
                            const endTime = new Date(bookingDateTime.endTime);
                            
                            console.log('🕐 Stay time formatting:', {
                              startTime: bookingDateTime.startTime,
                              endTime: bookingDateTime.endTime,
                              startTimeObj: startTime,
                              endTimeObj: endTime,
                              isValidStart: !isNaN(startTime.getTime()),
                              isValidEnd: !isNaN(endTime.getTime())
                            });
                            
                            if (!isNaN(startTime.getTime()) && !isNaN(endTime.getTime())) {
                              return `${startTime.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })} - ${endTime.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}`;
                            } else {
                              console.log('⚠️ Invalid time values, using fallback');
                              return 'Check-in/Check-out times';
                            }
                          } catch (error) {
                            console.error('❌ Error formatting stay time:', error);
                            return 'Check-in/Check-out times';
                          }
                        })()
                      : (() => {
                          try {
                            const startTime = new Date(bookingDateTime.startTime);
                            const endTime = new Date(bookingDateTime.endTime);
                            
                            console.log('🕐 Experience time formatting:', {
                              startTime: bookingDateTime.startTime,
                              endTime: bookingDateTime.endTime,
                              startTimeObj: startTime,
                              endTimeObj: endTime,
                              isValidStart: !isNaN(startTime.getTime()),
                              isValidEnd: !isNaN(endTime.getTime())
                            });
                            
                            if (!isNaN(startTime.getTime()) && !isNaN(endTime.getTime())) {
                              return `${startTime.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })} - ${endTime.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}`;
                            } else {
                              console.log('⚠️ Invalid time values, using fallback');
                              // Try to get time from site schedule as fallback
                              if (detailsData?.data?.schedule?.startDateTime && detailsData?.data?.schedule?.endDateTime) {
                                const scheduleStart = new Date(detailsData.data.schedule.startDateTime);
                                const scheduleEnd = new Date(detailsData.data.schedule.endDateTime);
                                if (!isNaN(scheduleStart.getTime()) && !isNaN(scheduleEnd.getTime())) {
                                  return `${scheduleStart.toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })} - ${scheduleEnd.toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}`;
                                }
                              }
                              return '02:00 PM - 04:00 PM';
                            }
                          } catch (error) {
                            console.error('❌ Error formatting experience time:', error);
                            return '02:00 PM - 04:00 PM';
                          }
                        })()
                  }
                  date={(() => {
                    if (detailsData?.data?.type === 'Stay') {
                      try {
                        const startDate = new Date(bookingDateTime.startDate);
                        const endDate = new Date(bookingDateTime.endDate);
                        
                        console.log('📅 Stay date formatting:', {
                          startDate: bookingDateTime.startDate,
                          endDate: bookingDateTime.endDate,
                          startDateObj: startDate,
                          endDateObj: endDate,
                          isValidStart: !isNaN(startDate.getTime()),
                          isValidEnd: !isNaN(endDate.getTime())
                        });
                        
                        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
                          return `${startDate.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric',
                          })} - ${endDate.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric',
                          })}`;
                        } else {
                          console.log('⚠️ Invalid date values, using fallback');
                          return 'Check-in - Check-out';
                        }
                      } catch (error) {
                        console.error('❌ Error formatting stay date:', error);
                        return 'Check-in - Check-out';
                      }
                    } else {
                      try {
                        const start = new Date(bookingDateTime.startDate);
                        const end = new Date(bookingDateTime.endDate);
                        
                        console.log('📅 Experience date formatting:', {
                          startDate: bookingDateTime.startDate,
                          endDate: bookingDateTime.endDate,
                          startDateObj: start,
                          endDateObj: end,
                          isValidStart: !isNaN(start.getTime()),
                          isValidEnd: !isNaN(end.getTime())
                        });
                        
                        if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
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
                          console.log('⚠️ Invalid date values, using fallback');
                          // Try to get date from site schedule as fallback
                          if (detailsData?.data?.schedule?.startDateTime && detailsData?.data?.schedule?.endDateTime) {
                            const scheduleStart = new Date(detailsData.data.schedule.startDateTime);
                            const scheduleEnd = new Date(detailsData.data.schedule.endDateTime);
                            if (!isNaN(scheduleStart.getTime()) && !isNaN(scheduleEnd.getTime())) {
                              return `(${scheduleStart.toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'short',
                                day: 'numeric',
                              })})`;
                            }
                          }
                          return '(Selected Date)';
                        }
                      } catch (error) {
                        console.error('❌ Error formatting experience date:', error);
                        return '(Selected Date)';
                      }
                    }
                  })()}
                  people={(() => {
                    const guests = bookingData?.guests;
                    if (!guests) return '';
                    const parts = [];
                    if (guests.adults > 0) parts.push(`${guests.adults} Adult${guests.adults > 1 ? 's' : ''}`);
                    if (guests.children > 0) parts.push(`${guests.children} Child${guests.children > 1 ? 'ren' : ''}`);
                    if (guests.infants > 0) parts.push(`${guests.infants} Infant${guests.infants > 1 ? 's' : ''}`);
                    return parts.join(', ');
                  })()}
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
                  onTransportationChange={handleTransportationChange}
                  onGuideChange={handleGuideChange}
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

                {enabledPaymentMethods.length > 0 && (
                  <>
                    <PaymentMethods
                      methods={enabledPaymentMethods}
                      selectedMethod={selectedPaymentMethod || ''}
                      onMethodChange={(method) => setValue('selectedPaymentMethod', method)}
                    />
                    <Divider className='w-full my-8' />
                  </>
                )}

                {!disableAttachment ? (
                  <div className='mb-24'>
                    {!financialReceipt && (
                      <div className='mb-2'>
                        <p className='text-sm text-red-600 font-medium'>
                          * Financial receipt is required for this payment method
                        </p>
                      </div>
                    )}
                    <FinancialReceiptUpload
                      control={control}
                      name='financialReceipt'
                      disabled={disableAttachment}
                    />
                  </div>
                ) : (
                  <div className='mb-24 p-4 bg-green-50 border border-green-200 rounded-lg'>
                    <p className='text-green-800 text-sm'>
                      No file attachment required for on-site payment methods. You can proceed with your booking.
                    </p>
                  </div>
                )}
              </div>
              <BookingSummary
                siteInfo={detailsData?.data}
                title={detailsData?.data?.name || ''}
                location={
                  `${detailsData?.data?.country?.name}, ${detailsData?.data?.city}` ||
                  ''
                }
                onSubmit={() => {
                  console.log('Submit button clicked');
                  handleSubmit(onSubmit)();
                }}
                bookingData={bookingData}
                isBookingCollectionPending={isBookingCollectionPending}
                isUploadingFile={isUploadingFile}
                transportationChecked={transportationChecked}
                guideChecked={guideChecked}
                airportChecked={airportChecked}
              />
            </div>
          </div>
        </form>
      </main>
    </InnerPagesLayout>
  );
};

export default CompleteYourBooking;
