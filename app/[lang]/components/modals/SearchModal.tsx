'use client';

import qs from 'query-string';
import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from "react";
import { Range } from 'react-date-range';
import { formatISO } from 'date-fns';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import useSearchModal from "@/app/[lang]/hooks/useSearchModal";

import Modal from "./Modal";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import CitySelect, { 
  CountrySelectValue
} from "../inputs/CitySelect";
import Heading from '../Heading';

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}
interface SearchModalProps {
  dictionary: any;
  lang: any;
}
const fuelTypes = [
    {
      label: 'Gasoline',
      value: 'gasoline',
    },
    {
      label: 'Diesel',
      value: 'diesel',
    },
    {
      label: 'Electric',
      value: 'electric',
    },
  ];

  const transmissionTypes = [
    {
      label: 'Automatic',
      value: 'automatic',
    },
    {
      label: 'Manual',
      value: 'manual',
    },
  ];

const SearchModal: React.FC<SearchModalProps> = ({
    dictionary,
    lang,
}) => {
    const router = useRouter();
    const searchModal = useSearchModal();
    const params = useSearchParams();
    const pathname = usePathname();
    const path = pathname?.split('/')[1];
  
    const [step, setStep] = useState(STEPS.LOCATION);
  
    const [location, setLocation] = useState<CountrySelectValue>();
    const [passangersCount, setPassangersCount] = useState(1);
    const [cylindersCount, setCylindersCount] = useState(1);
    const [fuelType, setFuelType] = useState(fuelTypes[0].value);
    const [transmissionType, setTransmissionType] = useState(transmissionTypes[0].value);
    const [dateRange, setDateRange] = useState<Range>({
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    });
  
    const Map = useMemo(() => dynamic(() => import('../Map'), { 
      ssr: false 
    }), [location]);
  
    const onBack = useCallback(() => {
      setStep((value) => value - 1);
    }, []);
  
    const onNext = useCallback(() => {
      setStep((value) => value + 1);
    }, []);
  
    const onSubmit = useCallback(async () => {
      if (step !== STEPS.INFO) {
        return onNext();
      }
  
      let currentQuery = {};
  
      if (params) {
        currentQuery = qs.parse(params.toString())
      }
  
      const updatedQuery: any = {
        ...currentQuery,
        locationValue: location?.label,
        passangersCount,
        cylindersCount,
        fuelType,
        transmissionType,
      };
  
      if (dateRange.startDate) {
        updatedQuery.startDate = formatISO(dateRange.startDate);
      }
  
      if (dateRange.endDate) {
        updatedQuery.endDate = formatISO(dateRange.endDate);
      }
  
      const url = qs.stringifyUrl({
        url: `/${path}/search`,
        query: updatedQuery,
      }, { skipNull: true });
  
      setStep(STEPS.LOCATION);
      searchModal.onClose();
      router.push(url);
    }, 
    [
      step, 
      searchModal, 
      location, 
      router, 
      passangersCount,    
      fuelType,
        transmissionType,
      dateRange,
      onNext,
      cylindersCount,
      params
    ]);
  
    const actionLabel = useMemo(() => {
      if (step === STEPS.INFO) {
        return `${dictionary.searchModal.search}`
      }
  
      return `${dictionary.searchModal.next}`
    }, [step]);
  
    const secondaryActionLabel = useMemo(() => {
      if (step === STEPS.LOCATION) {
        return undefined
      }
  
      return `${dictionary.searchModal.back}`
    }, [step]);
  
    let bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={dictionary.searchModal.headingTitle}
          subtitle={dictionary.searchModal.headingDesc}
        />
        <CitySelect 
          value={location} 
          onChange={(value: any) => 
            setLocation(value as CountrySelectValue)} 
          dictionary={dictionary}
        />
        <hr />
        <Map center={location?.latlng} />
      </div>
    )
  
    if (step === STEPS.DATE) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title={dictionary.searchModal.dateTitle}
            subtitle={dictionary.searchModal.dateDesc}
          />
          <Calendar
            onChange={(value) => setDateRange(value.selection)}
            value={dateRange}
          />
        </div>
      )
    }
  
    if (step === STEPS.INFO) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title={dictionary.searchModal.infoTitle}
            subtitle={dictionary.searchModal.infoDesc}
          />
          <Counter 
            onChange={(value) => setPassangersCount(value)}
            value={passangersCount}
            title={dictionary.searchModal.passangerTitle}
            subtitle={dictionary.searchModal.passangerDesc}
          />
          <hr />
          <div className="flex flex-row gap-3">
                <p>{dictionary.searchModal.fuelType}</p>
                {fuelTypes.map((item) => (
                <div 
                    key={item.value}
                    onClick={() => setFuelType(item.value)}
                    className={`flex flex-row items-center gap-2 p-2 rounded-md cursor-pointer 
                    ${fuelType === item.value ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}
                >
                    <div className="text-sm">
                    {item.label}
                    </div>
                </div>
                ))}
          </div>
          <hr />
          <div className="flex flex-row gap-3">
                <p>{dictionary.searchModal.transmissionType}</p>
                {transmissionTypes.map((item) => (
                <div 
                    key={item.value}
                    onClick={() => setTransmissionType(item.value)}
                    className={`flex flex-row items-center gap-2 p-2 rounded-md cursor-pointer 
                    ${transmissionType === item.value ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}
                >
                    <div className="text-sm">
                    {item.label}
                    </div>
                </div>
                ))}
          </div>
          <hr />
          <Counter 
            onChange={(value) => {
              setCylindersCount(value)
            }}
            value={cylindersCount}
            title={dictionary.searchModal.cylinderTitle}
            subtitle={dictionary.searchModal.cylinderDesc}
          />
        </div>
      )
    }
  
    return (
      <Modal
        isOpen={searchModal.isOpen}
        title={dictionary.searchModal.title}
        actionLabel={actionLabel}
        onSubmit={onSubmit}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
        onClose={searchModal.onClose}
        body={bodyContent}
      />
    );
  }
  
  export default SearchModal;