/* eslint-disable react/function-component-definition */

'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { IconType } from 'react-icons';

import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';

import cities from '@/app/components/CityData';

import Avatar from '../Avatar'; 

const Map = dynamic(() => import('../Map'), {
  ssr: false,
});

interface ListingInfoProps {
  user: SafeUser,
  category?: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined
  locationValue: string;
  title: string;
  description: string;
}

const ServiceInfo: React.FC<ListingInfoProps> = ({
  user,
  title,
  description,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  // const coordinates = getByValue(locationValue)?.latlng;
  const cityValue = cities.find((item) => item.label === locationValue);
  const coordinates = cityValue?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className=" text-xl font-semibold flex flex-row items-center gap-2 "
        >
          <div>
            Offered by
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
