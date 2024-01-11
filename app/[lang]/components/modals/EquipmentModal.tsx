'use client'

import React, { useMemo, useState } from 'react';
import Modal from './Modal'
import useRepairModal from '@/app/[lang]/hooks/useRepairModal'
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { FcAutomotive } from "react-icons/fc";
import { GiCarWheel,GiCarBattery,GiCarDoor,GiCarSeat } from "react-icons/gi";
import { useRouter } from 'next/navigation';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Heading from '../Heading';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import Counter from '../inputs/Counter';
import CategoryInput from '../inputs/CategoryInput';
import useEquipmentModal from '@/app/[lang]/hooks/useEquipmentModal';

interface EquipmentModalProps {
  dictionary: any;
  lang: any;
}

enum STEPS {
    CATEGORY = 0,
    IMAGES = 1,
    DESCRIPTION = 2,
    PRICE = 3,
}



const EquipmentModal: React.FC<EquipmentModalProps> = ({
  dictionary,
  lang,

}) => {
  const equipmentModal = useEquipmentModal()
  const router = useRouter();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    {
      label: `${dictionary.equipmentModal.breakTitle}`,
      icon: FcAutomotive,
      description: `${dictionary.equipmentModal.breakDesc}`,
    },
    {
      label: `${dictionary.equipmentModal.wheelTitle}`,
      icon: GiCarWheel,
      description: `${dictionary.equipmentModal.wheelDesc}`,
    },
    {
      label: `${dictionary.equipmentModal.batteryTitle}`,
      icon: GiCarBattery,
      description: `${dictionary.equipmentModal.batteryDesc}`,
    },
    {
      label: `${dictionary.equipmentModal.doorTitle}`,
      icon: GiCarDoor,
      description: `${dictionary.equipmentModal.doorDesc}`,
    },
    {
      label: `${dictionary.equipmentModal.seatTitle}`,
      icon: GiCarSeat,
      description: `${dictionary.equipmentModal.seatDesc}`,
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

    setIsLoading(true);

    axios.post('/api/equipment', data)
      .then(() => {
        toast.success(`${dictionary.equipmentModal.created}`);
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        equipmentModal.onCloseE();
      })
      .catch(() => {
        toast.error(`${dictionary.equipmentModal.failed}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return `${dictionary.equipmentModal.create}`;
    }

    return `${dictionary.equipmentModal.next}`;
  }, [step]);


  const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
        return undefined;
        }
    
        return `${dictionary.equipmentModal.back}`;
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title={dictionary.equipmentModal.categoryTitle}
        subtitle={dictionary.equipmentModal.pick}
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
          title={dictionary.equipmentModal.photoTitle}
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
          title={dictionary.equipmentModal.descTitle}
          subtitle={dictionary.equipmentModal.descDesc}
        />
        <Input
          id="title"
          label={dictionary.equipmentModal.titleTitle}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label={dictionary.equipmentModal.desc}
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
          title={dictionary.equipmentModal.priceTitle}
          subtitle=""
        />
        <Input
          id="price"
          label={dictionary.equipmentModal.price}
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
          title={dictionary.equipmentModal.quantity}
          subtitle={dictionary.equipmentModal.quantityDesc}
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
      title={dictionary.equipmentModal.createEquipment}
      actionLabel={actionLabel}
      secondaryActionLabel={step === STEPS.CATEGORY ? undefined : secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  )
}

export default EquipmentModal