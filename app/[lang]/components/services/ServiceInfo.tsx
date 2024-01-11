/* eslint-disable react/function-component-definition */

'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { IconType } from 'react-icons';

import useCountries from '@/app/[lang]/hooks/useCountries';
import { SafeUser } from '@/app/[lang]/types';

import cities from '@/app/[lang]/components/CityData';

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
  dictionary?: any;
  lang?: any;
}

const ServiceInfo: React.FC<ListingInfoProps> = ({
  user,
  title,
  description,
  category,
  locationValue,
  dictionary,
  lang
}) => {
  const { getByValue } = useCountries();

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
