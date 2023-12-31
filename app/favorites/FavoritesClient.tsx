/* eslint-disable react/function-component-definition */
/* eslint-disable react/require-default-props */
import { SafeListing, SafeUser } from '@/app/types';
import React from 'react';
import Heading from '@/app/components/Heading';
import Container from '@/app/components/Container';
import ListingCard from '@/app/components/listings/ListingCard';

interface FavoritesClientProps {
  listings: SafeListing[],
  currentUser?: SafeUser | null,
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => (
  <Container>
    <div className='mt-10'>
      <Heading
        title="Favorites"
        subtitle="List of cars you favorited!"
      />
      <div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        {listings.map((listing: any) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </div>
  </Container>
);

export default FavoritesClient;
