import React from 'react';
import './globals.css';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/dictionary';
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import RentModal from './components/modals/RentModal';
import getCurrentUser from './actions/getCurrentUser';
import SearchModal from './components/modals/SearchModal';
import RepairSearchModal from './components/modals/RepairSearchModal';
import RepairModal from './components/modals/RepairModal';
import EquipmentModal from './components/modals/EquipmentModal';

export const metadata = {
  title: 'Turbo',
  description: 'Rent a car in 30 seconds',
};

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode,
  params: { lang: Locale }
}) {
  const currentUser = await getCurrentUser();
  const dictionary = await getDictionary(lang);
  return (
    <html lang={lang}>
      <body>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal dictionary={dictionary} lang={lang} />
          <RegisterModal dictionary={dictionary} lang={lang} />
          <SearchModal dictionary={dictionary} lang={lang} />
          <RepairSearchModal dictionary={dictionary} lang={lang} />
          <RentModal dictionary={dictionary} lang={lang} />
          <RepairModal dictionary={dictionary} lang={lang} />
          <EquipmentModal dictionary={dictionary} lang={lang} />
          <Navbar currentUser={currentUser} dictionary={dictionary} lang={lang} />
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
        {/* <Footer /> */}
      </body>

    </html>
  );
}
