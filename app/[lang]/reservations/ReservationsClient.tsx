/* eslint-disable react/function-component-definition */

'use client';

import { toast } from 'react-hot-toast';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SafeReservation, SafeUser } from '@/app/[lang]/types';
import Heading from '@/app/[lang]/components/Heading';
import Container from '@/app/[lang]/components/Container';
import ListingCard from '@/app/[lang]/components/listings/ListingCard';

interface ReservationsClientProps {
  reservations: SafeReservation[],
  // eslint-disable-next-line react/require-default-props
  currentUser?: SafeUser | null,
  language: string,
  dictionary: any,
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
  language,
  dictionary,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success('Reservation cancelled');
        router.refresh();
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setDeletingId('');
      });
  }, [router]);

  return (
    <Container>
      <div className="mt-10">
        <Heading
          title={dictionary.reservations.title}
          subtitle={dictionary.reservations.desc}
        />
        <div
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
        >

          {reservations.map((reservation: any) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel={dictionary.reservations.cancel}
              currentUser={currentUser}
              lang={language}
              dictionary={dictionary}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ReservationsClient;
