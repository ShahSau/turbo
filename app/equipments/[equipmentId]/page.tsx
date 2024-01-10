import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import React from 'react';
import getListingById from '@/app/actions/getListingById';
import getReservations from '@/app/actions/getReservations';
//import ListingClient from './ListingClient';
//import getServiceById from '@/app/actions/getServiceById';
import getEquipmentById from '@/app/actions/getEquipmentById';
import EqupimentClient from './EquipmentClient';

//import ServiceClient from './ServiceClient';
interface IEquipmentParams {
    equipmentId?: string;
  }

  const ServicePage = async ({ params }: { params: IEquipmentParams }) => {
    const listing = await getEquipmentById(params);
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
        <EqupimentClient
          service={listing}
          reservations={[]}
          currentUser={currentUser}
        />
      </ClientOnly>
    );
  };
  
  export default ServicePage;