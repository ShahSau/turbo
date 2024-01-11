/* eslint-disable react/function-component-definition */
/* eslint-disable react/require-default-props */

'use client';

import Image from 'next/image';
import React from 'react';
import useCountries from '@/app/[lang]/hooks/useCountries';
import { SafeUser } from '@/app/[lang]/types';

import Heading from '../Heading';

interface ServiceHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null
}

const ServiceHead: React.FC<ServiceHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={locationValue}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative ">
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className="absolute top-5 right-5"
        >
        </div>
      </div>
    </>
  );
};

export default ServiceHead;
