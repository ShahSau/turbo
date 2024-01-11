/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/require-default-props */

'use client';

import Select from 'react-select';
import React from 'react';

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[],
  region: string;
  value: string
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
  List: any;
  placeholder?: string;
}

const SelectInput: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  List,
  placeholder,
}) => (
  <div>
    <Select
      placeholder={placeholder}
      isClearable
      options={List}
      value={value}
      onChange={(value) => onChange(value as any)}
      formatOptionLabel={(option: any) => (
        <div className="flex flex-row items-center gap-3">
          <div>{option.flag}</div>
          <div>
            {option.label}
            ,
            <span className="text-neutral-500 ml-1">
              {option.region}
            </span>
          </div>
        </div>
      )}
      classNames={{
        control: () => 'p-3 border-2',
        input: () => 'text-lg',
        option: () => 'text-lg',
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: 'black',
          primary25: '#ADD8E6',
        },
      })}
    />
  </div>
);

export default SelectInput;
