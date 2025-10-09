'use client';
import FilledButton from '@/components/ui/buttons/FilledButton';
import React, { useCallback, useState } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { useTranslation } from '../../../../contexts/TranslationContext';

interface SmartSubmitButtonProps<T extends FieldValues = FieldValues>
  extends UseControllerProps<T> {
  className?: string;
  disabled?: boolean;
  disableAttachment: boolean;
  onSubmit: () => void;
  isBookingCollectionPending: boolean;
  isUploadingFile: boolean;
}

const SmartSubmitButton = <T extends FieldValues = FieldValues>({
  control,
  name,
  className = '',
  disabled = false,
  disableAttachment,
  onSubmit,
  isBookingCollectionPending,
  isUploadingFile,
  ...controllerProps
}: SmartSubmitButtonProps<T>) => {
  const [uploadError, setUploadError] = useState<string | null>(null);

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name,
    ...controllerProps,
  });

  const acceptedFileTypes = [
    'application/pdf',
    'text/plain',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
  ];
  const maxFileSize = 10 * 1024 * 1024;

  const validateFile = (file: File): string | null => {
    if (!acceptedFileTypes.includes(file.type)) {
      return 'Only PDF, TXT, and image files (JPG, PNG, GIF, WebP) are allowed';
    }
    if (file.size > maxFileSize) {
      return 'File size must be less than 10MB';
    }
    return null;
  };

  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const file = files[0];
      const validationError = validateFile(file);

      if (validationError) {
        setUploadError(validationError);
        return;
      }

      setUploadError(null);
      onChange(file);
    },
    [onChange]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFileSelect(e.target.files);
    },
    [handleFileSelect]
  );

  const handleRemoveFile = useCallback(() => {
    onChange(null);
    setUploadError(null);
  }, [onChange]);

  const handleButtonClick = () => {
    // If attachment is disabled, always submit
    if (disableAttachment) {
      onSubmit();
      return;
    }

    // If no file and attachment required, open file dialog
    if (!value) {
      document.getElementById('smart-submit-file-input')?.click();
      return;
    }

    // If file exists, submit
    onSubmit();
  };

  const getFileIcon = (fileType: string) => {
    if (fileType === 'application/pdf') {
      return (
        <svg
          className='w-8 h-8 text-red-500'
          fill='currentColor'
          viewBox='0 0 24 24'
        >
          <path d='M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z' />
        </svg>
      );
    } else if (fileType.startsWith('image/')) {
      return (
        <svg
          className='w-8 h-8 text-green-500'
          fill='currentColor'
          viewBox='0 0 24 24'
        >
          <path d='M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z' />
        </svg>
      );
    } else {
      return (
        <svg
          className='w-8 h-8 text-blue-500'
          fill='currentColor'
          viewBox='0 0 24 24'
        >
          <path d='M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z' />
        </svg>
      );
    }
  };

  const renderFilePreview = () => {
    if (!value) return null;

    if (value.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(value);
      return (
        <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4'>
          <div className='flex items-center gap-3'>
            <div className='flex-shrink-0'>
              <img
                src={imageUrl}
                alt={value.name}
                className='w-12 h-12 object-cover rounded'
                onLoad={() => URL.revokeObjectURL(imageUrl)}
              />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-gray-900 truncate'>
                {value.name}
              </p>
              <p className='text-xs text-gray-500'>
                {(value.size / 1024 / 1024).toFixed(2)} MB • Image
              </p>
            </div>
          </div>
          <button
            type='button'
            onClick={handleRemoveFile}
            className='ml-4 text-gray-400 hover:text-red-500 transition-colors'
            disabled={disabled}
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
      );
    }

    return (
      <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4'>
        <div className='flex items-center gap-3'>
          <div className='flex-shrink-0'>{getFileIcon(value.type)}</div>
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-medium text-gray-900 truncate'>
              {value.name}
            </p>
            <p className='text-xs text-gray-500'>
              {(value.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
        <button
          type='button'
          onClick={handleRemoveFile}
          className='ml-4 text-gray-400 hover:text-red-500 transition-colors'
          disabled={disabled}
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
    );
  };

  // Determine button text based on current state
  const getButtonText = () => {
    if (disableAttachment) {
      return t('booking.Submit');
    }
    if (!value) {
      return t('booking.AttachTheFinancialReceipt');
    }
    return t('booking.Submit');
  };

  const isButtonDisabled =
    disabled || isBookingCollectionPending || isUploadingFile;

  const { t } = useTranslation();
  return (
    <div className={`flex flex-col gap-4 mb-24 ${className}`}>
      <input
        id='smart-submit-file-input'
        type='file'
        accept='.pdf,.txt,application/pdf,text/plain,.jpg,.jpeg,.png,.gif,.webp,image/jpeg,image/png,image/gif,image/webp'
        onChange={handleInputChange}
        disabled={disabled}
        className='hidden'
      />

      {/* Show file preview when file is selected */}
      {value && renderFilePreview()}

      {/* Show warning message for required attachment when no file selected */}
      {!disableAttachment && !value && (
        <div className='mb-2'>
          <p className=' text-red-600 font-medium text-custom-12 mobileM:text-custom-14'>
            * {t('completeYourBooking.financialReceiptRequired')}
          </p>
        </div>
      )}

      {/* Show info message for on-site payments */}
      {/* {disableAttachment && (
        <div className='mb-4 p-4 bg-green-50 border border-green-200 rounded-lg'>
          <p className='text-green-800 text-custom-12 mobileM:text-custom-14'>
            No file attachment required for Credit/Debit Card (Visa/Mastercard).
            You can proceed with your booking.
          </p>
        </div>
      )} */}

      {/* Smart button that handles both attach and submit */}
      <FilledButton
        text={getButtonText()}
        width='w-full'
        className='bg-primary_1 text-white px-6 py-3 rounded-lg font-custom-700 font-gellix-Bold max-w-[312px] min-w-[312px] text-custom-12 mobileM:text-custom-14'
        icon={null}
        onClick={handleButtonClick}
        buttonType='button'
        isDisable={isButtonDisabled}
        isButton
      />

      {/* Show error messages */}
      {(uploadError || error) && (
        <p className='text-sm text-red-500'>{uploadError || error?.message}</p>
      )}
    </div>
  );
};

export default SmartSubmitButton;
