import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import React from 'react';
import getEquipmentById from '@/app/actions/getEquipmentById';
import EqupimentClient from './EquipmentClient';

interface IEquipmentParams {
    equipmentId?: string;
  }

  const ServicePage = async ({ params }: { params: IEquipmentParams }) => {
    const listing = await getEquipmentById(params);
    const currentUser = await getCurrentUser();

    if(!currentUser){
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
        <EqupimentClient
          service={listing}
          reservations={[]}
          currentUser={currentUser}
        />
      </ClientOnly>
    );
  };
  
  export default ServicePage;