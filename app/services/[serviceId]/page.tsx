import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import React from 'react';
import getServiceById from '@/app/actions/getServiceById';
import ServiceClient from './ServiceClient';
interface IServiceParams {
    serviceId?: string;
  }

  const ServicePage = async ({ params }: { params: IServiceParams }) => {
    const listing = await getServiceById(params);
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