/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/function-component-definition */

'use client';

import React from 'react';

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  label,
}) => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <div
    onClick={onClick}
    className=" px-4 py-3 hover:bg-neutral-100 transition font-semibold"
  >
    {label}
  </div>
);

export default MenuItem;
