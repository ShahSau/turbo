/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable max-len */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/require-default-props */

'use client';

import axios from 'axios';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { FcAutomotive } from 'react-icons/fc';
import {
  GiCarWheel, GiCarBattery, GiCarDoor, GiCarSeat,
} from 'react-icons/gi';
import useLoginModal from '@/app/[lang]/hooks/useLoginModal';
import { SafeUser, SafeEquipmentReservation, SafeEquipment } from '@/app/[lang]/types';

import Container from '@/app/[lang]/components/Container';

import { FaArrowLeft } from 'react-icons/fa';
import EquipmentHead from '@/app/[lang]/components/equipments/EquipmentHead';
import EquipmentInfo from '@/app/[lang]/components/equipments/EquipmentInfo';
import EquipmentReservation from '@/app/[lang]/components/equipments/EquipmentReservation';

interface ListingClientProps {
  reservations?: SafeEquipmentReservation[];
  service: SafeEquipment & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
  dictionary?: any;
  lang?: any;
}

const EqupimentClient: React.FC<ListingClientProps> = ({
  service,
  currentUser,
  dictionary,
  lang,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const [translateText, setTranslateText] = useState('');

  const disabledDates = service.amount !== 0 ? false : true;

  const categories = [
    {
      label: `${dictionary.equipmentModal.breakTitle}`,
      icon: FcAutomotive,
      description: `${dictionary.equipmentModal.breakDesc}`,
    },
    {
      label: `${dictionary.equipmentModal.wheelTitle}`,
      icon: GiCarWheel,
      description: `${dictionary.equipmentModal.wheelDesc}`,
    },
    {
      label: `${dictionary.equipmentModal.batteryTitle}`,
      icon: GiCarBattery,
      description: `${dictionary.equipmentModal.batteryDesc}`,
    },
    {
      label: `${dictionary.equipmentModal.doorTitle}`,
      icon: GiCarDoor,
      description: `${dictionary.equipmentModal.doorDesc}`,
    },
    {
      label: `${dictionary.equipmentModal.seatTitle}`,
      icon: GiCarSeat,
      description: `${dictionary.equipmentModal.seatDesc}`,
    },

  ];

  const category = useMemo(() => categories.find((items) => items.label === service.category), [service.category]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(service.price);

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
          type: 'equipment',
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
      service?.id,
      router,
      currentUser,
      loginModal,
    ],
  );

  useEffect(() => {
    if (service.price && service.amount) {
      // setTotalPrice(service.price * 1)  // for now we are allowing user to buy only one item at a time
      if (lang === 'de' || lang === 'fi') {
        setTotalPrice(service.price * 0.95);
      }
      if (lang === 'sv') {
        setTotalPrice(service.price * 10.26);
      }
    }
  }, [service.price, service.amount]);

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
          <EquipmentHead
            title={service.title}
            imageSrc={service.imageSrc}
          />
          <div
            className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6 "
          >

            <EquipmentInfo
              user={service.user}
              description={lang !== 'en' ? translateText : service.description}
              category={category}
              dictionary={dictionary}
            />
            <div
              className="order-first mb-10 md:order-last md:col-span-3"
            >
              <EquipmentReservation
                totalPrice={totalPrice}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledAmount={disabledDates}
                dictionary={dictionary}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default EqupimentClient;
