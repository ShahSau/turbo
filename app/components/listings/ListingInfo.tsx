/* eslint-disable react/function-component-definition */

'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { IconType } from 'react-icons';

import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';

import cities from '@/app/components/CityData';
import { IoIosPeople, IoLogoModelS } from 'react-icons/io';
import { FaGasPump } from 'react-icons/fa6';
import { PiCylinderLight } from 'react-icons/pi';
import { BsSpeedometer } from 'react-icons/bs';
import { GiGearStickPattern, GiSteeringWheel } from 'react-icons/gi';
import { FaRegCalendarAlt } from 'react-icons/fa';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';

const Map = dynamic(() => import('../Map'), {
  ssr: false,
});

interface ListingInfoProps {
  user: SafeUser,
  category: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined
  locationValue: string;
  title: string;
  // price: number;
  passangersCount:number;
  cylindersCount:number;
  mileageCount:number;
  model:string;
  fuelType:string;
  transmissionType:string;
  maker:string;
  year:number;
  driveType:string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  title,
  // price,
  passangersCount,
  cylindersCount,
  mileageCount,
  model,
  fuelType,
  transmissionType,
  maker,
  year,
  driveType,
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
          <div>
            <IoIosPeople className="w-8 h-8" />
            {' '}
            {passangersCount}
          </div>
          <div>
            <PiCylinderLight className="w-8 h-8" />
            {' '}
            {cylindersCount}
          </div>
          <div>
            <BsSpeedometer className="w-8 h-8" />
            {' '}
            {mileageCount}
          </div>
          <div>
            <IoLogoModelS className="w-8 h-8" />
            {' '}
            {model}
          </div>
          <div>
            <FaGasPump className="w-8 h-8" />
            {' '}
            {fuelType}
          </div>
          <div>
            <GiSteeringWheel className="w-8 h-8" />
            {' '}
            {driveType}
          </div>
          <div>
            <GiGearStickPattern className="w-8 h-8" />
            {' '}
            {transmissionType}
          </div>
          <div>
            <FaRegCalendarAlt className="w-8 h-8" />
            {' '}
            {year}
          </div>
        </div>

      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">
        {title}
        {' '}
        by
        {' '}
        {maker}
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
