/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/function-component-definition */

'use client';

import React from 'react';
import { IconType } from 'react-icons';

interface CategoryBoxProps {
  icon: IconType,
  label: string;
  // eslint-disable-next-line react/require-default-props
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => (
  <div
    onClick={() => onClick(label)}
    className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${selected ? 'border-black' : 'border-neutral-200'} `}
  >
    <Icon size={30} />
    <div className="font-semibold">
      {label}
    </div>
  </div>
);

export default CategoryBox;
