'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from '@/contexts/TranslationContext';
import { useCreateTicket } from '@/lib/apis/helpCenter/useMutateTicket';
import { useUploadFile } from '@/lib/apis/files/useUploadFile';
import { FileFolder } from '@/lib/enums';
import { toast } from 'react-toastify';

interface FormData {
  subject: string;
  description: string;
  file?: FileList;
}

interface CreateTicketProps {
  onSubmit: (data: FormData) => void;
  onClose: () => void;
  onFAQClick: (e: React.MouseEvent) => void;
}

const CreateTicket: React.FC<CreateTicketProps> = ({
  onSubmit,
  onClose,
  onFAQClick,
}) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const file = watch('file');
  const [pendingFormData, setPendingFormData] = useState<FormData | null>(null);

  const { mutate: createTicket, isPending: isCreatingTicket } = useCreateTicket(
    {
      onSuccess: () => {
        toast.success(t('helpCenter.thankYouMessage'));
        setPendingFormData(null);
        onClose();
      },
      onError: () => {
        toast.error(t('helpCenter.errorMessage'));
        setPendingFormData(null);
      },
    },
  );

  const { mutate: uploadFile, isPending: isUploadingFile } = useUploadFile({
    onSuccess: (uploadedUrl: string) => {
      if (pendingFormData) {
        createTicket({
          subject: pendingFormData.subject,
          message: pendingFormData.description,
          attachment: uploadedUrl,
        });
      }
    },
    onError: () => {
      toast.error(t('helpCenter.fileUploadError'));
      setPendingFormData(null);
    },
  });

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmitForm: SubmitHandler<FormData> = (data) => {
    if (data.file && data.file[0]) {
      setPendingFormData(data);
      uploadFile({
        file: data.file[0],
        folderName: FileFolder.TICKETS,
      });
    } else {
      createTicket({
        subject: data.subject,
        message: data.description,
        attachment: '',
      });
    }
  };

  const isPending = isCreatingTicket || isUploadingFile;

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className='w-full'>
      <div className='absolute top-[120px] left-1/2 transform -translate-x-1/2 w-[296px] h-[54px] flex flex-col items-center'>
        <div className='w-[121px] h-[29px] font-bold text-2xl leading-[29px] text-center text-[#222222] mx-auto mb-1 whitespace-nowrap'>
          {t('helpCenter.needHelp')}
        </div>
        <div className='w-[296px] h-[17px] font-normal text-sm leading-[17px] text-center text-[#222222]'>
          {t('helpCenter.sendMessage')}
        </div>
      </div>

      <div className='absolute top-[240px] left-1/2 transform -translate-x-1/2 w-[456px] h-[58.94px]'>
        <input
          className='w-full h-[58.94px] bg-white border border-[#EEEEEE] rounded-lg font-normal text-sm leading-[17px] text-[#555555] p-[18px_24px] box-border focus:outline-none focus:border-[#47C409] placeholder:text-[#555555] truncate'
          placeholder={t('helpCenter.subject')}
          {...register('subject', { required: true })}
        />
      </div>

      <div className='absolute top-[320px] left-1/2 transform -translate-x-1/2 w-[456px] h-[176.82px]'>
        <textarea
          className='w-full h-[176.82px] bg-white border border-[#EEEEEE] rounded-lg font-normal text-sm leading-[17px] text-[#555555] p-[18px_24px] box-border resize-none focus:outline-none focus:border-[#47C409] placeholder:text-[#555555] break-words'
          placeholder={t('helpCenter.messagePlaceholder')}
          {...register('description', { required: true })}
        />
      </div>

      <div className='absolute top-[520px] left-1/2 transform -translate-x-1/2 w-[456px] h-[58.94px] flex items-center'>
        <input
          className='w-full h-[58.94px] bg-white border border-[#EEEEEE] rounded-lg font-normal text-sm leading-[17px] text-[#555555] p-[18px_24px] box-border cursor-pointer text-left focus:outline-none focus:border-[#47C409] placeholder:text-[#555555] truncate'
          placeholder={file?.[0]?.name || t('helpCenter.attachFile')}
          readOnly
          onClick={handleAttachClick}
        />
        <div
          className='absolute right-[2.52%] w-[23px] h-[29px] flex items-center justify-center cursor-pointer z-10'
          onClick={handleAttachClick}
        >
          <Image
            src='/SVGs/shared/Attach.svg'
            alt='Attach file'
            width={23}
            height={29}
          />
        </div>
        <input
          type='file'
          className='hidden'
          {...register('file')}
          ref={(e) => {
            register('file').ref(e);
            fileInputRef.current = e;
          }}
          accept='image/*,application/pdf'
          multiple={false}
        />
      </div>

      <button
        type='submit'
        className='absolute left-[194px] top-[644px] w-[179px] h-12 bg-[#47C409] shadow-[0px_10px_40px_rgba(71,196,9,0.25)] rounded-lg border-none text-white font-bold text-xl leading-6 text-center cursor-pointer'
        disabled={isPending}
      >
        {isPending ? t('helpCenter.saving') : t('helpCenter.save')}
      </button>

      <div className='absolute left-[36.75%] right-[35.51%] top-[94.09%] bottom-[4.07%] font-normal text-xs leading-[14px] text-center text-[#222222]'>
        {t('helpCenter.checkFAQs')}{' '}
        <a
          className='text-[#47C409] no-underline cursor-pointer hover:underline'
          onClick={onFAQClick}
        >
          {t('helpCenter.faqs')}
        </a>
      </div>
    </form>
  );
};

export default CreateTicket;
