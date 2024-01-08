'use client';

import useSearchModal from '@/app/hooks/useSearchModal';
import { usePathname } from 'next/navigation';
import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { IoMdSearch } from "react-icons/io";

function Search() {
  const searchModel = useSearchModal();
  const pathname = usePathname();
  const isMainPage = pathname === '/search';

  if (!isMainPage) {
    return null;
  }
  return (
    <div className=' flex flex-col items-center justify-center'>
      <div onClick={searchModel.onOpen}
      className="border-[1px] rounded-full transition w-1/4 md:w-1/6 py-2 shadow-sm hover:shadow-md cursor-pointer flex flex-col items-center justify-center">
          <div className="font-semibold px-12 flex flex-row items-center justify-center">
            Filters <br/> <IoMdSearch className='w-6 h-6 '/>
          </div>
      </div>
    </div>
  );
}

export default Search;
