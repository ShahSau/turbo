/* eslint-disable react/function-component-definition */
import EmptyState from '@/app/[lang]/components/EmptyState';
import ClientOnly from '@/app/[lang]/components/ClientOnly';
import React from 'react';
import getCurrentUser from '@/app/[lang]/actions/getCurrentUser';
import getReservations from '@/app/[lang]/actions/getReservations';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/dictionary';
import TripsClient from './TripsClient';

const TripsPage = async ({
  params: { lang },
}: {
  params: { lang: Locale }
}) => {
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

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title={dictionary.trips.noTrips}
          subtitle={dictionary.trips.noTripsDesc}
          dictionary={dictionary}
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
        language={lang}
        dictionary={dictionary}
      />
    </ClientOnly>
  );
};

export default TripsPage;
