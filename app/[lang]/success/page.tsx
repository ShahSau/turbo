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
    const lang = searchParams?.get('lang');

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
        {!isLoading && lang =='en' && (
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-center">Success!</div>
              <div className="text-xl font-bold text-center">Your reservation is being processed.</div>
              {type === 'rental' && <div className="text-xl font-bold text-center">You will be redirected to your trips page shortly.</div>}
              {type === 'service' && <div className="text-xl font-bold text-center">You will be redirected to your my service reservation page shortly.</div>}
              {type === 'equipment' && <div className="text-xl font-bold text-center">You will be redirected to your my equipment reservation page shortly.</div>}
            </div>
        )}
        {!isLoading && lang =='fi' && (
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-center">Onnistui!</div>
              <div className="text-xl font-bold text-center">Varauksesi on käsiteltävänä.</div>
              {type === 'rental' && <div className="text-xl font-bold text-center">Sinut ohjataan pian matkasi-sivulle.</div>}
              {type === 'service' && <div className="text-xl font-bold text-center">Sinut ohjataan pian palveluvarauksesi-sivulle.</div>}
              {type === 'equipment' && <div className="text-xl font-bold text-center">Sinut ohjataan pian varauksesi-sivulle.</div>}
            </div>
        )}

        {!isLoading && lang =='sv' && (
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-center">Framgång!</div>
              <div className="text-xl font-bold text-center">Din reservation behandlas.</div>
              {type === 'rental' && <div className="text-xl font-bold text-center">Du kommer att omdirigeras till din resa sida inom kort.</div>}
              {type === 'service' && <div className="text-xl font-bold text-center">Du kommer att omdirigeras till din servicebokningssida inom kort.</div>}
              {type === 'equipment' && <div className="text-xl font-bold text-center">Du kommer att omdirigeras till din bokningssida inom kort.</div>}
            </div>
        )}

        {!isLoading && lang =='de' && (
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-center">Erfolg!</div>
              <div className="text-xl font-bold text-center">Ihre Reservierung wird bearbeitet.</div>
              {type === 'rental' && <div className="text-xl font-bold text-center">Sie werden in Kürze zu Ihrer Reise-Seite umgeleitet.</div>}
              {type === 'service' && <div className="text-xl font-bold text-center">Sie werden in Kürze zu Ihrer Service-Reservierungsseite umgeleitet.</div>}
              {type === 'equipment' && <div className="text-xl font-bold text-center">Sie werden in Kürze zu Ihrer Reservierungsseite umgeleitet.</div>}
            </div>
        )}

       </div>
    </Container>
  )
}

export default page