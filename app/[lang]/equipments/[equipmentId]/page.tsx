import getCurrentUser from '@/app/[lang]/actions/getCurrentUser';
import ClientOnly from '@/app/[lang]/components/ClientOnly';
import EmptyState from '@/app/[lang]/components/EmptyState';
import React from 'react';
import getEquipmentById from '@/app/[lang]/actions/getEquipmentById';
import EqupimentClient from './EquipmentClient';
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/dictionary';


  const ServicePage = async ({ 
    params 
  }: { params: {
    equipmentId: string;
    lang: Locale;
  
  } }) => {
    const listing = await getEquipmentById(params);
    const currentUser = await getCurrentUser();
    const dictionary = await getDictionary(params.lang);

    if(!currentUser){
      return (
        <ClientOnly>
          <EmptyState
            title={dictionary.unauthorized.title}
            subtitle={dictionary.unauthorized.desc}
          />
        </ClientOnly>
      );
    }
  
    if (!listing) {
      return (
        <ClientOnly>
          <EmptyState dictionary={dictionary}/>
        </ClientOnly>
      );
    }
  
    return (
      <ClientOnly>
        <EqupimentClient
          service={listing}
          reservations={[]}
          currentUser={currentUser}
          dictionary={dictionary}
          lang={params.lang}
        />
      </ClientOnly>
    );
  };
  
  export default ServicePage;