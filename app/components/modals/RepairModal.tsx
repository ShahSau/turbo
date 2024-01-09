'use client'

import React, { useMemo, useState } from 'react';
import Modal from './Modal'
import useRepairModal from '@/app/hooks/useRepairModal'
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Heading from '../Heading';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import CitySelect from '../inputs/CitySelect';


enum STEPS {
    LOCATION = 0,
    IMAGES = 1,
    DESCRIPTION = 2,
    PRICE = 3,
}



const RepairModal = () => {
  const repairModal = useRepairModal()
  const router = useRouter();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [isLoading, setIsLoading] = useState(false);

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
        // category: '',
        location: null,
        imageSrc: '',
        price: 50,
        title: '',
        description: '',
      },
    });

    const location = watch('location');
    //const category = watch('category');
    const imageSrc = watch('imageSrc');
    const description = watch('description');

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

    axios.post('/api/services', data)
      .then(() => {
        toast.success('Service listing is created!');
        router.refresh();
        reset();
        setStep(STEPS.LOCATION);
        repairModal.onCloseRe();
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
        if (step === STEPS.LOCATION) {
        return undefined;
        }
    
        return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your service?"
        subtitle="Pick a category"
      />
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your you located?"
          subtitle="Help guests find your service"
        />
        <CitySelect
          value={location}
          onChange={(value: any) => setCustomValue('location', value)}
        />

        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your service"
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
          title="Describe your service"
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
          id="description"
          label="Description"
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
      isOpen={repairModal.isOpenRe}
      onClose={repairModal.onCloseRe}
      onSubmit={handleSubmit(onSubmit)}
      title="Create a new service"
      actionLabel={actionLabel}
      secondaryActionLabel={step === STEPS.LOCATION ? undefined : secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  )
}

export default RepairModal