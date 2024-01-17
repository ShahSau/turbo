/* eslint-disable react/require-default-props */
/* eslint-disable react/function-component-definition */

'use client';

import React from 'react';
import { IconType } from 'react-icons';
import { SafeUser } from '@/app/[lang]/types';

import Avatar from '../Avatar';
import ListingCategory from '../listings/ListingCategory';

interface ListingInfoProps {
  user: SafeUser,
  category?: {
    icon: IconType,
    label: string;
    description: string;
  } | undefined
  description: string;
  dictionary?: any;
}

const EquipmentInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  category,
  dictionary,
}) => (
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
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}

    </div>
    <hr />
  </div>
);

export default EquipmentInfo;
