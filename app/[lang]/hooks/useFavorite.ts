import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import { SafeUser } from '@/app/[lang]/types';

import useLoginModal from './useLoginModal';

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null
  dictionary: any;
}

const useFavorite = ({ listingId, currentUser, dictionary }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    // eslint-disable-next-line consistent-return
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        if (hasFavorited) {
          toast.success(`${dictionary.cars.favNo}`);
        } else {
          toast.success(`${dictionary.cars.favYes}`);
        }
      } catch (error) {
        toast.error(`${dictionary.cars.error}`);
      }
    },
    [
      currentUser,
      hasFavorited,
      listingId,
      loginModal,
      router,
    ],
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
