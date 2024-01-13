'use client'
import React, {useEffect, useState} from 'react'
import Container from '@/app/[lang]/components/Container';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';

const page = () => {
    const searchParams = useSearchParams();
    const lang = searchParams?.get('lang');

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(()=>{
        setTimeout(() => {
            router.push('/'+lang);
        }, 5000);
    },[])

    return (
        <Container>
                {lang == 'en' && <div className="flex flex-col items-center justify-center h-screen">
                    <div className="text-3xl font-bold text-center">
                        <p>Payment cancelled</p>
                        <p>Redirecting you to the homepage</p>
                    </div>
                </div>}
                {lang == 'fi' && <div className="flex flex-col items-center justify-center h-screen">
                    <div className="text-3xl font-bold text-center">
                        <p>Maksu peruutettu</p>
                        <p>Uudelleenohjataan etusivulle</p>
                    </div>
                </div>}
                {lang == 'sv' && <div className="flex flex-col items-center justify-center h-screen">
                    <div className="text-3xl font-bold text-center">
                        <p>Betalningen avbruten</p>
                        <p>Omdirigerar dig till startsidan</p>
                    </div>
                </div>}
                {lang == 'de' && <div className="flex flex-col items-center justify-center h-screen">
                    <div className="text-3xl font-bold text-center">
                        <p>Zahlung abgebrochen</p>
                        <p>Leite dich zur Startseite weiter</p>
                    </div>
                </div>}
        </Container>
    )
}

export default page;