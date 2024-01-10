import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';
import React from 'react';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getServices from '../actions/getServices';
import getEquipments from '../actions/getEquipments';
import EqupimentClient from './EqupimentClient';


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

  const equipment = await getEquipments({ userId: currentUser.id });

  if (equipment.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Equipment found"
          subtitle="Looks like you havent advertize any equipment yet"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
        <EqupimentClient
            equipments={equipment}
            currentUser={currentUser}
            />
    </ClientOnly>
  );
  
}

export default page