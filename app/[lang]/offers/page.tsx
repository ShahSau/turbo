import EmptyState from '@/app/[lang]/components/EmptyState';
import ClientOnly from '@/app/[lang]/components/ClientOnly';
import React from 'react';
import getCurrentUser from '@/app/[lang]/actions/getCurrentUser';
import getServices from '../actions/getServices';
import ServicesClient from './ServicesClient';
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/dictionary';
const page = async({
  params: { lang }
}: {
  params: { lang: Locale }
}) => {
  const currentUser = await getCurrentUser();
  const dictionary = await getDictionary(lang);
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title={dictionary.unauthorized.title}
          subtitle={dictionary.unauthorized.desc}
        />
      </ClientOnly>
    );
  }

  const services = await getServices({ userId: currentUser.id });

  if (services.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title={dictionary.serviceOffers.noServices}
          subtitle={dictionary.serviceOffers.noServicesDesc}
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ServicesClient
        services={services}
        currentUser={currentUser}
        lang={lang}
        dictionary={dictionary}
      />
    </ClientOnly>
  );
  
}

export default page