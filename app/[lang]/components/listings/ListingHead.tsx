/* eslint-disable react/function-component-definition */
/* eslint-disable react/require-default-props */

'use client';

import Image from 'next/image';
import React from 'react';
import { SafeUser } from '@/app/[lang]/types';

import Heading from '../Heading';
import HeartButton from '../HeartButton';

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null,
  dictionary?: any,

}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
  dictionary,
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
      >
        <HeartButton
          listingId={id}
          currentUser={currentUser}
          dictionary={dictionary}
        />
      </div>
    </div>
  </>
);

export default ListingHead;
