/* eslint-disable react/function-component-definition */

'use client';

import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
}) => (
  <Image
    className="rounded-full"
    height="30"
    width="30"
    alt="Avatar"
    src={src || '/images/placeholder.jpg'}
  />
);

export default Avatar;
