import React from 'react';
import styled from 'styled-components';
import Modal from '@/components/ui/Modal';
import { useTranslation } from '@/contexts/TranslationContext';
import { useFetchCancelReasons } from '@/lib/apis/cancel/useFetchCancelReasons';
import { CancelReason } from '@/lib/types';
import RadioButton from '@/components/ui/RadioButton';
import { Controller, useForm } from 'react-hook-form';
import Divider from '@/components/ui/Divider';
import { useCancelBooking } from '@/lib/apis/bookings/useCancelBooking';
import CircularLoader from '@/components/ui/CircularLoader';
import { toast } from 'react-toastify';
import { WretchError } from 'wretch';
interface CancelationReasonsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  onCancel: () => void;
}

const CancelButton = styled.button`
  background-color: #5ac42a;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
  width: 100%;
  margin-top: 37px;

  &:hover {
    background-color: #4ca224;
  }
`;

const ContactText = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #666;
`;

const ContactLink = styled.span`
  color: #5ac42a;
  cursor: pointer;
  font-weight: 500;
`;

const CancelationReasonsModal: React.FC<CancelationReasonsModalProps> = ({
  isOpen,
  onClose,
  onCancel,
  bookingId,
}) => {
  const { locale, t } = useTranslation();

  const { data: cancelReasons, isLoading: isLoadingCancelReasons } =
    useFetchCancelReasons();
  const reasons = React.useMemo(() => {
    return cancelReasons?.map((reason: CancelReason) => ({
      ...reason,
      name: { en: reason.reasonEn, ar: reason.reasonAr },
    }));
  }, [cancelReasons, locale]);

  const { control, handleSubmit, watch } = useForm();

  const { mutate: cancelBooking, isPending } = useCancelBooking({
    onSuccess: () => {
      onCancel();
    },
    onError: (error: WretchError) => {
      toast.error(error.json.message);
    },
  });

  const onSubmit = (data: any) => {
    if (data.cancelReasonID === 'other') {
      cancelBooking({
        bookingID: bookingId,
        cancelReasonOther: data.cancelReasonOther,
        cancelReasonID: null,
      });
    } else {
      cancelBooking({
        bookingID: bookingId,
        cancelReasonID: data.cancelReasonID,
        cancelReasonOther: "",
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('bookingStatus.cancellationPolicyModal.title')}
      width='540px'
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1 className='text-text_1 text-base font-bold'>
            {t('bookingStatus.cancellationReasonsModal.reasons')}
          </h1>
          {isLoadingCancelReasons ? (
            <div className='flex justify-center items-center h-full'>
              <CircularLoader />
            </div>
          ) : (
            <div className='space-y-4 mt-[19px]'>
              <Controller
                control={control}
                name='cancelReasonID'
                rules={{
                  required: {
                    value: true,
                    message: t(
                      'bookingStatus.cancellationReasonsModal.reasonRequired',
                    ),
                  },
                }}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <div className='space-y-4'>
                      {reasons?.map(
                        (
                          reason: CancelReason & {
                            name: { en: string; ar: string };
                          },
                        ) => (
                          <div
                            key={reason._id}
                            className='border border-solid border-secondary_3 py-3 px-4 rounded-lg'
                          >
                            <RadioButton
                              id={`reason-${reason._id}`}
                              name='reason'
                              label={reason.name[locale]}
                              value={reason._id}
                              checked={field.value === reason._id}
                              onChange={(value) => field.onChange(value)}
                              className='w-full text-base'
                            />
                          </div>
                        ),
                      )}

                      <div className='border border-solid border-secondary_3 py-3 px-4 rounded-lg'>
                        <RadioButton
                          id='reason-other'
                          name='reason'
                          label='Other'
                          value='other'
                          checked={field.value === 'other'}
                          onChange={(value) => field.onChange(value)}
                          className='w-full !text-lg'
                        />

                        {field.value === 'other' && (
                          <>
                            <Divider className='my-4' />
                            <Controller
                              control={control}
                              name='cancelReasonOther'
                              rules={{
                                required: {
                                  value: true,
                                  message: t(
                                    'bookingStatus.cancellationReasonsModal.reasonRequired',
                                  ),
                                },
                                maxLength: {
                                  value: 450,
                                  message: t(
                                    'bookingStatus.cancellationReasonsModal.maxLength',
                                  ),
                                },
                                minLength: {
                                  value: 10,
                                  message: t(
                                    'bookingStatus.cancellationReasonsModal.minLength',
                                  ),
                                },
                              }}
                              render={({ field, fieldState: { error } }) => (
                                <>
                                  <textarea
                                    className='w-full focus-within:outline-none text-text_2 text-lg'
                                    placeholder='Write the reason...'
                                    {...field}
                                  />
                                  {error && (
                                    <p className='text-red-500 text-sm'>
                                      {error.message}
                                    </p>
                                  )}
                                </>
                              )}
                            />
                          </>
                        )}
                      </div>

                      {error && (
                        <p className='text-red-500 text-sm'>{error.message}</p>
                      )}
                    </div>
                  );
                }}
              />
            </div>
          )}

          <CancelButton disabled={isPending}>
            {isPending ? (
              <CircularLoader color='white' />
            ) : (
              t('bookingStatus.cancellationReasonsModal.send')
            )}
          </CancelButton>
        </div>
      </form>
    </Modal>
  );
};

export default CancelationReasonsModal;
