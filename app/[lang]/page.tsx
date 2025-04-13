/* eslint-disable react/no-array-index-key */
import Container from '@/app/[lang]/components/Container';
import React from 'react';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/dictionary';
import ClientOnly from './components/ClientOnly';
import ShuffleHero from './components/ShuffleHero';
import TestimonialCard from './components/TestimonialCard';
import Services from './components/Services';

const Home = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang);

  return (
    <ClientOnly>
      <Container>
        <div className="">
          {/* Hero */}
          <ShuffleHero dictionary={dictionary} />
          {/* */}
          {/* Services */}
          <div className="mx-auto max-w-5xl">
            <h2
              id="services-heading"
              className="text-2xl font-bold text-gray-900"
            >
              {dictionary.Home.services.title}
            </h2>
          </div>
          <Services dictionary={dictionary} lang={lang} />

          {/* */}
          {/* Customer Feedback */}
          <TestimonialCard dictionary={dictionary} />
          {/* */}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
