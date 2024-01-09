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
import Counter from '../inputs/Counter';
import CategoryInput from '../inputs/CategoryInput';
import { categories } from '../navbar/Categoriesrepair';
import useEquipmentModal from '@/app/hooks/useEquipmentModal';


enum STEPS {
    CATEGORY = 0,
    IMAGES = 1,
    DESCRIPTION = 2,
    PRICE = 3,
}



const EquipmentModal = () => {
  const equipmentModal = useEquipmentModal()
  const router = useRouter();
  const [step, setStep] = useState(STEPS.CATEGORY);
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
        category: '',
        amount: 1,
        imageSrc: '',
        price: 50,
        title: '',
        description: '',
      },
    });

    const amount = watch('amount');
    const category = watch('category');
    const imageSrc = watch('imageSrc');
    const description = watch('description');
    
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

    console.log("DDDDDD",data);
    setIsLoading(true);

    axios.post('/api/equipment', data)
      .then(() => {
        toast.success('Equipment listing is created!');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        equipmentModal.onCloseE();
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
        title="What type of equipment are you selling?"
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


  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your equipment"
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
          title="Describe your equipment"
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
          title="Now, set your price and how many items you have"
          subtitle=""
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
        <Counter
          onChange={(value) => setCustomValue('amount', value)}
          value={amount}
          title="No of Items"
          subtitle="How many items do you have?"
        />
      </div>
    );
  }
    
  return (
    <Modal
      disabled={isLoading}
      isOpen={equipmentModal.isOpenE}
      onClose={equipmentModal.onCloseE}
      onSubmit={handleSubmit(onSubmit)}
      title="Sell you equipment"
      actionLabel={actionLabel}
      secondaryActionLabel={step === STEPS.CATEGORY ? undefined : secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  )
}

export default EquipmentModal