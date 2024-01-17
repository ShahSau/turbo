/* eslint-disable react/require-default-props */
/* eslint-disable react/function-component-definition */

'use client';

import { SafeUser } from '@/app/[lang]/types';
import React from 'react';
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import Categories from './Categories';
import CategoriesRepair from './Categoriesrepair';
import SearchRepair from './SearchRepair';
import LocaleSwitcher from '../locale-switcher';

interface NavbarProps {
  currentUser?: SafeUser | null;
  dictionary: any;
  lang: any;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  dictionary,
  lang,
}) => (
  <div className="fixed w-full bg-white z-10 shadow-sm">
    <div className="py-4 border-b-[1px]">
      <Container>
        <div className="flex flex-row items-end justify-between gap-3 md:gap-0">
          <Logo lang={lang} />
          <div className="flex flex-row items-center gap-3 md:gap-5">
            <LocaleSwitcher />
            <UserMenu currentUser={currentUser} dictionary={dictionary} lang={lang} />
          </div>
        </div>
      </Container>
      <Search />
      <SearchRepair />
      <Categories />
      <CategoriesRepair />
    </div>
  </div>
);

export default Navbar;
