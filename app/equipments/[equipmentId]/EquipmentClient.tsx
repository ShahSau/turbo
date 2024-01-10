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
import { SafeUser, SafeEquipmentReservation, SafeEquipment } from '@/app/types';

import Container from '@/app/components/Container';
import { categories } from '../../components/navbar/Categoriesrepair';
import { loadStripe } from '@stripe/stripe-js';
import { FaArrowLeft } from 'react-icons/fa';
import EquipmentHead from '@/app/components/equipments/EquipmentHead';
import EquipmentInfo from '@/app/components/equipments/EquipmentInfo';
import EquipmentReservation from '@/app/components/equipments/EquipmentReservation';


interface ListingClientProps {
  reservations?: SafeEquipmentReservation[];
  service: SafeEquipment & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const EqupimentClient: React.FC<ListingClientProps> = ({
  service,
  reservations = [],
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

const disabledDates =  service.amount !== 0 ? false : true;

  const category = useMemo(() => categories.find((items) => items.label === service.category), [service.category]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(service.price);

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
         type: 'equipment',
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
       service?.id,
       router,
       currentUser,
       loginModal,
     ],
   );

useEffect(() => {
  
if(service.price && service.amount){
    setTotalPrice(service.price * service.amount)
}
}, [service.price, service.amount])


  return (
    <Container>
      <div
        className="max-w-screen-lg mx-auto md:mt-10"
      >
        <div className="flex flex-col gap-6">
          <div className='flex items-center gap-1 text-sm'>
            <FaArrowLeft /><button onClick={() => router.back() } className='text-lg'>Back</button>
          </div>
          <EquipmentHead
            title={service.title}
            imageSrc={service.imageSrc}
            id={service.id}
            currentUser={currentUser}
          />
          <div
            className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6 "
          >
            
            <EquipmentInfo
              user={service.user}
              title={service.title}
              description={service.description}
              category={category}
            />
            <div
              className="order-first mb-10 md:order-last md:col-span-3"
            >
                <EquipmentReservation
                    price={service.price}
                    totalPrice={totalPrice}
                    onSubmit={onCreateReservation}
                    disabled={isLoading}
                    disabledAmount={disabledDates}
                />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default EqupimentClient;
