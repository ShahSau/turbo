/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

'use client';

import { toast } from 'react-hot-toast';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { SafeReservation, SafeUser, SafeCar, SafeListing } from '@/app/types';

import Heading from '@/app/components/Heading';
import Container from '@/app/components/Container';
import ListingCard from '@/app/components/listings/ListingCard';

interface CarsClientProps {
  cars: SafeListing[],
  // eslint-disable-next-line react/require-default-props
  currentUser?: SafeUser | null,
}

const CarsClient: React.FC<CarsClientProps> = ({
  cars,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/listings/${id}`)
      .then(() => {
        toast.success('Listings deleted');
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setDeletingId('');
      });
  }, [router]);

  return (
    <Container>
      <Heading
        title="Cars"
        subtitle="List of cars"
      />
      <div
        className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        {cars.map((car: any) => {
          console.log(car);
          return(
          <ListingCard
            key={car.id}
            data={car}
            actionId={car.id}
            onAction={onCancel}
            disabled={deletingId === car.id}
            actionLabel="Delete Car"
            currentUser={currentUser}
          />
          )
})}
      </div>
    </Container>
  );
};

export default CarsClient;
