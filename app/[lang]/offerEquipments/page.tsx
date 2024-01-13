import EmptyState from '@/app/[lang]/components/EmptyState';
import ClientOnly from '@/app/[lang]/components/ClientOnly';
import React from 'react';
import getCurrentUser from '@/app/[lang]/actions/getCurrentUser';
import getEquipments from '../actions/getEquipments';
import EqupimentClient from './EqupimentClient';
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
            currentUser={currentUser}
            dictionary={dictionary}
            lang={lang}
            />
    </ClientOnly>
  );
  
}

export default page