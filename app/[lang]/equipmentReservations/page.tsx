
import EmptyState from '@/app/[lang]/components/EmptyState';
import ClientOnly from '@/app/[lang]/components/ClientOnly';
import React from 'react';
import getCurrentUser from '@/app/[lang]/actions/getCurrentUser';
import getEquipmentReservations from '../actions/getEquipmentReservation';
import EquipmentReservationsClient from './EquipmentReservationClient';
import { Locale } from '@/i18n.config'
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
        />
      </ClientOnly>
    );
  }

  const reservations = await getEquipmentReservations({ authorId: currentUser.id });

  console.log(lang)

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title={dictionary.equipmentReservation.noServices}
          subtitle={dictionary.equipmentReservation.noServicesDesc}
        />
      </ClientOnly>
    );
  }
  
  return (
    <ClientOnly>
      <EquipmentReservationsClient
        reservations={reservations}
        currentUser={currentUser}
        dictionary={dictionary}
        lang={lang}
      />
    </ClientOnly>
  );
};

export default ReservationsPage;
