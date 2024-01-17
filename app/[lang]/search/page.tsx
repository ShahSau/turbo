import Container from '@/app/[lang]/components/Container';
import ListingCard from '@/app/[lang]/components/listings/ListingCard';
import EmptyState from '@/app/[lang]/components/EmptyState';
import React from 'react';
import getListings, {
  IListingsParams,
} from '@/app/[lang]/actions/getListings';
import getCurrentUser from '@/app/[lang]/actions/getCurrentUser';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/dictionary';
import ClientOnly from '../components/ClientOnly';

interface SearchProps {
  searchParams: IListingsParams,
  params: { lang: Locale }
}

const Search = async ({
  params,
  searchParams,
}: SearchProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  const dictionary = await getDictionary(params.lang);

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset urlLink={`/${params.lang}/search`} dictionary={dictionary} />
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
