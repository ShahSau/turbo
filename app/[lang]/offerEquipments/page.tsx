import EmptyState from '@/app/[lang]/components/EmptyState';
import ClientOnly from '@/app/[lang]/components/ClientOnly';
import React from 'react';
import getCurrentUser from '@/app/[lang]/actions/getCurrentUser';
import { getDictionary } from '@/dictionary';
import { Locale } from '@/i18n.config';
import getEquipments from '../actions/getEquipments';
import EqupimentClient from './EqupimentClient';

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

  const equipment = await getEquipments({ userId: currentUser.id });

  if (equipment.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title={dictionary.myEquipment.noEquipment}
          subtitle={dictionary.myEquipment.noEquipmentDesc}
          dictionary={dictionary}
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <EqupimentClient
        equipments={equipment}
        dictionary={dictionary}
        lang={lang}
      />
    </ClientOnly>
  );
};

export default page;
