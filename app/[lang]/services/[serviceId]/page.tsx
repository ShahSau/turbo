import getCurrentUser from '@/app/[lang]/actions/getCurrentUser';
import ClientOnly from '@/app/[lang]/components/ClientOnly';
import EmptyState from '@/app/[lang]/components/EmptyState';
import React from 'react';
import getServiceById from '@/app/[lang]/actions/getServiceById';
import ServiceClient from './ServiceClient';
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/dictionary';

interface IServiceParams {
    serviceId?: string;
  }

  const ServicePage = async ({ 
    params 
  }: { params: {
    serviceId: string;
    lang: Locale;
  
  } }) => {
    const listing = await getServiceById(params);
    const currentUser = await getCurrentUser();
    const dictionary = await getDictionary(params.lang);

    if (!currentUser) {
      return (
        <ClientOnly>
          <EmptyState
            title={dictionary.unauthorized.title}
            subtitle={dictionary.unauthorized.desc}
            dictionary={dictionary}
          />
        </ClientOnly>
      );
    }
  
    if (!listing) {
      return (
        <ClientOnly>
          <EmptyState dictionary={dictionary} />
        </ClientOnly>
      );
    }
  
    return (
      <ClientOnly>
        <ServiceClient
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