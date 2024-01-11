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
import { SafeUser, SafeService, SafeServiceReservation } from '@/app/[lang]/types';

import Container from '@/app/[lang]/components/Container';

import ListingReservation from '@/app/[lang]/components/listings/ListingReservation';
import { loadStripe } from '@stripe/stripe-js';
import { FaArrowLeft } from 'react-icons/fa';
import ServiceHead from '@/app/[lang]/components/services/ServiceHead';
import ServiceInfo from '@/app/[lang]/components/services/ServiceInfo';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

interface ListingClientProps {
  reservations?: SafeServiceReservation[];
  service: SafeService & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
  dictionary?: any;
  lang?: any;
}

const ServiceClient: React.FC<ListingClientProps> = ({
  service,
  reservations = [],
  currentUser,
  dictionary,
  lang
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

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(service.price);
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
        listingId: service?.id || 0,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        type: 'service',
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
      service?.id,
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

      if (dayCount && service.price) {
        setTotalPrice(dayCount * service.price);
      } else {
        setTotalPrice(service.price);
      }
    }
  }, [dateRange, service.price]);

  return (
    <Container>
      <div
        className="max-w-screen-lg mx-auto md:mt-10"
      >
        <div className="flex flex-col gap-6">
          <div className='flex items-center gap-1 text-sm'>
            <FaArrowLeft /><button onClick={() => router.back() } className='text-lg'>{dictionary.listingClient.back}</button>
          </div>
          <ServiceHead
            title={service.title}
            imageSrc={service.imageSrc}
            locationValue={service.locationValue}
            id={service.id}
            currentUser={currentUser}
          />
          <div
            className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6 "
          >
            
            <ServiceInfo
              user={service.user}
              title={service.title}
              description={service.description}
              locationValue={service.locationValue}
              dictionary={dictionary}
              lang={lang}
            />
            <div
              className="order-first mb-10 md:order-last md:col-span-3"
            >
              <ListingReservation
                price={service.price}
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

export default ServiceClient;
