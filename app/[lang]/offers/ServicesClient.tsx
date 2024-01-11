/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

'use client';

import { toast } from 'react-hot-toast';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { SafeUser, SafeService } from '@/app/[lang]/types';

import Heading from '@/app/[lang]/components/Heading';
import Container from '@/app/[lang]/components/Container';
import ServiceCard from '../components/services/ServiceCard';
interface ServicesClientProps {
  services: SafeService[],
  // eslint-disable-next-line react/require-default-props
  currentUser?: SafeUser | null,
  lang: string,
  dictionary: any,
}

const ServicesClient: React.FC<ServicesClientProps> = ({
  services,
  currentUser,
  lang,
  dictionary,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/services/${id}`)
      .then(() => {
        toast.success('Service is removed from the database');
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
          title={dictionary.serviceOffers.title}
          subtitle={dictionary.serviceOffers.desc}
        />
        <div
          className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
        >
          {services.map((service: any) => {
            return(
            <ServiceCard
              key={service.id}
              data={service}
              actionId={service.id}
              onAction={onCancel}
              disabled={deletingId === service.id}
              actionLabel={dictionary.serviceOffers.cancel}
              currentUser={currentUser}
            />
            )
          })}
        </div>
      </div>
    </Container>
  );
};

export default ServicesClient;
