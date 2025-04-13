/* eslint-disable react/function-component-definition */
import EmptyState from '@/app/[lang]/components/EmptyState';
import ClientOnly from '@/app/[lang]/components/ClientOnly';
import React from 'react';
import getCurrentUser from '@/app/[lang]/actions/getCurrentUser';
import getListings from '@/app/[lang]/actions/getListings';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/dictionary';
import CarsClient from './CarsClient';

const CarsPage = async ({
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

  const cars = await getListings({ userId: currentUser.id });

  if (cars.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title={dictionary.cars.noCars}
          subtitle={dictionary.cars.noCarsDesc}
          dictionary={dictionary}
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <CarsClient
        cars={cars}
        currentUser={currentUser}
        language={lang}
        dictionary={dictionary}
      />
    </ClientOnly>
  );
};

export default CarsPage;
