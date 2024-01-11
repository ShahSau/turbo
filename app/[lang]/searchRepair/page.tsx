import React from 'react'
import Container from '@/app/[lang]/components/Container';
import EmptyState from '@/app/[lang]/components/EmptyState';
import getServices,{IServicesParams} from '../actions/getServices';
import getCurrentUser from '@/app/[lang]/actions/getCurrentUser';
import ClientOnly from '../components/ClientOnly';
import ServiceCard from '../components/services/ServiceCard';
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/dictionary';

interface SearchProps {
  searchParams: IServicesParams,
  lang: Locale
}

const Search = async ({ 
  searchParams,
  lang
 }: SearchProps) => {
  const services = await getServices(searchParams);
  const currentUser = await getCurrentUser();
  const dictionary = await getDictionary(lang);

  if (services.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset urlLink='/searchRepair'/>
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
              currentUser={currentUser}
              key={listing.id}
              data={listing}
              lang={lang}
              dictionary={dictionary}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}

export default Search;