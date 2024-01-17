'use client';

import React from 'react';
import { BeatLoader } from 'react-spinners';

function Loader() {
  return (
    <div
      className="h-[70vh] flex flex-col justify-center items-center"
    >
      <BeatLoader
        size={50}
        color="blue"
      />
    </div>
  );
}

export default Loader;
