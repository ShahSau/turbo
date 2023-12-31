import React from 'react';
// import { Roboto } from 'next/font/google';
import './globals.css';
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import RentModal from './components/modals/RentModal';
import getCurrentUser from './actions/getCurrentUser';
import Footer from './components/Footer';
import SearchModal from './components/modals/SearchModal';

export const metadata = {
  title: 'Turbo',
  description: 'Rent a car in 30 seconds',
};

// const font = Roboto({
//   weight: '400',
//   subsets: ['latin'],
// });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      {/* <body className={font.className}> */}
      <body>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
        <Footer />
      </body>

    </html>
  );
}
