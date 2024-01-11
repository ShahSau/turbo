/* eslint-disable react/function-component-definition */
/* eslint-disable react/require-default-props */

'use client';


import React from 'react';
import Button from '../Button';


interface EquipmentReservationProps {
  price: number;
  totalPrice: number;
  onSubmit: () => void;
  disabled?: boolean;
  disabledAmount: boolean;
  dictionary?: any;
  lang?: any;
}

const EquipmentReservation: React.FC<
EquipmentReservationProps
> = ({
  price,
  totalPrice,
  onSubmit,
  disabled,
  disabledAmount,
  dictionary,
  lang,
}) => (
  <div
    className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden "
  >
    <div className="flex flex-row items-center gap-1 p-4">
      <div className="text-2xl font-semibold">
        {dictionary.moneySign}
        {' '}
        {price}
      </div>
    </div>
    <hr />
    <hr />
    <div className="p-4">
      <Button
        disabled={disabled || disabledAmount}
        label={dictionary.listingClient.buy}
        onClick={onSubmit}
      />
    </div>
    <hr />
    <div
      className=" p-4 flex flex-row items-center justify-between font-semibold text-lg "
    >
      <div>
        {dictionary.listingClient.total}
      </div>
      <div>
        {dictionary.moneySign}
        {' '}
        {totalPrice}
      </div>
    </div>
  </div>
);

export default EquipmentReservation;
