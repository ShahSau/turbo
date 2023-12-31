import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';
import React from 'react';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getListings from '@/app/actions/getListings';

import CarsClient from './CarsClient';

const CarsPage = async () => {
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

  const cars = await getListings({ userId: currentUser.id });
  
  if (cars.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No cars found"
          subtitle="Looks like you havent reserved any cars."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <CarsClient
        cars={cars}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default CarsPage;
