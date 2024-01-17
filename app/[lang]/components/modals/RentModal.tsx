/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/function-component-definition */

'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import useRentModal from '@/app/[lang]/hooks/useRentModal';
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { IoCarSportSharp } from 'react-icons/io5';
import { TbSteeringWheel } from 'react-icons/tb';
import { LiaTruckSolid, LiaShuttleVanSolid } from 'react-icons/lia';
import { FaVanShuttle } from 'react-icons/fa6';
import { MdOutlineElectricCar } from 'react-icons/md';
import { GiJeep } from 'react-icons/gi';
import { PiJeepBold } from 'react-icons/pi';
import Modal from './Modal';
import Heading from '../Heading';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import Counter from '../inputs/Counter';
import CategoryInput from '../inputs/CategoryInput';
import CitySelect from '../inputs/CitySelect';
import SelectInput from '../inputs/SelectInput';

interface RentModalProps {
  dictionary: any;
  lang: any;
}

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}
const RentModal: React.FC<RentModalProps> = ({
  dictionary,
  lang,
}) => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
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
  const driveTypes = [
    {
      label: 'Front Wheel Drive',
      value: 'front',
    },
    {
      label: 'Rear Wheel Drive',
      value: 'rear',
    },
    {
      label: 'All Wheel Drive',
      value: 'all',
    },
  ];

  const categories = [
    {
      label: 'SUVs',
      icon: PiJeepBold,
      description: `${dictionary.rentModal.Lsuv}`,
    },
    {
      label: 'Convertibles',
      icon: GiJeep,
      description: `${dictionary.rentModal.Lconvert}`,
    },
    {
      label: 'Electric',
      icon: MdOutlineElectricCar,
      description: `${dictionary.rentModal.Lelectric}`,
    },
    {
      label: 'Minivans',
      icon: FaVanShuttle,
      description: `${dictionary.rentModal.Lminivan}`,
    },
    {
      label: 'Vans',
      icon: LiaShuttleVanSolid,
      description: `${dictionary.rentModal.Lvan}`,
    },
    {
      label: 'Trucks',
      icon: LiaTruckSolid,
      description: `${dictionary.rentModal.Ltruck}`,
    },
    {
      label: '4-Wheel',
      icon: TbSteeringWheel,
      description: `${dictionary.rentModal.L4wheel}`,
    },
    {
      label: 'Sports',
      icon: IoCarSportSharp,
      description: `${dictionary.rentModal.Lsports}`,
    },

  ];
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      passangersCount: 1,
      cylindersCount: 1,
      mileageCount: 70,
      imageSrc: '',
      price: 50,
      title: '',
      model: '',
      fuelType: '',
      transmissionType: '',
      maker: '',
      driveType: '',
      year: '',
    },
  });

  const location = watch('location');
  const category = watch('category');
  const passangersCount = watch('passangersCount');
  const imageSrc = watch('imageSrc');
  const cylindersCount = watch('cylindersCount');
  const mileageCount = watch('mileageCount');
  const fuelType = watch('fuelType');
  const transmissionType = watch('transmission');
  const driveType = watch('driveType');

  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [location]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  // eslint-disable-next-line consistent-return
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);
    if (lang !== 'en') {
      if (lang === 'de' || lang === 'fi') {
        data.price = Math.ceil(data.price * 1.10);
      }
      if (lang === 'sv') {
        data.price = Math.ceil(data.price * 0.098);
      }
    }

    axios.post('/api/listings', data)
      .then(() => {
        toast.success(`${dictionary.rentModal.created}!`);
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error(`${dictionary.rentModal.failed}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return `${dictionary.rentModal.create}`;
    }

    return `${dictionary.rentModal.next}`;
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return `${dictionary.rentModal.back}`;
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title={dictionary.rentModal.title}
        subtitle={dictionary.rentModal.pick}
      />
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto"
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={dictionary.rentModal.locationTitle}
          subtitle={dictionary.rentModal.locationDesc}
        />
        <CitySelect
          value={location}
          onChange={(value: any) => setCustomValue('location', value)}
          dictionary={dictionary}
        />

        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={dictionary.rentModal.infoTitle}
          subtitle=""
        />
        <Counter
          onChange={(value) => setCustomValue('passangersCount', value)}
          value={passangersCount}
          title={dictionary.rentModal.passangerTitle}
          subtitle={dictionary.rentModal.passangerDesc}
        />
        <Counter
          onChange={(value) => setCustomValue('cylindersCount', value)}
          value={cylindersCount}
          title={dictionary.rentModal.cylinderTitle}
          subtitle={dictionary.rentModal.cylinderDesc}
        />
        <Counter
          onChange={(value) => setCustomValue('mileageCount', value)}
          value={mileageCount}
          title={dictionary.rentModal.mileageTitle}
          subtitle={dictionary.rentModal.mileageDesc}
        />
        <SelectInput
          placeholder={dictionary.rentModal.fuelTitle}
          value={fuelType}
          onChange={(value) => setCustomValue('fuelType', value)}
          List={fuelTypes}
        />
        <SelectInput
          placeholder={dictionary.rentModal.autoTitle}
          value={transmissionType}
          onChange={(value) => setCustomValue('transmissionType', value)}
          List={transmissionTypes}
        />
        <SelectInput
          placeholder={dictionary.rentModal.drivenTitle}
          value={driveType}
          onChange={(value) => setCustomValue('driveType', value)}
          List={driveTypes}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={dictionary.rentModal.imageTitle}
          subtitle=""
        />
        <ImageUpload
          onChange={(value) => setCustomValue('imageSrc', value)}
          value={imageSrc}
          dictionary={dictionary}
        />
      </div>
    );
  }
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={dictionary.rentModal.descTitle}
          subtitle={dictionary.rentModal.descDesc}
        />
        <Input
          id="title"
          label={dictionary.rentModal.titleTitle}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="model"
          label={dictionary.rentModal.modal}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="maker"
          label={dictionary.rentModal.maker}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="year"
          label={dictionary.rentModal.made}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={dictionary.rentModal.priceTitle}
          subtitle={dictionary.rentModal.priceDesc}
        />
        <Input
          id="price"
          label={dictionary.rentModal.price}
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          lang={lang}
        />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={dictionary.rentModal.main}
      actionLabel={actionLabel}
      secondaryActionLabel={step === STEPS.CATEGORY ? undefined : secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
