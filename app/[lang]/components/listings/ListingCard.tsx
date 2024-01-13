/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/function-component-definition */

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import { format } from 'date-fns';

import useCountries from '@/app/[lang]/hooks/useCountries';
import {
  SafeListing,
  SafeReservation,
  SafeUser,
} from '@/app/[lang]/types';

import HeartButton from '../HeartButton';
import Button from '../Button';

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  dictionary?: any;
  lang?: any;

}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
  dictionary,
  lang
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId);
  }, [disabled, onAction, actionId]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

    if(lang === 'de' || lang === 'fi'){
      data.price = Math.ceil(data.price * 0.9)
    }
    if(lang === 'sv'){
      data.price = Math.ceil(data.price * 10.26)
     }


  return (
    <div
      onClick={() => router.push(`/${lang}/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="aspect-square w-full relative overflow-hidden rounded-xl"
        >
          <Image
            fill
            className="object-cover h-full w-full group-hover:scale-110 transition"
            src={data.imageSrc}
            alt="Listing"
            sizes='auto'
          />
          <div className=" absolute top-3 right-3">
            <HeartButton
              listingId={data.id}
              currentUser={currentUser}
              dictionary={dictionary}
              lang={lang}
            />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {data.title}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="font-light text-neutral-500">
          {data.locationValue}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            {lang === 'en' ? '$' : lang === 'de' ? '€' : lang === 'fi' ? '€' : lang === 'sv' ? 'kr' : '$'}
            {' '}
            {/* {price} */}

            {lang === 'en' ? price : lang === 'de' ? (price * 0.85) : lang === 'fi' ? (price*0.85) : lang === 'sv' ? Math.ceil(price*10.26) : price}
          </div>
          {!reservation && (
            <div className="font-light">{dictionary.listingClient.day}</div>
          )}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
