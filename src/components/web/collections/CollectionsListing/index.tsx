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

function CollectionsListing(): React.ReactElement {
  const { collectionStatus } = useParams();
  const searchParams = useSearchParams();

  const collectionObject = COLLECTION_STATUS_LIST.find(
    (collection) => collection.value === collectionStatus,
  );

  // Build filter object from search params using helper
  const filters = React.useMemo(() => {
    return buildFiltersFromSearchParams(
      searchParams,
      collectionObject?.filterValue === COLLECTION_STATUS.ALL
        ? null
        : collectionObject?.filterValue,
    );
  }, [collectionObject?.filterValue, searchParams]);

  const {
    data: collectionsResponse,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchInfiniteCollections(filters);

  const collections = React.useMemo(() => {
    return collectionsResponse?.pages?.flatMap(
      (page: SitesResponse) => page.sites.data,
    );
  }, [collectionsResponse]);

  return (
    <div>
      <CollectionTypeLabel />
      {!collections?.length ? (
        <div className='text-center text-gray-500 text-lg py-10'>
          No results found
        </div>
      ) : isLoading ? (
        <LoaderContainer>
          <CircularLoader size={50} />
        </LoaderContainer>
      ) : (
        <>
          <CollectionsListingContainer className='mt-[31px]'>
            {collections?.map((collection: Site) => (
              <CollectionCard key={collection._id} collection={collection} />
            ))}
          </CollectionsListingContainer>
          <IntersectionObserverTrigger
            onIntersect={() => {
              fetchNextPage();
            }}
            enabled={hasNextPage && !isFetchingNextPage}
          />
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

export default CollectionsListing;
