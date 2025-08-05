'use client';
import React from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import InnerHeader from '@/components/layout/InnerHeader';

interface ProfileLayoutProps {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

export default function ProfileLayout({
  children,
  params,
}: ProfileLayoutProps) {
  const { t } = useTranslation();
  const pathname = usePathname();

  const tabs = [
    {
      id: 'personal-info',
      label: t('profile.personalInfo'),
      href: `/${params.lang}/profile/personal-info`,
    },
    {
      id: 'security',
      label: t('profile.security'),
      href: `/${params.lang}/profile/security`,
    },
    {
      id: 'currency',
      label: t('profile.currency'),
      href: `/${params.lang}/profile/currency`,
    },
  ];

  return (
    <>
      <InnerHeader withNavItems={true} />
      <div className='desktop:max-w-[1440px] mx-auto py-8 px-4'>
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='w-full md:w-1/4'>
            <div className='bg-white rounded-lg shadow border border-solid border-secondary_2 p-4'>
              <ul className='space-y-2'>
                {tabs.map((tab) => {
                  const isActive = pathname.includes(tab.id);
                  return (
                    <li key={tab.id}>
                      <Link
                        href={tab.href}
                        className={`block p-3 rounded-lg transition-all ${isActive
                            ? 'bg-primary_1 text-white'
                            : 'hover:bg-gray-100'
                          }`}
                      >
                        {tab.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className='w-full md:w-3/4'>
            <div className='bg-white rounded-lg shadow border border-solid border-secondary_2 p-6'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
