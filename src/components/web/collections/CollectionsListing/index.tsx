'use client';
import React from 'react';
import CollectionTypeLabel from '../CollectionTypeLabel';
import {
  useFetchCollections,
  useFetchInfiniteCollections,
} from '@/lib/apis/collections/useFetchCollections';
import { COLLECTION_STATUS_LIST, CollectionStatus } from '@/utils/constants';
import { useParams } from 'next/navigation';
import CollectionCard from '../CollectionCard';
import Styled from 'styled-components';
import CircularLoader from '@/components/ui/CircularLoader';
import { IntersectionObserverTrigger } from '@/components/shared/IntersectionObserverTrigger';
import { Site, SitesResponse } from '@/lib/types';
import { Collection } from '@/lib/apis/collections/data';

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

interface CollectionPage {
  sites: {
    data: Collection[];
  };
}

function CollectionsListing(): React.ReactElement {
  const { collectionStatus } = useParams();
  const collectionObject = COLLECTION_STATUS_LIST.find(
    (collection) => collection.value === collectionStatus,
  );
  const {
    data: collectionsResponse,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchInfiniteCollections({
    type: collectionObject?.filterValue,
  });

  const collections = React.useMemo(() => {
    return collectionsResponse?.pages?.flatMap(
      (page: SitesResponse) => page.sites.data,
    );
  }, [collectionsResponse]);

  console.log(collections, 'collections');

  return (
    <div>
      <CollectionTypeLabel />
      {isLoading ? (
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
