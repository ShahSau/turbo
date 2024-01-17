/* eslint-disable react/function-component-definition */
/* eslint-disable react/require-default-props */

'use client';

import Image from 'next/image';
import React from 'react';

import Heading from '../Heading';

interface ServiceHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
}

const ServiceHead: React.FC<ServiceHeadProps> = ({
  title,
  locationValue,
  imageSrc,
}) => (
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
      />
    </div>
  </>
);

export default ServiceHead;
