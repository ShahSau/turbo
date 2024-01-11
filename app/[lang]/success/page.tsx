'use client'
import React, {useEffect, useState} from 'react'
import Container from '@/app/[lang]/components/Container';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
const page = () => {
    const searchParams = useSearchParams();
    const id = searchParams?.get('id');
    const startDate = searchParams?.get('startDate');
    const endDate = searchParams?.get('endDate');
    const totalPrice = Number(searchParams?.get('totalPrice'));
    const type = searchParams?.get('type');

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(()=>{
        if(type === 'rental'){
            setTimeout(() => {
                axios.post('/api/reservations', {
                    totalPrice,
                    startDate,
                    endDate,
                    listingId: id,
                  })
                    .then(() => {
                      toast.success('Car is now reserved for you!');
                      router.push('/trips');
                    })
                    .catch(() => {
                      toast.error('Something went wrong.');
                    })
                    .finally(() => {
                      setIsLoading(false);
                    });
                }, 5000);
        }
        else if(type === 'service'){
            setTimeout(() => {
                axios.post('/api/serviceReservations', {
                    totalPrice,
                    startDate,
                    endDate,
                    serviceId: id,
                  })
                    .then(() => {
                      toast.success('Service is now reserved for you!');
                      router.push('/serviceReservations?serviceId='+id);
                    })
                    .catch(() => {
                      toast.error('Something went wrong.');
                    })
                    .finally(() => {
                      setIsLoading(false);
                    });
                }, 5000);
        }
        else if (type === 'equipment'){
            setTimeout(() => {
                axios.post('/api/equipmentReservation', {
                    totalPrice,
                    amount:1,
                    equipmentId: id,
                  })
                    .then(() => {
                      toast.success('You bought the equipment!');
                      router.push('/equipmentReservations');
                    })
                    .catch(() => {
                      toast.error('Something went wrong.');
                    })
                    .finally(() => {
                      setIsLoading(false);
                    });
                }, 5000);
        }
        else{
          router.push('/');
        }
    },[])

  return (
    <Container>
        <div className="max-w-screen-lg mx-auto md:mt-10">
        {!isLoading && (
            <div className="flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-center">Success!</div>
                <div className="text-xl font-bold text-center">Your reservation is being processed.</div>
                {type === 'rental' && <div className="text-xl font-bold text-center">You will be redirected to your trips page shortly.</div>}
                {type === 'service' && <div className="text-xl font-bold text-center">You will be redirected to your my service reservation page shortly.</div>}
                {type === 'equipment' && <div className="text-xl font-bold text-center">You will be redirected to your my equipment reservation page shortly.</div>}
                </div>
        )}
       </div>
    </Container>
  )
}

export default page