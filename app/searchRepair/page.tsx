import React from 'react'
import Container from '@/app/components/Container';
import ListingCard from '@/app/components/listings/ListingCard';
import EmptyState from '@/app/components/EmptyState';
import getListings, {
  IRepairParams,
} from '@/app/actions/getListings';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from '../components/ClientOnly';

interface SearchProps {
  searchParams: IRepairParams
}


// fix data structure before working on it
const Search = async ({ searchParams }: SearchProps) => {
  const services = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  // if (services.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset urlLink='/searchRepair'/>
      </ClientOnly>
    );
  //}
}

export default Search;