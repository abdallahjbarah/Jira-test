'use client';
import React from 'react';
import CollectionTypeLabel from '../CollectionTypeLabel';
import { useFetchCollections } from '@/lib/apis/collections/useFetchCollections';
import { CollectionStatus } from '@/utils/constants';
import { useParams } from 'next/navigation';
import CollectionCard from '../CollectionCard';
import Styled from 'styled-components';
import CircularLoader from '@/components/ui/CircularLoader';

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
  const { data: collections, isLoading } = useFetchCollections(
    collectionStatus as CollectionStatus,
    {
      queryKey: ['collections', collectionStatus],
      enabled: !!collectionStatus,
    },
  );

  return (
    <div>
      <CollectionTypeLabel />
      {isLoading ? (
        <LoaderContainer>
          <CircularLoader size={50} />
        </LoaderContainer>
      ) : (
        <CollectionsListingContainer className='mt-[31px]'>
          {collections?.data.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </CollectionsListingContainer>
      )}
    </div>
  );
}

export default CollectionsListing;
