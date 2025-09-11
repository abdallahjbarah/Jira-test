'use client';

import CustomLink from '@/components/ui/CustomLink';
import { useTranslation } from '@/contexts/TranslationContext';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type PaymentStatus = 'success' | 'declined' | 'cancelled';

interface PaymentStatusConfig {
  icon: React.ReactNode;
  iconColor: string;
  bgColor: string;
  borderColor: string;
}

const PaymentStatusPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t, locale, dictionary } = useTranslation();
  const [status, setStatus] = useState<PaymentStatus | null>(null);

  useEffect(() => {
    const statusParam = searchParams.get('status') as PaymentStatus;
    if (
      statusParam &&
      ['success', 'declined', 'cancelled'].includes(statusParam)
    ) {
      setStatus(statusParam);
    } else {
      router.push(`/${locale}`);
    }
  }, [searchParams, router, locale]);

  if (!status) {
    return null;
  }

  const statusConfigs: Record<PaymentStatus, PaymentStatusConfig> = {
    success: {
      icon: <CheckCircleIcon className='w-16 h-16' />,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    declined: {
      icon: <XCircleIcon className='w-16 h-16' />,
      iconColor: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
    },
    cancelled: {
      icon: <ExclamationTriangleIcon className='w-16 h-16' />,
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-500',
      borderColor: 'border-yellow-200',
    },
  };

  const config = statusConfigs[status];
  const paymentData = dictionary.payment?.[status];

  const handleAction = () => {
    switch (status) {
      case 'declined':
        router.back();
        break;
      case 'cancelled':
        router.back();
        break;
      default:
        break;
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
      <div
        className={`max-w-md w-full ${config.bgColor} rounded-2xl shadow-lg border ${config.borderColor} p-8 text-center`}
      >
        <div className={`${config.iconColor} flex justify-center mb-6`}>
          {config.icon}
        </div>

        <h1 className='text-3xl font-bold text-gray-900 mb-2 font-gellix-Bold'>
          {paymentData?.title || t(`payment.${status}.title`)}
        </h1>

        <p className='text-lg text-gray-600 mb-4 font-gellix-Regular'>
          {paymentData?.subtitle || t(`payment.${status}.subtitle`)}
        </p>

        <p className='text-gray-500 mb-8 leading-relaxed font-gellix-Regular'>
          {paymentData?.description || t(`payment.${status}.description`)}
        </p>

        <div className='space-y-4'>
          {status !== 'success' && (
            <button
              onClick={handleAction}
              className={`w-full py-3 px-6 rounded-xl font-semibold transition-colors ${
                status === 'declined'
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-yellow-600 hover:bg-yellow-700 text-white'
              } font-gellix-Bold`}
            >
              {paymentData?.action || t(`payment.${status}.action`)}
            </button>
          )}

          <CustomLink
            path='/'
            className='w-full py-3 px-6 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors inline-flex items-center justify-center gap-2 font-gellix-Regular'
          >
            <HomeIcon className='w-4 h-4' />
            {t('payment.backToHome')}
          </CustomLink>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatusPage;
