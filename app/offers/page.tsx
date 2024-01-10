import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';
import React from 'react';
import getCurrentUser from '@/app/actions/getCurrentUser';
// import getListings from '@/app/actions/getListings';
import getServices from '../actions/getServices';
// import CarsClient from './CarsClient';
import ServicesClient from './ServicesClient';

const page = async() => {
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

  const services = await getServices({ userId: currentUser.id });

  if (services.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No services found"
          subtitle="Looks like you havent advertize any services."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ServicesClient
        services={services}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
  
}

export default page