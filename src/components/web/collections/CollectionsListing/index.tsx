'use client';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import CollectionTypeLabel from '../CollectionTypeLabel';
import MapView from '../MapView';
import { useFetchInfiniteCollections } from '@/lib/apis/collections/useFetchCollections';
import { COLLECTION_STATUS, COLLECTION_STATUS_LIST } from '@/utils/constants';
import { useParams, useSearchParams } from 'next/navigation';
import CollectionCard from '../CollectionCard';
import Styled from 'styled-components';
import CircularLoader from '@/components/ui/CircularLoader';
import { Site, SitesResponse } from '@/lib/types';
import { buildFiltersFromSearchParams } from '@/utils/helpers/filterHelpers';
import CustomSvg from '@/components/ui/CustomSvg';
import { useTranslation } from '@/contexts/TranslationContext';

const CollectionsListingContainer = Styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(312px, 1fr));
  gap: 52px;
`;

const LoaderContainer = Styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 40px 0;
`;

const MapToggleWidget = Styled.div`
  position: fixed;
  right: -62px;
  top: 50%;
  transform: translateY(-50%) rotate(270deg);
  z-index: 1000;
  background: var(--secondary-color);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 12px 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 25px;

  &:hover {
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
    transform: translateY(-50%) rotate(270deg) scale(1.05);
  }

  @media (max-width: 768px) {
    transform: translateY(-50%) rotate(270deg) scale(0.6);
    right: -77px;
  }

`;

const MemoizedCollectionCard = React.memo(CollectionCard);

function CollectionsListing(): React.ReactElement {
  const { collectionStatus } = useParams();
  const searchParams = useSearchParams();
  const [isMapView, setIsMapView] = useState(false);
  const { t } = useTranslation();
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const currentCollectionStatus = collectionStatus || COLLECTION_STATUS.ALL;

  const collectionObject = React.useMemo(
    () =>
      COLLECTION_STATUS_LIST.find(
        (collection) => collection.value === currentCollectionStatus,
      ),
    [currentCollectionStatus],
  );

  const filters = React.useMemo(() => {
    const baseFilters = buildFiltersFromSearchParams(
      searchParams,
      collectionObject?.filterValue === COLLECTION_STATUS.ALL
        ? null
        : collectionObject?.filterValue,
    );

    return {
      ...baseFilters,
      limit: isMapView ? 100 : 20,
    };
  }, [collectionObject?.filterValue, searchParams, isMapView]);

  const {
    data: collectionsResponse,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchInfiniteCollections(filters);

  const collections = React.useMemo(() => {
    if (!collectionsResponse?.pages) return [];
    return collectionsResponse.pages.flatMap(
      (page: SitesResponse) => page.sites.data,
    );
  }, [collectionsResponse?.pages]);

  const handleMapToggle = useCallback(() => {
    setIsMapView(!isMapView);
  }, [isMapView]);

  useEffect(() => {
    if (isMapView && mapContainerRef.current) {
      setTimeout(() => {
        mapContainerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  }, [isMapView]);

  const handleBackToList = useCallback(() => {
    setIsMapView(false);
  }, []);

  const debouncedFetchNextPage = React.useMemo(() => {
    let timeoutId: NodeJS.Timeout;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }, 100);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleIntersect = React.useCallback(() => {
    debouncedFetchNextPage();
  }, [debouncedFetchNextPage]);

  const collectionsGrid = React.useMemo(() => {
    if (!collections?.length) return null;

    return (
      <CollectionsListingContainer className='mt-[31px]'>
        {collections.map((collection: Site, index: number) => (
          <MemoizedCollectionCard key={index} collection={collection} />
        ))}
      </CollectionsListingContainer>
    );
  }, [collections]);

  if (isLoading) {
    return (
      <div>
        <CollectionTypeLabel />
        <LoaderContainer>
          <CircularLoader size={50} />
        </LoaderContainer>
      </div>
    );
  }

  if (!collections?.length) {
    return (
      <div>
        <CollectionTypeLabel />
        <div className='text-center text-gray-500 text-lg py-10'>
          {t('searchResults.noResults')}
        </div>
      </div>
    );
  }

  return (
    <div className='relative'>
      {!isMapView && (
        <MapToggleWidget onClick={handleMapToggle} title={t('map.showMapView')}>
          <CustomSvg
            src='/SVGs/shared/map-icon.svg'
            className='text-white'
            width={45}
            height={45}
            alt='Map Icon'
          />
          <span className='text-white text-custom-30'>{t('mapLabel')}</span>
        </MapToggleWidget>
      )}

      {isMapView ? (
        <>
          <CollectionTypeLabel />
          <div ref={mapContainerRef} className='mt-[31px]'>
            <MapView
              collections={collections}
              isLoading={isLoading}
              onBackToList={handleBackToList}
            />
          </div>
        </>
      ) : (
        <>
          <CollectionTypeLabel />
          {collectionsGrid}
          {hasNextPage ? (
            <div className='flex justify-center items-center py-5'>
              <button
                className='bg-primary_1 text-white px-4 py-2 rounded-md'
                onClick={() => fetchNextPage()}
              >
                {t('loadMore')}
              </button>
            </div>
          ) : (
            <div className='text-center text-gray-500 text-lg py-10'>
              No more results
            </div>
          )}

          {isFetchingNextPage && (
            <div className='flex justify-center items-center py-5'>
              <CircularLoader size={50} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default React.memo(CollectionsListing);
