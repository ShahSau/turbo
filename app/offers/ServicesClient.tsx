/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

'use client';

import { toast } from 'react-hot-toast';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { SafeUser, SafeService } from '@/app/types';

import Heading from '@/app/components/Heading';
import Container from '@/app/components/Container';
// import ListingCard from '@/app/components/listings/ListingCard';
import ServiceCard from '../components/services/ServiceCard';
interface ServicesClientProps {
  services: SafeService[],
  // eslint-disable-next-line react/require-default-props
  currentUser?: SafeUser | null,
}

const ServicesClient: React.FC<ServicesClientProps> = ({
  services,
  currentUser,
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
          title="Cars"
          subtitle="List of cars"
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
              actionLabel="Delete Car"
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
