/* eslint-disable react/no-array-index-key */
import Container from '@/app/[lang]/components/Container';
import React from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/dictionary';
import ClientOnly from './components/ClientOnly';
import ShuffleHero from './components/ShuffleHero';
import TestimonialCard from './components/TestimonialCard';
import Services from './components/Services';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Home = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang);

  const services = [
    {
      name: `${dictionary.Home.services.services[0].title}`,
      description: `${dictionary.Home.services.services[0].desc}`,
      imageSrc:
        'https://images.unsplash.com/photo-1555695232-57d88cacdfa5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageAlt: `${dictionary.Home.services.services[0].title}`,
      href: `${lang}/search`,
    },
    {
      name: `${dictionary.Home.services.services[1].title}`,
      description: `${dictionary.Home.services.services[1].desc}`,
      imageSrc:
        'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageAlt: `${dictionary.Home.services.services[1].title}`,
      href: `${lang}/searchRepair`,
    },
    {
      name: `${dictionary.Home.services.services[2].title}`,
      description: `${dictionary.Home.services.services[2].desc}`,
      imageSrc:
        'https://images.unsplash.com/photo-1606577924006-27d39b132ae2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhciUyMHNlcnZpY2V8ZW58MHx8MHx8fDA%3D',
      imageAlt: `${dictionary.Home.services.services[2].title}`,
      href: `${lang}/searchEquipment`,
    },
  ];

  return (
    <ClientOnly>
      <Container>
        <div className="">
          {/* Hero */}
          <ShuffleHero dictionary={dictionary} />
          {/* */}
          {/* Services */}
          {/* <section aria-labelledby="cservices-heading" className="">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                <h2 id="cservices-heading" className="text-2xl font-bold text-gray-900">
                  {dictionary.Home.services.title}
                </h2>
                <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                  {services.map((service) => (
                    <div key={service.name} className="group relative">
                      <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                        <img
                          src={service.imageSrc}
                          alt={service.imageAlt}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <h3 className="mt-6 text-sm text-gray-500">
                        <Link href={service.href}>
                          <span className="absolute inset-0" />
                          {service.name}
                        </Link>
                      </h3>
                      <p className="text-base font-semibold text-gray-900">{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section> */}
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
