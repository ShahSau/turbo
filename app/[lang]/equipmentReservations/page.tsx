/* eslint-disable react/function-component-definition */
import EmptyState from '@/app/[lang]/components/EmptyState';
import ClientOnly from '@/app/[lang]/components/ClientOnly';
import React from 'react';
import getCurrentUser from '@/app/[lang]/actions/getCurrentUser';
import { getDictionary } from '@/dictionary';
import { Locale } from '@/i18n.config';
import getEquipmentReservations from '../actions/getEquipmentReservation';
import EquipmentReservationsClient from './EquipmentReservationClient';

const ReservationsPage = async ({
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

  const reservations = await getEquipmentReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title={dictionary.equipmentReservation.noServices}
          subtitle={dictionary.equipmentReservation.noServicesDesc}
          dictionary={dictionary}
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <EquipmentReservationsClient
        reservations={reservations}
        dictionary={dictionary}
        lang={lang}
      />
    </ClientOnly>
  );
};

export default ReservationsPage;
