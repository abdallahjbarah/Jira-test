import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import FilterSection from './FilterSection';
import { useFetchExperienceType } from '@/lib/apis/shared/useFetchExperienceType';
import { useParams } from 'next/navigation';
import { COLLECTION_STATUS, COLLECTION_STATUS_LIST } from '@/utils/constants';
import { useTranslation } from '@/contexts/TranslationContext';

const CollectionTypeField: React.FC = () => {
  const { control } = useFormContext();
  const { collectionStatus } = useParams();
  const { locale, t } = useTranslation();

  const collectionStatusObject = React.useMemo(() => {
    return COLLECTION_STATUS_LIST.find(
      (status) => status.value === collectionStatus,
    );
  }, [collectionStatus]);

  const { data: experienceTypes } = useFetchExperienceType({
    isStayType: collectionStatusObject?.filterValue === 'Stay',
  });

  const experienceTypesList = React.useMemo(() => {
    return (
      experienceTypes?.map((type) => ({
        value: type._id,
        label: { en: type.nameEn, ar: type.nameAr },
      })) ?? []
    );
  }, [experienceTypes]);

  const titleLabel = React.useMemo(() => {
    if (collectionStatusObject?.value === COLLECTION_STATUS.ALL) {
      return t('experience');
    }
    return locale === 'ar'
      ? `${t('type')} ${collectionStatusObject?.label[locale] ?? ''}`
      : `${collectionStatusObject?.label[locale] ?? ''} ${t('type')}`;
  }, [collectionStatusObject, locale, t]);

  return (
    <Controller
      name='experienceTypes'
      control={control}
      render={({ field }) => (
        <FilterSection
          // if status is all show experiance
          title={titleLabel}
          options={experienceTypesList}
          selectedValues={field.value}
          onChange={field.onChange}
        />
      )}
    />
  );
};

export default CollectionTypeField;
