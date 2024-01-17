/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/function-component-definition */
/* eslint-disable vars-on-top */

'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import React, { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  // eslint-disable-next-line no-var
  var cloudinary: any;
}

const uploadPreset = 'kmuviqka';

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
  dictionary?: any;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  dictionary,
}) => {
  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url);
  }, [onChange]);

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => (
        <div
          onClick={() => open?.()}
          className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
        >
          <TbPhotoPlus
            size={50}
          />
          <div className="font-semibold text-lg">
            {dictionary.rentModal.imageUpload}
          </div>
          {value && (
          <div className="absolute inset-0 w-full h-full">
            <Image
              fill
              style={{ objectFit: 'cover' }}
              src={value}
              alt="Car image"
            />
          </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
