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
import { SafeUser, SafeService, SafeServiceReservation } from '@/app/[lang]/types';

import Container from '@/app/[lang]/components/Container';

import ListingReservation from '@/app/[lang]/components/listings/ListingReservation';

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
  lang,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const [translateText, setTranslateText] = useState('');

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
          listingId: service?.id || 0,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          type: 'service',
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
        const days = dayCount * service.price;
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
          setTotalPrice(service.price);
        }
        if (lang === 'de' || lang === 'fi') {
          setTotalPrice(Math.ceil(service.price * 0.91));
        }
        if (lang === 'sv') {
          setTotalPrice(Math.ceil(service.price * 10.26));
        }
      }
    }
  }, [dateRange, service.price]);

  const translate = async (url: RequestInfo | URL, options: RequestInit | undefined) => {
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setTranslateText(result.trans);
    } catch (error:any) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    if (lang !== 'en') {
      const url = 'https://google-translate113.p.rapidapi.com/api/v1/translator/text';
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY || '',
          'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com',
        },
        body: new URLSearchParams({
          from: 'auto',
          to: lang,
          text: service.description,
        }),
      };
      translate(url, options);
    }
  }, [dictionary]);

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
          <ServiceHead
            title={service.title}
            imageSrc={service.imageSrc}
            locationValue={service.locationValue}
          />
          <div
            className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6 "
          >

            <ServiceInfo
              user={service.user}
              description={lang !== 'en' ? translateText : service.description}
              locationValue={service.locationValue}
              dictionary={dictionary}
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
