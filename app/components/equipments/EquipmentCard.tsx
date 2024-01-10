/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/function-component-definition */

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import { format } from 'date-fns';

import useCountries from '@/app/hooks/useCountries';
import {
  SafeListing,
  SafeReservation,
  SafeUser,
  SafeServiceReservation,
  SafeService

} from '@/app/types';

import Button from '../Button';


interface ServiceCardProps {
  data: SafeListing;
  reservation?: SafeServiceReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  date?: Date;

}

const EquipmentCard: React.FC<ServiceCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  date,
  currentUser,
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


const dateTimeFormat = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

  return (
    <div
      onClick={() => router.push(`/equipments/${data.id}`)}
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
          />
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
            $
            {' '}
            {price}
          </div>
          {!reservation && !date && (
            <div className="font-light">per piece</div>
          )}
        </div>
        {date && (
            <div className="font-light">You bought this on {dateTimeFormat.format(date)}</div>
          )}
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

export default EquipmentCard;
