'use client';

import React from 'react';
import {
  DateRange,
  Range,
  RangeKeyDict,
} from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface DatePickerProps {
  value: Range,
  onChange: (value: RangeKeyDict) => void;
  // eslint-disable-next-line react/require-default-props
  disabledDates?: Date[];
}

// eslint-disable-next-line react/function-component-definition
const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  disabledDates,
}) => (
  <DateRange
    rangeColors={['#262626']}
    ranges={[value]}
    date={new Date()}
    onChange={onChange}
    direction="vertical"
    showDateDisplay={false}
    minDate={new Date()}
    disabledDates={disabledDates}
  />
);

export default DatePicker;
