'use client';
import CircularLoader from '@/components/ui/CircularLoader';
import { useTranslation } from '@/contexts/TranslationContext';
import { useFetchInfiniteCollections } from '@/lib/apis/collections/useFetchCollections';
import { Site, SitesResponse } from '@/lib/types';
import { COLLECTION_STATUS, COLLECTION_STATUS_LIST } from '@/utils/constants';
import {
  buildFiltersFromSearchParams,
  convertToBackendFilters,
} from '@/utils/helpers/filterHelpers';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Styled from 'styled-components';
import CollectionCard from '../CollectionCard';
import CollectionTypeLabel from '../CollectionTypeLabel';
import MapView from '../MapView';

const CollectionsListingContainer = Styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(312px, 1fr));
  gap: 16px;
  padding-left: 32px;
  padding-right: 32px;
  @media (max-width: 768px) {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const LoaderContainer = Styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 40px 0;
`;

const MapToggleWidget = Styled.div`
  position: fixed;
  right: -60px;
  top: 40%;
  transform: translateY(-50%) rotate(270deg);
  z-index: 1000;
  background: var(--secondary-color);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 4px 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: start;
  gap: 12px;
  min-width: 120px;
  max-width: 200px;
  min-height: 60px;
  max-height: 60px;

  &:hover {
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
    transform: translateY(-50%) rotate(270deg) scale(1.05);
  }

  @media (max-width: 1024px) {
    right: -55px;
    padding: 6px 16px;
    gap: 10px;
    min-width: 100px;
    max-width: 160px;
    min-height: 70px;
    max-height: 70px;
  }

  @media (max-width: 768px) {
    right: -50px;
    transform: translateY(-50%) rotate(270deg) scale(0.8);
    padding: 4px 12px;
    gap: 8px;
    min-width: 80px;
    max-width: 120px;
    min-height: 80px;
    max-height: 80px;
  }

  @media (max-width: 480px) {
    right: -45px;
    transform: translateY(-50%) rotate(270deg) scale(0.7);
    padding: 3px 10px;
    gap: 6px;
    min-width: 70px;
    max-width: 100px;
    min-height: 70px;
    max-height: 70px;
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
        collection => collection.value === currentCollectionStatus
      ),
    [currentCollectionStatus]
  );

  // Build frontend filters from URL search parameters
  const frontendFilters = React.useMemo(() => {
    return buildFiltersFromSearchParams(
      searchParams,
      collectionStatus as string
    );
  }, [searchParams, collectionStatus]);

  // Convert frontend filters to backend API parameters
  const backendFilters = React.useMemo(() => {
    const backendParams = convertToBackendFilters(
      frontendFilters,
      collectionStatus as string
    );

    // Add pagination parameters
    return {
      ...backendParams,
      limit: isMapView ? 100 : 20,
    };
  }, [frontendFilters, collectionStatus, isMapView]);

  // Create base filters without search parameters for "You May Also Like"
  const baseBackendFilters = React.useMemo(() => {
    // Only pass collection type for base filters
    const baseFrontendFilters = {
      type: collectionStatus as string,
    };

    const baseBackendParams = convertToBackendFilters(
      baseFrontendFilters,
      collectionStatus as string
    );

    return {
      ...baseBackendParams,
      limit: 8, // Show fewer items for "You May Also Like"
    };
  }, [collectionStatus]);

  const {
    data: collectionsResponse,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchInfiniteCollections(backendFilters);

  // Fetch base collections for "You May Also Like"
  const { data: baseCollectionsResponse, isLoading: isLoadingBase } =
    useFetchInfiniteCollections(baseBackendFilters);

  const collections = React.useMemo(() => {
    if (!collectionsResponse?.pages) return [];
    return collectionsResponse.pages.flatMap(
      (page: SitesResponse) => page.sites.data
    );
  }, [collectionsResponse?.pages]);

  const baseCollections = React.useMemo(() => {
    if (!baseCollectionsResponse?.pages) return [];
    return baseCollectionsResponse.pages.flatMap(
      (page: SitesResponse) => page.sites.data
    );
  }, [baseCollectionsResponse?.pages]);

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

  const youMayAlsoLikeGrid = React.useMemo(() => {
    if (!baseCollections?.length) return null;

    return (
      <CollectionsListingContainer className='mt-[31px]'>
        {baseCollections.map((collection: Site, index: number) => (
          <MemoizedCollectionCard key={index} collection={collection} />
        ))}
      </CollectionsListingContainer>
    );
  }, [baseCollections]);

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
        <div className='text-center py-10'>
          <Image
            src='/images/shared/no-result.png'
            alt='No results found'
            width={300}
            height={200}
            className='mx-auto'
          />
          <h3 className='text-2xl font-semibold text-gray-800 mt-4 mb-6'>
            No Result Found
          </h3>
          {!isLoadingBase && baseCollections?.length > 0 && (
            <div className='mt-8'>
              <h3 className='text-2xl font-semibold text-gray-800 mb-6 text-left'>
                You May Also Like
              </h3>
              {youMayAlsoLikeGrid}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className='relative'>
      {!isMapView && (
        <MapToggleWidget onClick={handleMapToggle} title={t('map.showMapView')}>
          <img
            src='/SVGs/shared/map-icon.svg'
            alt='Map Icon'
            className='w-[20px] h-[20px] text-white'
          />
          <span className='text-white font-medium text-sm'>
            {t('map.showMapView')}
          </span>
        </MapToggleWidget>
      )}

      {isMapView ? (
        <div ref={mapContainerRef}>
          <MapView collections={collections} onBackToList={handleBackToList} />
        </div>
      ) : (
        <>
          <CollectionTypeLabel />
          {collectionsGrid}
          {hasNextPage && (
            <div className='flex justify-center mt-8'>
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className='px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50'
              >
                {isFetchingNextPage ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CollectionsListing;
