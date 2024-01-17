/* eslint-disable react/function-component-definition */
/* eslint-disable react/require-default-props */

'use client';

import Image from 'next/image';
import React from 'react';

import Heading from '../Heading';

interface ServiceHeadProps {
  title: string;
  imageSrc: string;
}

const EquipmentHead: React.FC<ServiceHeadProps> = ({
  title,
  imageSrc,
}) => (
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
      />
    </div>
  </>
);

export default EquipmentHead;
