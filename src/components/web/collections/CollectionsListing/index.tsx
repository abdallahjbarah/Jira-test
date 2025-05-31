'use client';
import React from 'react';
import CollectionTypeLabel from '../CollectionTypeLabel';
import {
  useFetchCollections,
  useFetchInfiniteCollections,
} from '@/lib/apis/collections/useFetchCollections';
import {
  COLLECTION_STATUS,
  COLLECTION_STATUS_LIST,
  CollectionStatus,
} from '@/utils/constants';
import { useParams, useSearchParams } from 'next/navigation';
import CollectionCard from '../CollectionCard';
import Styled from 'styled-components';
import CircularLoader from '@/components/ui/CircularLoader';
import { IntersectionObserverTrigger } from '@/components/shared/IntersectionObserverTrigger';
import { Site, SitesResponse } from '@/lib/types';
import { Collection } from '@/lib/apis/collections/data';
import { buildFiltersFromSearchParams } from '@/utils/helpers/filterHelpers';

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

// Memoized collection card component to prevent unnecessary re-renders
const MemoizedCollectionCard = React.memo(CollectionCard);

function CollectionsListing(): React.ReactElement {
  const { collectionStatus } = useParams();
  const searchParams = useSearchParams();

  const collectionObject = React.useMemo(
    () =>
      COLLECTION_STATUS_LIST.find(
        (collection) => collection.value === collectionStatus,
      ),
    [collectionStatus],
  );

  // Build filter object from search params using helper
  const filters = React.useMemo(() => {
    const baseFilters = buildFiltersFromSearchParams(
      searchParams,
      collectionObject?.filterValue === COLLECTION_STATUS.ALL
        ? null
        : collectionObject?.filterValue,
    );

    // Increase page size for better performance
    return {
      ...baseFilters,
      limit: 20, // Load more items per page to reduce API calls
    };
  }, [collectionObject?.filterValue, searchParams]);

  const {
    data: collectionsResponse,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchInfiniteCollections(filters);

  // Memoize collections array to prevent unnecessary re-renders
  const collections = React.useMemo(() => {
    if (!collectionsResponse?.pages) return [];
    return collectionsResponse.pages.flatMap(
      (page: SitesResponse) => page.sites.data,
    );
  }, [collectionsResponse?.pages]);

  // Debounced intersection handler to prevent rapid API calls
  const debouncedFetchNextPage = React.useMemo(() => {
    let timeoutId: NodeJS.Timeout;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }, 100); // 100ms debounce
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Memoize intersection handler to prevent unnecessary re-renders
  const handleIntersect = React.useCallback(() => {
    debouncedFetchNextPage();
  }, [debouncedFetchNextPage]);

  // Memoize the collections grid to prevent unnecessary re-renders
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

  // Early return for loading state
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

  // Early return for empty state
  if (!collections?.length) {
    return (
      <div>
        <CollectionTypeLabel />
        <div className='text-center text-gray-500 text-lg py-10'>
          No results found
        </div>
      </div>
    );
  }

  return (
    <div>
      <CollectionTypeLabel />
      {collectionsGrid}
      <IntersectionObserverTrigger
        onIntersect={handleIntersect}
        enabled={hasNextPage && !isFetchingNextPage}
        rootMargin='200px' // Load next page when user is 200px away from bottom
        threshold={0.1} // Trigger when 10% of the element is visible
      />
      {isFetchingNextPage && (
        <div className='flex justify-center items-center py-5'>
          <CircularLoader size={50} />
        </div>
      )}
    </div>
  );
}

export default React.memo(CollectionsListing);
