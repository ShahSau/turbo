/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

'use client';

import { toast } from 'react-hot-toast';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { SafeUser, SafeService, SafeEquipment } from '@/app/[lang]/types';

import Heading from '@/app/[lang]/components/Heading';
import Container from '@/app/[lang]/components/Container';
import EquipmentCard from '../components/equipments/EquipmentCard';
interface ServicesClientProps {
  equipments: SafeEquipment[],
  // eslint-disable-next-line react/require-default-props
  currentUser?: SafeUser | null,
  lang: string,
  dictionary: any,
}

const EqupimentClient: React.FC<ServicesClientProps> = ({
  equipments,
  currentUser,
  lang,
  dictionary,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/equipment/${id}`)
      .then(() => {
        toast.success(`${dictionary.myEquipment.removed}`);
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setDeletingId('');
      });
  }, [router]);

  return (
    <Container>
      <div className='mt-10'>
        <Heading
          title={dictionary.myEquipment.title}
          subtitle={dictionary.myEquipment.desc}
        />
        <div
          className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
        >
          {equipments.map((service: any) => {
            return(
            <EquipmentCard
              key={service.id}
              data={service}
              actionId={service.id}
              onAction={onCancel}
              disabled={deletingId === service.id}
              actionLabel={dictionary.myEquipment.delete}
              currentUser={currentUser}
            />
            )
          })}
        </div>
      </div>
    </Container>
  );
};

export default EqupimentClient;
