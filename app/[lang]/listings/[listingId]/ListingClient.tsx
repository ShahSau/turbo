/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/require-default-props */

'use client';

import axios from 'axios';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Range } from 'react-date-range';
import { useRouter } from 'next/navigation';
import { differenceInDays, eachDayOfInterval } from 'date-fns';

import useLoginModal from '@/app/[lang]/hooks/useLoginModal';
import { SafeListing, SafeReservation, SafeUser } from '@/app/[lang]/types';

import Container from '@/app/[lang]/components/Container';
import ListingHead from '@/app/[lang]/components/listings/ListingHead';
import ListingInfo from '@/app/[lang]/components/listings/ListingInfo';
import ListingReservation from '@/app/[lang]/components/listings/ListingReservation';

import { FaArrowLeft } from 'react-icons/fa';
import { IoCarSportSharp } from 'react-icons/io5';
import { TbSteeringWheel } from 'react-icons/tb';
import { LiaTruckSolid, LiaShuttleVanSolid } from 'react-icons/lia';
import { FaVanShuttle } from 'react-icons/fa6';
import { MdOutlineElectricCar } from 'react-icons/md';
import { GiJeep } from 'react-icons/gi';
import { PiJeepBold } from 'react-icons/pi';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
  dictionary?: any;
  lang?: any;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
  dictionary,
  lang,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const categories = [
    {
      label: 'SUVs',
      icon: PiJeepBold,
      description: `${dictionary.rentModal.Lsuv}`,
    },
    {
      label: 'Convertibles',
      icon: GiJeep,
      description: `${dictionary.rentModal.Lconvert}`,
    },
    {
      label: 'Electric',
      icon: MdOutlineElectricCar,
      description: `${dictionary.rentModal.Lelectric}`,
    },
    {
      label: 'Minivans',
      icon: FaVanShuttle,
      description: `${dictionary.rentModal.Lminivan}`,
    },
    {
      label: 'Vans',
      icon: LiaShuttleVanSolid,
      description: `${dictionary.rentModal.Lvan}`,
    },
    {
      label: 'Trucks',
      icon: LiaTruckSolid,
      description: `${dictionary.rentModal.Ltruck}`,
    },
    {
      label: '4-Wheel',
      icon: TbSteeringWheel,
      description: `${dictionary.rentModal.L4wheel}`,
    },
    {
      label: 'Sports',
      icon: IoCarSportSharp,
      description: `${dictionary.rentModal.Lsports}`,
    },

  ];

  const category = useMemo(() => categories.find((items) => items.label === listing.category), [listing.category]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(

    // eslint-disable-next-line consistent-return
    () => {
      if (!currentUser) {
        return loginModal.onOpen();
      }
      setIsLoading(true);
      axios.post(
        '/api/payment',
        {
          totalPrice,
          listingId: listing?.id || 0,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          type: 'rental',
          lang,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .then((res) => {
          router.push(res.data.url);
        });
    },
    [
      totalPrice,
      dateRange,
      listing?.id,
      router,
      currentUser,
      loginModal,
    ],
  );

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(
        dateRange.endDate,
        dateRange.startDate,
      ) + 1;

      if (dayCount && listing.price) {
        const days = dayCount * listing.price;
        if (lang === 'en') {
          setTotalPrice(days);
        }
        if (lang === 'de' || lang === 'fi') {
          setTotalPrice(Math.ceil(days * 0.91));
        }
        if (lang === 'sv') {
          setTotalPrice(Math.ceil(days * 10.26));
        }
      } else {
        if (lang === 'en') {
          setTotalPrice(listing.price);
        }
        if (lang === 'de' || lang === 'fi') {
          setTotalPrice(Math.ceil(listing.price * 0.91));
        }
        if (lang === 'sv') {
          setTotalPrice(Math.ceil(listing.price * 10.26));
        }
      }
    }
  }, [dateRange, listing.price, lang]);

  return (
    <Container>
      <div
        className="max-w-screen-lg mx-auto md:mt-10"
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-1 text-sm">
            <FaArrowLeft />
            <button onClick={() => router.back()} className="text-lg">{dictionary.listingClient.back}</button>
          </div>
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
            dictionary={dictionary}
          />
          <div
            className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6 "
          >
            <ListingInfo
              user={listing.user}
              category={category}
              title={listing.title}
              passangersCount={listing.passangersCount}
              cylindersCount={listing.cylindersCount}
              mileageCount={listing.mileageCount}
              model={listing.model}
              fuelType={listing.fuelType}
              transmissionType={listing.transmissionType}
              maker={listing.maker}
              year={listing.year}
              driveType={listing.driveType}
              locationValue={listing.locationValue}
              dictionary={dictionary}
            />
            <div
              className="order-first mb-10 md:order-last md:col-span-3"
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value: React.SetStateAction<Range>) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
                dictionary={dictionary}
                lang={lang}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
