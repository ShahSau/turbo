/* eslint-disable react/function-component-definition */
import getCurrentUser from '@/app/[lang]/actions/getCurrentUser';
import ClientOnly from '@/app/[lang]/components/ClientOnly';
import EmptyState from '@/app/[lang]/components/EmptyState';
import React from 'react';
import getListingById from '@/app/[lang]/actions/getListingById';
import getReservations from '@/app/[lang]/actions/getReservations';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/dictionary';
import ListingClient from './ListingClient';

const ListingPage = async ({
  params,
}: { params: {
  listingId: string;
  lang: Locale;
} }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();
  const dictionary = await getDictionary(params.lang);

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

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState dictionary={dictionary} />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
        dictionary={dictionary}
        lang={params.lang}
      />
    </ClientOnly>
  );
};

export default ListingPage;
