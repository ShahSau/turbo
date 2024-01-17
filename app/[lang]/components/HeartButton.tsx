/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/require-default-props */

'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import useFavorite from '@/app/[lang]/hooks/useFavorite';
import { SafeUser } from '@/app/[lang]/types';
import React from 'react';

interface HeartButtonProps {
  listingId: string
  currentUser?: SafeUser | null
  dictionary?: any

}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
  dictionary,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
    dictionary,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px] "
      />
      <AiFillHeart
        size={24}
        className={
          hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'
        }
      />
    </div>
  );
};

export default HeartButton;
