/* eslint-disable no-param-reassign */
/* eslint-disable react/function-component-definition */

'use client';

import React, { useMemo, useState } from 'react';
import useRepairModal from '@/app/[lang]/hooks/useRepairModal';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';
import Heading from '../Heading';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import CitySelect from '../inputs/CitySelect';

interface RepairModalProps {
  dictionary: any;
  lang: any;
}

enum STEPS {
  LOCATION = 0,
  IMAGES = 1,
  DESCRIPTION = 2,
  PRICE = 3,
}

const RepairModal: React.FC<RepairModalProps> = ({
  dictionary,
  lang,
}) => {
  const repairModal = useRepairModal();
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
      location: null,
      imageSrc: '',
      price: 50,
      title: '',
      description: '',
    },
  });

  const location = watch('location');
  const imageSrc = watch('imageSrc');

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

    axios.post('/api/services', data)
      .then(() => {
        toast.success(`${dictionary.repairModal.created}`);
        router.refresh();
        reset();
        setStep(STEPS.LOCATION);
        repairModal.onCloseRe();
      })
      .catch(() => {
        toast.error(`${dictionary.repairModal.failed}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return `${dictionary.repairModal.create}`;
    }

    return `${dictionary.repairModal.next}`;
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return `${dictionary.repairModal.back}`;
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title={dictionary.repairModal.title}
        subtitle={dictionary.repairModal.desc}
      />
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={dictionary.repairModal.locationTitle}
          subtitle={dictionary.repairModal.locationDesc}
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

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={dictionary.repairModal.photoTitle}
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
          title={dictionary.repairModal.descTitle}
          subtitle={dictionary.repairModal.descDesc}
        />
        <Input
          id="title"
          label={dictionary.repairModal.titleTitle}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label={dictionary.repairModal.desc}
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
          title={dictionary.repairModal.priceTitle}
          subtitle={dictionary.repairModal.priceDesc}
        />
        <Input
          id="price"
          label={dictionary.repairModal.price}
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
      isOpen={repairModal.isOpenRe}
      onClose={repairModal.onCloseRe}
      onSubmit={handleSubmit(onSubmit)}
      title={dictionary.repairModal.createService}
      actionLabel={actionLabel}
      secondaryActionLabel={step === STEPS.LOCATION ? undefined : secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RepairModal;
