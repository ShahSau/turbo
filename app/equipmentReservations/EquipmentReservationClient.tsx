/* eslint-disable react/function-component-definition */

'use client';

import { toast } from 'react-hot-toast';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import {  SafeUser, SafeServiceReservation, SafeEquipmentReservation } from '@/app/types';
import Heading from '@/app/components/Heading';
import Container from '@/app/components/Container';
import ServiceCard from '../components/services/ServiceCard';
import EquipmentCard from '../components/equipments/EquipmentCard';

interface ReservationsClientProps {
  reservations: any[],
  // eslint-disable-next-line react/require-default-props
  currentUser?: SafeUser | null,
}

const EquipmentReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  return (
    <Container>
      <div className='mt-10'>
        <Heading
          title="Reservations"
          subtitle="Things you bought"
        />
        <div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
        >

          {reservations.map((reservation: any) => (
            <EquipmentCard
                currentUser={currentUser}
                key={reservation.id}
                data={reservation.equipment}
                date={reservation.equipment.createdAt}
            />

          ))}
        </div>
      </div>
    </Container>
  );
};

export default EquipmentReservationsClient;
