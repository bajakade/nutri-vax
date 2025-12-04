import { calculateAgeInMonths, generateNutriVaxBarcode } from '@/helpers';
import React, { FC, useMemo, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import {
  ChildFormValues,
  childEnrollmentSchema,
  defaultFormValues,
  determineEligibility,
  formatDateForDisplay,
} from './helpers';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { Eligibility } from '@/types/enum';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { AssessmentStep } from './components/assessment-step';
import { BarcodeScannerModal } from './components/barcode-scanner-modal';
import { ChildInformationStep } from './components/child-information-step';
import { EligibilitySummary } from './components/eligibility-summary';
import { Pager } from './components/pager';
import { StepProgress } from './components/step-progress';

type StepFields = keyof ChildFormValues;

const EnrollChild: FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [eligibility, setEligibility] = useState<Eligibility | null>(null);
  const [isScannerVisible, setIsScannerVisible] = useState(false);

  const {
    control,
    trigger,
    watch,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ChildFormValues>({
    resolver: zodResolver(childEnrollmentSchema),
    defaultValues: defaultFormValues,
  });

  const formValues = watch();
  const ageInMonths = useMemo(
    () => (formValues.dob ? calculateAgeInMonths(formValues.dob) : Number.NaN),
    [formValues.dob],
  );
  const showAge = Number.isFinite(ageInMonths);
  const handleNext = async () => {
    const stepOneFields: StepFields[] = ['name', 'sex', 'dob', 'immunizationNumber'];
    const stepTwoFields: StepFields[] = ['muac', 'oedema', 'zScore'];
    const fieldsToValidate = step === 1 ? stepOneFields : step === 2 ? stepTwoFields : [];

    if (fieldsToValidate.length) {
      const isValid = await trigger(fieldsToValidate);
      if (!isValid) {
        return;
      }
    }

    if (step === 2) {
      setEligibility(determineEligibility(getValues()));
    }

    if (step < 3) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      if (step === 3) {
        setEligibility(null);
      }
      setStep((prev) => prev - 1);
    }
  };

  const resetFormToStart = () => {
    reset({ ...defaultFormValues });
    setEligibility(null);
    setStep(1);
  };

  const handleGenerateCard = () => {
    const barcode = generateNutriVaxBarcode();
    Alert.alert('Success', `NutriVax Barcode Generated: ${barcode}`, [
      {
        text: 'OK',
        onPress: resetFormToStart,
      },
    ]);
  };

  return (
    <ParallaxScrollView>
      <View className="px-4 pt-6 bg-background">
        <View className="items-center mb-4">
          <Text className="mb-1 text-lg font-bold text-accent">Enroll Child</Text>
          <Text className="text-sm text-center text-muted-foreground">
            Scan immunization card to register new beneficiary
          </Text>
        </View>

        <StepProgress currentStep={step} />

        {step === 1 && (
          <Animated.View
            key="step-1"
            entering={SlideInRight}
            exiting={SlideOutLeft}
            className="px-4 py-8 mb-6 rounded-lg shadow-md bg-secondary shadow-black/10"
          >
            <ChildInformationStep
              control={control}
              errors={errors}
              errorClass="text-destructive mb-1 text-sm"
              showAge={showAge}
              ageInMonths={ageInMonths}
              formatDobDisplay={formatDateForDisplay}
              onOpenScanner={() => setIsScannerVisible(true)}
            />
          </Animated.View>
        )}

        {step === 2 && (
          <Animated.View
            key="step-2"
            entering={SlideInRight}
            exiting={SlideOutLeft}
            className="p-4 mb-6 rounded-lg shadow-lg bg-secondary shadow-black/10"
          >
            <AssessmentStep control={control} errors={errors} errorClass="text-destructive mb-1" />
          </Animated.View>
        )}

        {step === 3 && eligibility && (
          <Animated.View
            key="step-3"
            entering={SlideInRight}
            exiting={SlideOutLeft}
            className="mb-5"
          >
            <EligibilitySummary
              eligibility={eligibility}
              childName={formValues.name}
              onGenerateCard={handleGenerateCard}
              onRefer={() => router.push('/(protected)/(tabs)/refer')}
            />
          </Animated.View>
        )}

        <Pager step={step} handleBack={handleBack} handleNext={handleNext} />
      </View>
      <BarcodeScannerModal
        visible={isScannerVisible}
        onClose={(data) => {
          setIsScannerVisible(false);
          if (data) {
            setValue('immunizationNumber', data);
          }
        }}
      />
    </ParallaxScrollView>
  );
};

export default EnrollChild;
