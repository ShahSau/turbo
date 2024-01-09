import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import React from 'react';
import getListingById from '@/app/actions/getListingById';
import getReservations from '@/app/actions/getReservations';
//import ListingClient from './ListingClient';
import getServiceById from '@/app/actions/getServiceById';
import ServiceClient from './ServiceClient';
interface IServiceParams {
    serviceId?: string;
  }

  const ServicePage = async ({ params }: { params: IServiceParams }) => {
    const listing = await getServiceById(params);
    //const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();
  
    if (!listing) {
      return (
        <ClientOnly>
          <EmptyState />
        </ClientOnly>
      );
    }
  
    return (
      <ClientOnly>
        <ServiceClient
          service={listing}
          reservations={[]}
          currentUser={currentUser}
        />
      </ClientOnly>
    );
  };
  
  export default ServicePage;