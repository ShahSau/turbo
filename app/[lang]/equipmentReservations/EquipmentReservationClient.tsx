/* eslint-disable react/function-component-definition */

'use client';

import React from 'react';
import Heading from '@/app/[lang]/components/Heading';
import Container from '@/app/[lang]/components/Container';
import EquipmentCard from '../components/equipments/EquipmentCard';

interface ReservationsClientProps {
  reservations: any[],
  lang:string,
  dictionary: any,
}

const EquipmentReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  lang,
  dictionary,
}) => (
  <Container>
    <div className="mt-10">
      <Heading
        title={dictionary.equipmentReservation.title}
        subtitle={dictionary.equipmentReservation.desc}
      />
      <div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >

        {reservations.map((reservation: any) => (
          <EquipmentCard
            key={reservation.id}
            data={reservation.equipment}
            date={reservation.equipment.createdAt}
            dictionary={dictionary}
            lang={lang}
          />

        ))}
      </div>
    </div>
  </Container>
);

export default EquipmentReservationsClient;
