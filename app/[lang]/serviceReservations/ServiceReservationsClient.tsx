/* eslint-disable react/function-component-definition */

'use client';

import { toast } from 'react-hot-toast';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import {  SafeUser, SafeServiceReservation } from '@/app/[lang]/types';
import Heading from '@/app/[lang]/components/Heading';
import Container from '@/app/[lang]/components/Container';
import ServiceCard from '../components/services/ServiceCard';

interface ReservationsClientProps {
  reservations: SafeServiceReservation[],
  // eslint-disable-next-line react/require-default-props
  currentUser?: SafeUser | null,
  locale: string,
  dictionary: any,
}


const ServiceReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
  locale,
  dictionary,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);
    
    axios.delete(`/api/serviceReservations/${id}`)
      .then(() => {
        toast.success('Reservation cancelled');
        router.refresh();
      })
      .catch((e) => {
        toast.error('Something went wrong.');
        console.error(e);
      })
      .finally(() => {
        setDeletingId('');
      });
  }, [router]);

  return (
    <Container>
      <div className='mt-10'>
        <Heading
          title={dictionary.serviceReservation.title}
          subtitle={dictionary.serviceReservation.desc}
        />
        <div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
        >

          {reservations.map((reservation: any) => (
            <ServiceCard
                currentUser={currentUser}
                key={reservation.id}
                data={reservation.service}
                reservation={reservation}
                onAction={()=>onCancel(reservation.id)}
                actionLabel={dictionary.serviceReservation.cancel}
                dictionary={dictionary}
                lang={locale}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ServiceReservationsClient;
