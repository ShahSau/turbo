/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-plusplus */

'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';

const CARD_SIZE_LG = 415;
const CARD_SIZE_SM = 340;

const BORDER_SIZE = 2;
const CORNER_CLIP = 50;
const CORNER_LINE_LEN = Math.sqrt(
  CORNER_CLIP * CORNER_CLIP + CORNER_CLIP * CORNER_CLIP,
);

const ROTATE_DEG = 2.5;

const STAGGER = 15;
const CENTER_STAGGER = -65;

const SECTION_HEIGHT = 600;

const TESTIMONIAL_DATA = (dictionary: any): TestimonialType[] => [
  {
    tempId: 0,
    testimonial: `${dictionary.Home.testimonials.Leslie}`,
    by: 'Alex, CEO at COMPANY',
    imgSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    tempId: 1,
    testimonial: `${dictionary.Home.testimonials.Ethan}`,
    by: 'Ethan, CEO at COMPANY',
    imgSrc: 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHBlb3BsZSUyMHByb3RyYXRlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=80',
  },
  {
    tempId: 2,
    testimonial: `${dictionary.Home.testimonials.Olivia}`,
    by: 'Olivia, CEO at COMPANY',
    imgSrc: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHBlb3BsZSUyMHByb3RyYXRlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=80',
  },
  {
    tempId: 3,
    testimonial: `${dictionary.Home.testimonials.Lindsay}`,
    by: 'Lindsay, CEO at COMPANY',
    imgSrc: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    tempId: 4,
    testimonial: `${dictionary.Home.testimonials.Courtney}`,
    by: 'Courtney, CEO at COMPANY',
    imgSrc: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlb3BsZSUyMHByb3RyYXRlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=80',
  },
  {
    tempId: 5,
    testimonial: `${dictionary.Home.testimonials.Tom}`,
    by: 'Tom, CEO at COMPANY',
    imgSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    tempId: 6,
    testimonial: `${dictionary.Home.testimonials.Whitney}`,
    by: 'Whitney, CEO at COMPANY',
    imgSrc: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    tempId: 7,
    testimonial: `${dictionary.Home.testimonials.Leonard}`,
    by: 'Leonard, CEO at COMPANY',
    imgSrc: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    tempId: 8,
    testimonial: `${dictionary.Home.testimonials.Floyd}`,
    by: 'Floyd, CEO at COMPANY',
    imgSrc: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    tempId: 9,
    testimonial: `${dictionary.Home.testimonials.Emily}`,
    by: 'Emily, CEO at COMPANY',
    imgSrc: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

interface TestimonialProps {
  position: number;
  testimonial: TestimonialType;
  handleMove: Function;
  cardSize: number;
}

function TestimonialCard({
  position,
  testimonial,
  handleMove,
  cardSize,
}: TestimonialProps) {
  const isActive = position === 0;

  return (
    <motion.div
      initial={false}
      onClick={() => handleMove(position)}
      className={`
        absolute left-1/2 top-1/2 cursor-pointer border-black p-8 text-black transition-colors duration-500 ${
          isActive ? 'z-10 bg-indigo-600' : 'z-0 bg-white'
        }
        `}
      style={{
        borderWidth: BORDER_SIZE,
        clipPath: `polygon(${CORNER_CLIP}px 0%, calc(100% - ${CORNER_CLIP}px) 0%, 100% ${CORNER_CLIP}px, 100% 100%, calc(100% - ${CORNER_CLIP}px) 100%, ${CORNER_CLIP}px 100%, 0 100%, 0 0)`,
      }}
      animate={{
        width: cardSize,
        height: cardSize,
        x: `calc(-50% + ${position * (cardSize / 1.5)}px)`,
        y: `calc(-50% + ${
          isActive ? CENTER_STAGGER : position % 2 ? STAGGER : -STAGGER
        }px)`,
        rotate: isActive ? 0 : position % 2 ? ROTATE_DEG : -ROTATE_DEG,
        boxShadow: isActive ? '0px 8px 0px 4px black' : '0px 0px 0px 0px black',
      }}
      transition={{
        type: 'spring',
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-black object-cover"
        style={{
          right: -BORDER_SIZE,
          top: CORNER_CLIP - BORDER_SIZE,
          width: CORNER_LINE_LEN,
          height: BORDER_SIZE,
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={`Testimonial for ${testimonial.by}`}
        className="mb-4 h-14 w-12 bg-neutral-600 object-cover object-top"
        style={{
          boxShadow: '3px 3px 0px white',
        }}
      />
      <h3
        className={`text-base sm:text-xl ${
          isActive ? 'text-white' : 'text-black'
        }`}
      >
        &quot;
        {testimonial.testimonial}
        &quot;
      </h3>
      <p
        className={`absolute bottom-8 left-8 right-8 mt-2 text-sm italic ${
          isActive ? 'text-indigo-200' : 'text-neutral-700'
        }`}
      >
        -
        {' '}
        {testimonial.by}
      </p>
    </motion.div>
  );
}

  type TestimonialType = {
    tempId: number;
    testimonial: string;
    by: string;
    imgSrc: string;
  };

function StaggerTestimonials({ dictionary }: { dictionary: any }) {
  const [cardSize, setCardSize] = useState(CARD_SIZE_LG);

  const [testimonials, setTestimonials] = useState(() => TESTIMONIAL_DATA(dictionary));

  const handleMove = (position: number) => {
    const copy = [...testimonials];

    if (position > 0) {
      for (let i = position; i > 0; i--) {
        const firstEl = copy.shift();

        if (!firstEl) return;

        copy.push({ ...firstEl, tempId: Math.random() });
      }
    } else {
      for (let i = position; i < 0; i++) {
        const lastEl = copy.pop();

        if (!lastEl) return;

        copy.unshift({ ...lastEl, tempId: Math.random() });
      }
    }

    setTestimonials(copy);
  };

  useEffect(() => {
    const { matches } = window.matchMedia('(min-width: 640px)');

    if (matches) {
      setCardSize(CARD_SIZE_LG);
    } else {
      setCardSize(CARD_SIZE_SM);
    }

    const handleSetCardSize = () => {
      const { matches } = window.matchMedia('(min-width: 640px)');

      if (matches) {
        setCardSize(CARD_SIZE_LG);
      } else {
        setCardSize(CARD_SIZE_SM);
      }
    };

    window.addEventListener('resize', handleSetCardSize);

    return () => window.removeEventListener('resize', handleSetCardSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-neutral-200"
      style={{
        height: SECTION_HEIGHT,
      }}
    >
      {testimonials.map((t, idx) => {
        let position = 0;

        if (testimonials.length % 2) {
          position = idx - (testimonials.length + 1) / 2;
        } else {
          position = idx - testimonials.length / 2;
        }

        return (
          <TestimonialCard
            key={t.tempId}
            testimonial={t}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-8">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => handleMove(-1)}
          className="grid h-14 w-14 place-content-center text-3xl transition-colors hover:bg-black hover:text-white"
        >
          <GoArrowLeft />
        </button>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => handleMove(1)}
          className="grid h-14 w-14 place-content-center text-3xl transition-colors hover:bg-black hover:text-white"
        >
          <GoArrowRight />
        </button>
      </div>
    </div>
  );
}

export default StaggerTestimonials;
