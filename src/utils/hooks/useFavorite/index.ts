import { useAddToCollectionMutate } from '@/lib/apis/favorites/useAddToCollectionMutate';
import { useFetchUserFavoriteCollections } from '@/lib/apis/favorites/useFetchUserCollections';
import useUser from '../useUser';

const useFavorite = () => {
  const { isLoggedIn } = useUser();

  const userFavoriteCollectionsQuery = useFetchUserFavoriteCollections({
    enabled: isLoggedIn,
  });
  const { mutate: addToCollection } = useAddToCollectionMutate({
    onSuccess: () => {
      userFavoriteCollectionsQuery.refetch();
    },
  });

  const isFavorite = (siteId: string) => {
    return userFavoriteCollectionsQuery.data?.some(collection =>
      collection.sites.some(site => site._id === siteId)
    );
  };

  const addFavorite = (siteId: string) => {};

  const removeFavorite = (siteId: string) =>
    addToCollection({
      siteId,
    });

  return {
    userFavoriteCollectionsQuery,
    isFavorite,
    addFavorite,
    removeFavorite,
  };
};

export default useFavorite;
