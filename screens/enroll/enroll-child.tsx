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
import { useColor } from '@/hooks/use-color';
import { Eligibility } from '@/types/enum';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCameraPermissions } from 'expo-camera';
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
  const [showScanner, setShowScanner] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const {
    control,
    trigger,
    watch,
    getValues,
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
  const borderColor = useColor('border');
  const assessmentCardBackground = useColor('secondary');

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
    setShowScanner(false);
    // todo: fix me
    // setDobPickerState({
    //   visible: false,
    //   date: maxSelectableDob,
    //   onChange: undefined,
    //   onBlur: undefined,
    // });
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
      <View className="px-4 pt-6 bg-background dark:bg-[dark]">
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
            className="mb-6 py-8 px-4 rounded-lg"
            style={{
              backgroundColor: assessmentCardBackground,
              shadowColor: borderColor,
              shadowOpacity: 0.1,
            }}
          >
            <ChildInformationStep
              control={control}
              errors={errors}
              errorClass="text-destructive mb-1 text-sm"
              showAge={showAge}
              ageInMonths={ageInMonths}
              formatDobDisplay={formatDateForDisplay}
              onOpenScanner={() => setShowScanner(true)}
            />
          </Animated.View>
        )}

        {step === 2 && (
          <Animated.View
            key="step-2"
            entering={SlideInRight}
            exiting={SlideOutLeft}
            className="mb-6 p-4 rounded-lg shadow-md"
            style={{
              backgroundColor: assessmentCardBackground,
              shadowColor: borderColor,
              shadowOpacity: 0.1,
              shadowRadius: 8,
            }}
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

        <BarcodeScannerModal
          visible={showScanner}
          permissionGranted={Boolean(permission?.granted)}
          onRequestPermission={() => requestPermission()}
          onClose={() => setShowScanner(false)}
        />
      </View>
    </ParallaxScrollView>
  );
};

export default EnrollChild;
