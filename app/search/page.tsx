import Container from '@/app/components/Container';
import ListingCard from '@/app/components/listings/ListingCard';
import EmptyState from '@/app/components/EmptyState';
import React from 'react';
import getListings, {
  IListingsParams,
} from '@/app/actions/getListings';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from '../components/ClientOnly';
import Categories from '../components/navbar/Categories';
interface HomeProps {
    searchParams: IListingsParams
  }

  const Search = async ({ searchParams }: HomeProps) => {
    const listings = await getListings(searchParams);
    const currentUser = await getCurrentUser();
  
    if (listings.length === 0) {
      return (
        <ClientOnly>
          <EmptyState showReset urlLink='/search'/>
        </ClientOnly>
      );
    }
  
    return (
      <ClientOnly>
        <Container>
          <div
            className="mt-16 pt-28 md:pt-30 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 "
          >
            
            {listings.map((listing: any) => (
              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            ))}
          </div>
        </Container>
      </ClientOnly>
    );
  };

export default Search;