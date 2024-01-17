import React from 'react';
import EmptyState from '@/app/[lang]/components/EmptyState';
import ClientOnly from '@/app/[lang]/components/ClientOnly';

import getCurrentUser from '@/app/[lang]/actions/getCurrentUser';
import getFavoriteListings from '@/app/[lang]/actions/getFavoriteListings';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/dictionary';
import FavoritesClient from './FavoritesClient';

const ListingPage = async ({
  params: { lang },
}: {
  params: { lang: Locale }
}) => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();
  const dictionary = await getDictionary(lang);

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title={dictionary.unauthorized.title}
          subtitle={dictionary.unauthorized.desc}
          dictionary={dictionary}
        />
      </ClientOnly>
    );
  }

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title={dictionary.favorites.noFavorites}
          subtitle={dictionary.favorites.noFavoritesDesc}
          dictionary={dictionary}
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient
        listings={listings}
        currentUser={currentUser}
        language={lang}
        dictionary={dictionary}
      />
    </ClientOnly>
  );
};

export default ListingPage;
