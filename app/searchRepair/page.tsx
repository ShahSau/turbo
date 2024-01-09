import React from 'react'
import Container from '@/app/components/Container';
import ListingCard from '@/app/components/listings/ListingCard';
import EmptyState from '@/app/components/EmptyState';
// import getListings, {
//   IRepairParams,
// } from '@/app/actions/getListings';
import getServices,{IServicesParams} from '../actions/getServices';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from '../components/ClientOnly';
import ServiceCard from '../components/services/ServiceCard';

interface SearchProps {
  searchParams: IServicesParams
}


// fix data structure before working on it
const Search = async ({ searchParams }: SearchProps) => {
  const services = await getServices(searchParams);
  const currentUser = await getCurrentUser();

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
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}

export default Search;