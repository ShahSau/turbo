
import EmptyState from '@/app/[lang]/components/EmptyState';
import ClientOnly from '@/app/[lang]/components/ClientOnly';
import React from 'react';
import getCurrentUser from '@/app/[lang]/actions/getCurrentUser';
import getServiceReservations from '../actions/getServiceReservation';
import { Locale } from '@/i18n.config'
import ServiceReservationsClient from './ServiceReservationsClient';
import { getDictionary } from '@/dictionary';
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

  const reservations = await getServiceReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title={dictionary.serviceReservation.noServices}
          subtitle={dictionary.serviceReservation.noServicesDesc}
          dictionary={dictionary}
        />
      </ClientOnly>
    );
  }
  
  return (
    <ClientOnly>
      <ServiceReservationsClient
        reservations={reservations}
        currentUser={currentUser}
        locale={lang}
        dictionary={dictionary}
      />
    </ClientOnly>
  );
};

export default ReservationsPage;
