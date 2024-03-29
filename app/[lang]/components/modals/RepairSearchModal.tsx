/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import qs from 'query-string';
import dynamic from 'next/dynamic';
import React, { useCallback, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import { formatISO } from 'date-fns';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import useRepairSearchModal from '@/app/[lang]/hooks/useRepairSearchModal';
import Modal from './Modal';
import Calendar from '../inputs/Calendar';

import CitySelect, {
  CountrySelectValue,
} from '../inputs/CitySelect';
import Heading from '../Heading';

enum STEPS {
  LOCATION = 0,
  DATE = 1,
}
interface RepairSearchModalProps {
  dictionary: any;

}

const RepairSearchModal: React.FC<RepairSearchModalProps> = ({
  dictionary,
}) => {
  const router = useRouter();
  const searchModal = useRepairSearchModal();
  const params = useSearchParams();
  const pathname = usePathname();
  const path = pathname?.split('/')[1];

  const [step, setStep] = useState(STEPS.LOCATION);

  const [location, setLocation] = useState<CountrySelectValue>();
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false,
  }), [location]);

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(
    async () => {
      if (step !== STEPS.DATE) {
        return onNext();
      }

      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        locationValue: location?.label,
      };

      if (dateRange.startDate) {
        updatedQuery.startDate = formatISO(dateRange.startDate);
      }

      if (dateRange.endDate) {
        updatedQuery.endDate = formatISO(dateRange.endDate);
      }

      const url = qs.stringifyUrl({
        url: `/${path}/searchRepair`,
        query: updatedQuery,
      }, { skipNull: true });

      setStep(STEPS.LOCATION);
      searchModal.onCloseR();
      router.push(url);
    },
    [
      step,
      searchModal,
      location,
      router,
      dateRange,
      onNext,
      params,
    ],
  );

  const actionLabel = useMemo(() => {
    if (step === STEPS.DATE) {
      return `${dictionary.repairSearchModal.search}`;
    }

    return `${dictionary.repairSearchModal.next}`;
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return `${dictionary.repairSearchModal.back}`;
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title={dictionary.repairSearchModal.headingTitle}
        subtitle={dictionary.repairSearchModal.headingDesc}
      />
      <CitySelect
        value={location}
        onChange={(value: any) => setLocation(value as CountrySelectValue)}
        dictionary={dictionary}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={dictionary.repairSearchModal.dateTitle}
          subtitle=""
        />
        <Calendar
          onChange={(value) => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpenR}
      title={dictionary.repairSearchModal.filters}
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={searchModal.onCloseR}
      body={bodyContent}
    />
  );
};

export default RepairSearchModal;
