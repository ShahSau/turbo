import EmptyState from '@/app/[lang]/components/EmptyState';
import ClientOnly from '@/app/[lang]/components/ClientOnly';
import React from 'react';
import getCurrentUser from '@/app/[lang]/actions/getCurrentUser';
import getReservations from '@/app/[lang]/actions/getReservations';
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/dictionary';
import ReservationsClient from './ReservationsClient';

const ReservationsPage = async ({
  params: { lang }
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

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title={dictionary.reservations.noReservations}
          subtitle={dictionary.reservations.noReservationsDesc}
          dictionary={dictionary}
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
        language={lang}
        dictionary={dictionary}
      />
    </ClientOnly>
  );
};

export default ReservationsPage;
