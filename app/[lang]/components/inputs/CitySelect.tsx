/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/require-default-props */

'use client';

import Select from 'react-select';
import React from 'react';
import cities from '../CityData';

export type CountrySelectValue = {
  label: string;
  latlng: number[],
  value: string,
  dictionary?: any,
};

const CitySelect: React.FC<any> = ({
  value,
  onChange,
  dictionary,
// eslint-disable-next-line arrow-body-style
}) => {
  return (
    <div>
      <Select
        placeholder={dictionary.rentModal.citySelect}
        isClearable
        options={cities}
        value={value}
        onChange={(value: CountrySelectValue) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>
              {option.label}
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme: { colors: any; }) => ({
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
};

export default CitySelect;
