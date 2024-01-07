'use client';

import React from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { FcAutomotive } from "react-icons/fc";
import { FaCarTunnel } from "react-icons/fa6";
import { IoSnowSharp } from "react-icons/io5";
import { GiCarWheel,GiCarBattery,GiCarDoor,GiCarSeat } from "react-icons/gi";

import Container from '../Container';
import CategoryBoxRepair from '../CategoryBoxRepair';


export const categories = [
  {
    label: 'Breaks',
    icon: FcAutomotive,
    description: 'Fix your breaks',
  },
  {
    label: 'Tuning',
    icon: FaCarTunnel,
    description: 'Tune your car',
  },
  {
    label: 'Winter Check',
    icon: IoSnowSharp,
    description: 'Check your car for winter',
  },
  {
    label: 'Wheel',
    icon: GiCarWheel,
    description: 'Fix your wheels',
  },
  {
    label: 'Battery',
    icon: GiCarBattery,
    description: 'Fix your battery',
  },
  {
    label: 'Door',
    icon: GiCarDoor,
    description: 'Fix your door',
  },
  {
    label: 'Seat',
    icon: GiCarSeat,
    description: 'Fix your seat',
  },

];

function CategoriesRepair() {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/searchRepair';

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
          <CategoryBoxRepair
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

export default CategoriesRepair;
