'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Logo({
  lang
}:{
  lang: any
}) {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push('/'+lang+'/')}
      className="block cursor-pointer"
      src="/images/logo.png"
      height="100"
      width="100"
      alt="Logo"
      priority
    />
  );
}

export default Logo;
