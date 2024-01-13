/* eslint-disable react/function-component-definition */
/* eslint-disable react/require-default-props */
import { SafeListing, SafeUser } from '@/app/[lang]/types';
import React from 'react';
import Heading from '@/app/[lang]/components/Heading';
import Container from '@/app/[lang]/components/Container';
import ListingCard from '@/app/[lang]/components/listings/ListingCard';

interface FavoritesClientProps {
  listings: SafeListing[],
  currentUser?: SafeUser | null,
  language: string,
  dictionary: any,
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
  language,
  dictionary,
}) => (
  <Container>
    <div className='mt-10'>
      <Heading
        title={dictionary.favorites.title}
        subtitle={dictionary.favorites.desc}
      />
      <div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        {listings.map((listing: any) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
            dictionary={dictionary}
            lang={language}
          />
        ))}
      </div>
    </div>
  </Container>
);

export default FavoritesClient;
