
import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';
import React from 'react';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getEquipmentReservations from '../actions/getEquipmentReservation';
import EquipmentReservationsClient from './EquipmentReservationClient';


const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    );
  }

  const reservations = await getEquipmentReservations({ authorId: currentUser.id });


  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you have no reservation."
        />
      </ClientOnly>
    );
  }
  
  return (
    <ClientOnly>
      <EquipmentReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ReservationsPage;
