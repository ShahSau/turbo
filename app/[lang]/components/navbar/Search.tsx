/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import useSearchModal from '@/app/[lang]/hooks/useSearchModal';
import { usePathname } from 'next/navigation';
import React from 'react';
import { IoMdSearch } from 'react-icons/io';

function Search() {
  const searchModel = useSearchModal();
  const pathname = usePathname();
  const path = pathname?.split('/')[1];

  const isMainPage = pathname === '/en/search' || pathname === '/fi/search' || pathname === '/sv/search' || pathname === '/de/search';

  if (!isMainPage) {
    return null;
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        onClick={searchModel.onOpen}
        className="border-[1px] rounded-full transition w-1/4 md:w-1/6 py-2 shadow-sm hover:shadow-md cursor-pointer flex flex-col items-center justify-center"
      >
        <div className="font-semibold px-12 flex flex-row items-center justify-center">
          {path === 'en' ? 'Filters' : path === 'fi' ? 'Suodattimet' : path === 'sv' ? 'Filter' : path === 'de' ? 'Filter' : 'Filters'}
          <br />
          {' '}
          <IoMdSearch className="w-6 h-6 " />
        </div>
      </div>
    </div>
  );
}

export default Search;
