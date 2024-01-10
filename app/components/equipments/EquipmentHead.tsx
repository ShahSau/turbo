/* eslint-disable react/function-component-definition */
/* eslint-disable react/require-default-props */

'use client';

import Image from 'next/image';
import React from 'react';
import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';

import Heading from '../Heading';

interface ServiceHeadProps {
  title: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null
}

const EquipmentHead: React.FC<ServiceHeadProps> = ({
  title,
  imageSrc,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();


  return (
    <>
      <Heading
        title={title}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative ">
        <Image
          src={imageSrc}
          fill
          className="object-contain h-full w-full"
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

export default EquipmentHead;
