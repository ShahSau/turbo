/* eslint-disable react/require-default-props */
/* eslint-disable react/function-component-definition */

'use client';

import dynamic from 'next/dynamic';
import React from 'react';

import { SafeUser } from '@/app/[lang]/types';

import cities from '@/app/[lang]/components/CityData';

import Avatar from '../Avatar';

const Map = dynamic(() => import('../Map'), {
  ssr: false,
});

interface ListingInfoProps {
  user: SafeUser,
  locationValue: string;
  description: string;
  dictionary?: any;
}

const ServiceInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  locationValue,
  dictionary,
}) => {
  const cityValue = cities.find((item) => item.label === locationValue);
  const coordinates = cityValue?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className=" text-xl font-semibold flex flex-row items-center gap-2 "
        >
          <div>
            {dictionary.listingClient.offer}
            {' '}
            {user?.name}
          </div>
          <Avatar src={user?.image} />
        </div>
        <div className=" flex flex-row items-center gap-4 font-light text-neutral-500 ">
          {description}
        </div>

      </div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ServiceInfo;
