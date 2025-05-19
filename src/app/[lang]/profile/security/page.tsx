'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePasswordSchema } from '@/utils/formsSchemas';
import { useTranslation } from '@/contexts/TranslationContext';
import FilledButton from '@/components/ui/buttons/FilledButton';
import PasswordInput from '@/components/form/PasswordInput';

type ChangePasswordFormData = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export default function SecurityPage() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: yupResolver(changePasswordSchema) as any,
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    setIsLoading(true);
    try {
      // API call would go here
      console.log('Form data:', data);
      // Show success message
      setTimeout(() => {
        setIsLoading(false);
        reset();
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className='text-xl font-semibold mb-6'>{t('profile.security')}</h2>
      <p className='text-gray-600 mb-8'>{t('profile.changePassword')}</p>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 max-w-md'>
        <Controller
          name='oldPassword'
          control={control}
          render={({ field }) => (
            <PasswordInput
              {...field}
              id='oldPassword'
              label={t('profile.oldPassword')}
              error={errors.oldPassword?.message}
            />
          )}
        />

        <Controller
          name='newPassword'
          control={control}
          render={({ field }) => (
            <PasswordInput
              {...field}
              id='newPassword'
              label={t('profile.newPassword')}
              error={errors.newPassword?.message}
            />
          )}
        />

        <Controller
          name='confirmNewPassword'
          control={control}
          render={({ field }) => (
            <PasswordInput
              {...field}
              id='confirmNewPassword'
              label={t('profile.confirmPassword')}
              error={errors.confirmNewPassword?.message}
            />
          )}
        />

        <div className='pt-6'>
          <FilledButton
            text={t('profile.changePasswordBtn')}
            buttonType='submit'
            isDisable={isLoading}
            className='w-full py-3 rounded-lg text-xl'
            isButton
          />
        </div>
      </form>
    </div>
  );
}
