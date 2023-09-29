'use client';

import React from 'react';
import { BiSearch } from 'react-icons/bi';

function Search() {
  return (
    <div className="border-[1px] md:w-auto rounded-full transition w-full py-2 shadow-sm hover:shadow-md cursor-pointer">
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">
          Anywhere
        </div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          Anytime
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">
            guest
          </div>
          <div className="p-2  bg-blue-500 rounded-full  text-white">
            <BiSearch size={18} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Search;
