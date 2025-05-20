'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { currencySchema } from '@/utils/formsSchemas';
import { useTranslation } from '@/contexts/TranslationContext';
import FilledButton from '@/components/ui/buttons/FilledButton';
import RadioButton from '@/components/ui/RadioButton';
import { CurrencyOption } from '@/types';
import useUser from '@/utils/hooks/useUser';
import { useEditUser } from '@/lib/apis/users/useEditUser';
import { toast } from 'react-toastify';
import CircularLoader from '@/components/ui/CircularLoader';
import { useQueryClient } from '@tanstack/react-query';

type CurrencyFormData = {
  currency: string;
};

export default function CurrencyPage() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  // Format the currencies to match the image design
  const currencyOptions: CurrencyOption[] = [
    {
      value: 'USD',
      label: 'USD - $',
      description: t('profile.currencies.usd'),
    },
    { value: 'JOD', label: 'JOD', description: t('profile.currencies.jod') },
    {
      value: 'AUD',
      label: 'AUD - $',
      description: t('profile.currencies.aud'),
    },
    { value: 'BRL', label: 'BRL', description: t('profile.currencies.brl') },
    { value: 'GBP', label: 'GBP', description: t('profile.currencies.gbp') },
    { value: 'EUR', label: 'EUR', description: t('profile.currencies.eur') },
  ];

  const { userData } = useUser();

  const { mutate: editUser, isPending: isEditing } = useEditUser({
    onSuccess: (data) => {
      console.log(data, 'data');
      // update user data query cache
      queryClient.setQueryData(['user'], (old: any) => {
        return {
          ...old,
          user: { ...old.user, currency: data.currency },
        };
      });
      toast.success(t('profile.currencyUpdated'));
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CurrencyFormData>({
    resolver: yupResolver(currencySchema) as any,
    defaultValues: {
      currency: userData?.user.currency,
    },
  });

  const onSubmit = (data: CurrencyFormData) => {
    editUser({
      userId: userData?.user._id,
      currency: data.currency,
    });
  };

  return (
    <div>
      <h2 className='text-xl font-semibold mb-6'>{t('profile.currency')}</h2>
      <p className='text-gray-600 mb-8'>{t('profile.currencyDescription')}</p>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 max-w-md'>
        <div className='flex flex-col space-y-2'>
          <Controller
            name='currency'
            control={control}
            render={({ field }) => (
              <div className='flex flex-col gap-4'>
                {currencyOptions.map((currency) => (
                  <div
                    key={currency.value}
                    className='border-b border-gray-100 last:border-b-0'
                  >
                    <RadioButton
                      id={`currency-${currency.value}`}
                      name='currency'
                      label={currency.label}
                      description={currency.description}
                      value={currency.value}
                      checked={field.value === currency.value}
                      onChange={(value) => field.onChange(value)}
                      className='w-full text-base'
                    />
                  </div>
                ))}
              </div>
            )}
          />
          {errors.currency && (
            <p className='mt-1 text-sm text-red-600'>
              {errors.currency.message}
            </p>
          )}
        </div>

        <div className='flex justify-center pt-4'>
          {isEditing ? (
            <CircularLoader size={30} />
          ) : (
            <FilledButton
              text={t('profile.save')}
              buttonType='submit'
              isDisable={isEditing}
              className='py-3 px-6 text-xl rounded-lg w-full'
              isButton
            />
          )}
        </div>
      </form>
    </div>
  );
}
