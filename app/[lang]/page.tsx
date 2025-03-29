/* eslint-disable react/no-array-index-key */
import Container from '@/app/[lang]/components/Container';
import React from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/dictionary';
import ClientOnly from './components/ClientOnly';
import ShuffleHero from './components/ShuffleHero';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Home = async ({
  params: { lang },
}: {
  params: { lang: Locale }
}) => {
  const dictionary = await getDictionary(lang);

  const services = [
    {
      name: `${dictionary.Home.services.services[0].title}`,
      description: `${dictionary.Home.services.services[0].desc}`,
      imageSrc: 'https://images.unsplash.com/photo-1555695232-57d88cacdfa5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageAlt: `${dictionary.Home.services.services[0].title}`,
      href: `${lang}/search`,
    },
    {
      name: `${dictionary.Home.services.services[1].title}`,
      description: `${dictionary.Home.services.services[1].desc}`,
      imageSrc: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageAlt: `${dictionary.Home.services.services[1].title}`,
      href: `${lang}/searchRepair`,
    },
    {
      name: `${dictionary.Home.services.services[2].title}`,
      description: `${dictionary.Home.services.services[2].desc}`,
      imageSrc: 'https://images.unsplash.com/photo-1606577924006-27d39b132ae2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhciUyMHNlcnZpY2V8ZW58MHx8MHx8fDA%3D',
      imageAlt: `${dictionary.Home.services.services[2].title}`,
      href: `${lang}/searchEquipment`,
    },
  ];

  const featuredTestimonial = {
    body: `${dictionary.Home.featuredTestimonial.title}`,
    author: {
      name: 'Brenna Goyette',
      handle: 'brennagoyette',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80',
      logoUrl: 'https://tailwindui.com/img/logos/savvycal-logo-gray-900.svg',
    },
  };
  const testimonials = [
    [
      [
        {
          body: `${dictionary.Home.testimonials.Leslie}`,
          author: {
            name: 'Leslie Alexander',
            handle: 'lesliealexander',
            imageUrl:
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },
        {
          body: `${dictionary.Home.testimonials.Ethan}`,
          author: {
            name: 'Ethan Bennett',
            handle: 'ethanbennett',
            imageUrl:
              'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHBlb3BsZSUyMHByb3RyYXRlfGVufDB8fDB8fHww',
          },
        },
        {
          body: `${dictionary.Home.testimonials.Olivia}`,
          author: {
            name: 'Olivia Carter',
            handle: 'oliviacarter',
            imageUrl:
              'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHBlb3BsZSUyMHByb3RyYXRlfGVufDB8fDB8fHww',
          },
        },
      ],
      [
        {
          body: `${dictionary.Home.testimonials.Lindsay}`,
          author: {
            name: 'Lindsay Walton',
            handle: 'lindsaywalton',
            imageUrl:
              'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },
        {
          body: `${dictionary.Home.testimonials.Courtney}`,
          author: {
            name: 'Courtney Henry',
            handle: 'courtneyhenry',
            imageUrl:
              'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlb3BsZSUyMHByb3RyYXRlfGVufDB8fDB8fHww',
          },
        },
      ],
    ],
    [
      [
        {
          body: `${dictionary.Home.testimonials.Tom}`,
          author: {
            name: 'Tom Cook',
            handle: 'tomcook',
            imageUrl:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },
        {
          body: `${dictionary.Home.testimonials.Whitney}`,
          author: {
            name: 'Whitney Francis',
            handle: 'whitneyfrancis',
            imageUrl:
              'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },
      ],
      [
        {
          body: `${dictionary.Home.testimonials.Leonard}`,
          author: {
            name: 'Leonard Krasner',
            handle: 'leonardkrasner',
            imageUrl:
              'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },
        {
          body: `${dictionary.Home.testimonials.Floyd}`,
          author: {
            name: 'Floyd Miles',
            handle: 'floydmiles',
            imageUrl:
              'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },
        {
          body: `${dictionary.Home.testimonials.Emily}`,
          author: {
            name: 'Emily Selman',
            handle: 'emilyselman',
            imageUrl:
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          },
        },
      ],
    ],
  ];

  return (
    <ClientOnly>
      <Container>
        <div className="">
          {/* Hero */}
          <ShuffleHero dictionary={dictionary} />
          {/* */}
          {/* Services */}
          <section aria-labelledby="cservices-heading" className="">
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
          </section>

          {/* */}
          {/* Customer Feedback */}
          <div className="relative isolate">
            <svg
              className="absolute inset-0 -z-10 hidden h-full w-full stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)] sm:block"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="55d3d46d-692e-45f2-becd-d8bdc9344f45"
                  width={200}
                  height={200}
                  x="50%"
                  y={0}
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M.5 200V.5H200" fill="none" />
                </pattern>
              </defs>
              <svg x="50%" y={0} className="overflow-visible fill-gray-50">
                <path
                  d="M-200.5 0h201v201h-201Z M599.5 0h201v201h-201Z M399.5 400h201v201h-201Z M-400.5 600h201v201h-201Z"
                  strokeWidth={0}
                />
              </svg>
              <rect width="100%" height="100%" strokeWidth={0} fill="url(#55d3d46d-692e-45f2-becd-d8bdc9344f45)" />
            </svg>
            <div className="relative">
              <div
                className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
                aria-hidden="true"
              >
                <div
                  className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]"
                  style={{
                    clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                  }}
                />
              </div>
              <div
                className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-8 opacity-25 blur-3xl xl:justify-end"
                aria-hidden="true"
              >
                <div
                  className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] xl:ml-0 xl:mr-[calc(50%-12rem)]"
                  style={{
                    clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                  }}
                />
              </div>
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-xl sm:text-center">
                  <p className="mt-2 pt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {dictionary.Home.testimonialsTitle}
                  </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
                  <figure className="col-span-2 hidden sm:block sm:rounded-2xl sm:bg-white sm:shadow-lg sm:ring-1 sm:ring-gray-900/5 xl:col-start-2 xl:row-end-1">
                    <blockquote className="p-12 text-xl font-semibold leading-8 tracking-tight text-gray-900">
                      <p>{`“${featuredTestimonial.body}”`}</p>
                    </blockquote>
                    <figcaption className="flex items-center gap-x-4 border-t border-gray-900/10 px-6 py-4">
                      <img
                        className="h-10 w-10 flex-none rounded-full bg-gray-50"
                        src={featuredTestimonial.author.imageUrl}
                        alt="featured testimonial "
                      />
                      <div className="flex-auto">
                        <div className="font-semibold">{featuredTestimonial.author.name}</div>
                        <div className="text-gray-600">{`@${featuredTestimonial.author.handle}`}</div>
                      </div>
                    </figcaption>
                  </figure>
                  {testimonials.map((columnGroup, columnGroupIdx) => (
                    <div key={columnGroupIdx} className="space-y-8 xl:contents xl:space-y-0">
                      {columnGroup.map((column, columnIdx) => (
                        <div
                          key={columnIdx}
                          className={classNames(
                            (columnGroupIdx === 0 && columnIdx === 0)
                            // eslint-disable-next-line max-len
                            || (columnGroupIdx === testimonials.length - 1 && columnIdx === columnGroup.length - 1)
                              ? 'xl:row-span-2'
                              : 'xl:row-start-1',
                            'space-y-8',
                          )}
                        >
                          {column.map((testimonial) => (
                            <figure
                              key={testimonial.author.handle}
                              className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                            >
                              <blockquote className="text-gray-900">
                                <p>{`“${testimonial.body}”`}</p>
                              </blockquote>
                              <figcaption className="mt-6 flex items-center gap-x-4">
                                <img
                                  className="h-10 w-10 rounded-full bg-gray-50"
                                  src={testimonial.author.imageUrl}
                                  alt="testimonial author"
                                />
                                <div>
                                  <div className="font-semibold">{testimonial.author.name}</div>
                                  <div className="text-gray-600">{`@${testimonial.author.handle}`}</div>
                                </div>
                              </figcaption>
                            </figure>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* */}

        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
