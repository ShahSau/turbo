/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

const squareData = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1502489597346-dad15683d4c2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1325&q=80',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?q=80&w=2880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?q=80&w=3732&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1618312980096-873bd19759a0?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1628577478162-d4d00467c627?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1541348263662-e068662d82af?q=80&w=3648&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1547143379-3374bbefa14a?q=80&w=3446&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=684&q=80',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1597766353939-9d782bde7a2f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=882&q=80',
  },
  {
    id: 13,
    src: 'https://images.unsplash.com/photo-1631972241361-330c704b90f1?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
  },
  {
    id: 14,
    src: 'https://images.unsplash.com/photo-1619642737579-a7474bee1044?q=80&w=3503&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80',
  },
  {
    id: 15,
    src: 'https://images.unsplash.com/photo-1592891024295-ed15966fcba0?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=681&q=80',
  },
  {
    id: 16,
    src: 'https://images.unsplash.com/photo-1549064233-945d7063292f?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1820&q=80',
  },
];

const shuffle = (array: (typeof squareData)[0][]) => {
  const arrayCopy = [...array];
  let currentIndex = arrayCopy.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [arrayCopy[currentIndex], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[currentIndex],
    ];
  }

  return arrayCopy;
};

const generateSquares = () => shuffle(squareData).map((sq) => (
  <motion.div
    key={sq.id}
    layout
    transition={{ duration: 1.5, type: 'spring' }}
    className="w-full h-full"
    style={{
      backgroundImage: `url(${sq.src})`,
      backgroundSize: 'cover',
    }}
  />
));

function ShuffleGrid() {
  const timeoutRef = useRef<any>(null);
  const [squares, setSquares] = useState(generateSquares());
  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
}

function ShuffleHero({ dictionary }: { dictionary: any }) {
  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div className="relative bg-gray-100 lg:bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-24 lg:max-w-none">
            <div className="lg:pr-16">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
                {dictionary.Home.title}
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                {dictionary.Home.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
      <ShuffleGrid />
    </section>
  );
}

export default ShuffleHero;
