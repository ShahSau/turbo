'use client';

import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { IoCarSportSharp } from 'react-icons/io5';
import { TbSteeringWheel } from 'react-icons/tb';
import { LiaTruckSolid, LiaShuttleVanSolid } from 'react-icons/lia';
import { FaVanShuttle } from 'react-icons/fa6';
import { MdOutlineElectricCar } from 'react-icons/md';
import { GiJeep } from 'react-icons/gi';
import { PiJeepBold } from 'react-icons/pi';
import Container from '../Container';
import CategoryBox from '../CategoryBox';

export const categories = [
  {
    label: 'SUVs',
    icon: PiJeepBold,
    description: 'List of SUVs',
  },
  {
    label: 'Convertibles',
    icon: GiJeep,
    description: 'List of Convertibles',
  },
  {
    label: 'Electric',
    icon: MdOutlineElectricCar,
    description: 'List of Electric Cars',
  },
  {
    label: 'Minivans',
    icon: FaVanShuttle,
    description: 'List of Minivans',
  },
  {
    label: 'Vans',
    icon: LiaShuttleVanSolid,
    description: 'List of Passenger Vans',
  },
  {
    label: 'Trucks',
    icon: LiaTruckSolid,
    description: 'List of Pickup Trucks',
  },
  {
    label: '4-Wheel',
    icon: TbSteeringWheel,
    description: 'List of Four Wheel Drive',
  },
  {
    label: 'Sports',
    icon: IoCarSportSharp,
    description: 'List of Sports Cars',
  },

];

function Categories() {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/en/search' || pathname === '/fi/search' || pathname === '/sv/search' || pathname === '/de/search';

  //categories is only shown on the search page
  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="pt-4 flex flex-row items-center justify-between overflow-x-auto"
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}

export default Categories;
