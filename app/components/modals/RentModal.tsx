/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/function-component-definition */

'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import useRentModal from '@/app/hooks/useRentModal';
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';
import Heading from '../Heading';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import Counter from '../inputs/Counter';
import CategoryInput from '../inputs/CategoryInput';
import CitySelect from '../inputs/CitySelect';
import { categories } from '../navbar/Categories';
import SelectInput from '../inputs/SelectInput';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}
const RentModal: React.FC = () => {
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
      //   guestCount: 1,
      passangersCount: 1,
      //   roomCount: 1,
      //   bathroomCount: 1,
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

    axios.post('/api/listings', data)
      .then(() => {
        toast.success('Car listing is created!');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error('Something went wrong. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your car?"
        subtitle="Pick a category"
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
          title="Where is your car parked?"
          subtitle="Help guests find your car"
        />
        <CitySelect
          value={location}
          onChange={(value: any) => setCustomValue('location', value)}
        />

        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your car"
          subtitle=""
        />
        <Counter
          onChange={(value) => setCustomValue('passangersCount', value)}
          value={passangersCount}
          title="Passangers"
          subtitle="How many passangers can fit in your car?"
        />
        <Counter
          onChange={(value) => setCustomValue('cylindersCount', value)}
          value={cylindersCount}
          title="Cylinders"
          subtitle="How many cylinders does your car have?"
        />
        <Counter
          onChange={(value) => setCustomValue('mileageCount', value)}
          value={mileageCount}
          title="Mileage"
          subtitle="Mileage of your car?"
        />
        <SelectInput
          placeholder="Select Fuel Type"
          value={fuelType}
          onChange={(value) => setCustomValue('fuelType', value)}
          List={fuelTypes}
        />
        <SelectInput
          placeholder="Auto / Manual"
          value={transmissionType}
          onChange={(value) => setCustomValue('transmissionType', value)}
          List={transmissionTypes}
        />
        <SelectInput
          placeholder="Drive Type"
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
          title="Add a photo of your car"
          subtitle=""
        />
        <ImageUpload
          onChange={(value) => setCustomValue('imageSrc', value)}
          value={imageSrc}
        />
      </div>
    );
  }
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Describe your car"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="model"
          label="Model of the car"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="maker"
          label="Maker of the car"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="year"
          label="When was it made?"
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
          title="Now, set your price"
          subtitle="How much do you charge per hour?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
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
      title="Rent a car"
      actionLabel={actionLabel}
      secondaryActionLabel={step === STEPS.CATEGORY ? undefined : secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
