/* eslint-disable react/function-component-definition */

'use client';

import { toast } from 'react-hot-toast';
import axios from 'axios';
import React, {  useState } from 'react';
import { useRouter } from 'next/navigation';
import {  SafeUser } from '@/app/[lang]/types';
import Heading from '@/app/[lang]/components/Heading';
import Container from '@/app/[lang]/components/Container';
import EquipmentCard from '../components/equipments/EquipmentCard';

interface ReservationsClientProps {
  reservations: any[],
  // eslint-disable-next-line react/require-default-props
  currentUser?: SafeUser | null,
  lang:string,
  dictionary: any,
}

const EquipmentReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
  lang,
  dictionary,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  return (
    <Container>
      <div className='mt-10'>
        <Heading
          title={dictionary.equipmentReservation.title}
          subtitle={dictionary.equipmentReservation.desc}
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
