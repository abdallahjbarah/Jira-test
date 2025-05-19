'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { currencySchema } from '@/utils/formsSchemas';
import { useTranslation } from '@/contexts/TranslationContext';
import FilledButton from '@/components/ui/buttons/FilledButton';
import RadioButton from '@/components/ui/RadioButton';
import { CurrencyOption } from '@/types';

type CurrencyFormData = {
  currency: string;
};

export default function CurrencyPage() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  // Format the currencies to match the image design
  const currencyOptions: CurrencyOption[] = [
    {
      value: 'usd',
      label: 'USD - $',
      description: t('profile.currencies.usd'),
    },
    { value: 'jod', label: 'JOD', description: t('profile.currencies.jod') },
    {
      value: 'aud',
      label: 'AUD - $',
      description: t('profile.currencies.aud'),
    },
    { value: 'brl', label: 'BRL', description: t('profile.currencies.brl') },
    { value: 'gbp', label: 'GBP', description: t('profile.currencies.gbp') },
    { value: 'eur', label: 'EUR', description: t('profile.currencies.eur') },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CurrencyFormData>({
    resolver: yupResolver(currencySchema) as any,
    defaultValues: {
      currency: 'usd',
    },
  });

  const onSubmit = (data: CurrencyFormData) => {
    setIsLoading(true);
    try {
      // API call would go here
      console.log('Form data:', data);
      // Show success message
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
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
          <FilledButton
            text={t('profile.save')}
            buttonType='submit'
            isDisable={isLoading}
            className='py-3 px-6 text-xl rounded-lg w-full'
            isButton
          />
        </div>
      </form>
    </div>
  );
}
