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

import useLoginModal from '@/app/hooks/useLoginModal';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';

import Container from '@/app/components/Container';
import { categories } from '@/app/components/navbar/Categories';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';
import ListingReservation from '@/app/components/listings/ListingReservation';
import { loadStripe } from '@stripe/stripe-js';
import { FaArrowLeft } from 'react-icons/fa';

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
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
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

  const category = useMemo(() => categories.find((items) => items.label === listing.category), [listing.category]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
  );

  const onCreateReservation = useCallback(

    // eslint-disable-next-line consistent-return
    () => {
      if (!currentUser) {
        return loginModal.onOpen();
      }
      setIsLoading(true);
      axios.post('/api/payment',
      {
        totalPrice: totalPrice,
        listingId: listing?.id || 0,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      },
      {
        headers:{
          "Content-Type": "application/json",
        },
      }
      )
      .then((res) => {
        const stripe = stripePromise;
        router.push(res.data.url);
      }
      )

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
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <Container>
      <div
        className="max-w-screen-lg mx-auto md:mt-10"
      >
        <div className="flex flex-col gap-6">
          <div className='flex items-center gap-1 text-sm'>
            <FaArrowLeft /><button onClick={() => router.back() } className='text-lg'>Back</button>
          </div>
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6 "
          >
            <ListingInfo
              user={listing.user}
              category={category}
              title={listing.title}
              // price={listing.price}
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
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
