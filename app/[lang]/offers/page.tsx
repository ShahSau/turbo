import EmptyState from '@/app/[lang]/components/EmptyState';
import ClientOnly from '@/app/[lang]/components/ClientOnly';
import React from 'react';
import getCurrentUser from '@/app/[lang]/actions/getCurrentUser';
import { getDictionary } from '@/dictionary';
import { Locale } from '@/i18n.config';
import getServices from '../actions/getServices';
import ServicesClient from './ServicesClient';

const page = async ({
  params: { lang },
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
          dictionary={dictionary}
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
          dictionary={dictionary}
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ServicesClient
        services={services}
        lang={lang}
        dictionary={dictionary}
      />
    </ClientOnly>
  );
};

export default page;
