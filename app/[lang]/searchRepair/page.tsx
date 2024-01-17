import React from 'react';
import Container from '@/app/[lang]/components/Container';
import EmptyState from '@/app/[lang]/components/EmptyState';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/dictionary';
import getServices, { IServicesParams } from '../actions/getServices';
import ClientOnly from '../components/ClientOnly';
import ServiceCard from '../components/services/ServiceCard';

interface SearchProps {
  searchParams: IServicesParams,
  params: { lang: Locale }
}

const Search = async ({
  searchParams,
  params,
}: SearchProps) => {
  const services = await getServices(searchParams);
  const dictionary = await getDictionary(params.lang);

  if (services.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset urlLink={`/${params.lang}/searchRepair`} dictionary={dictionary} />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="mt-16 pt-28 md:pt-30 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 "
        >

          {services.map((listing: any) => (
            <ServiceCard
              key={listing.id}
              data={listing}
              lang={params.lang}
              dictionary={dictionary}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Search;
