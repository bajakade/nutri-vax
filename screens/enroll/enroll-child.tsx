import { MAX_AGE_MONTHS, MIN_AGE_MONTHS } from '@/constants/assessment';
import { calculateAgeInMonths, generateNutriVaxBarcode } from '@/helpers';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { FC, useMemo, useState } from 'react';
import { Alert, Platform, Text, TouchableOpacity, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import {
  ChildFormValues,
  DobPickerState,
  childEnrollmentSchema,
  clampDate,
  defaultFormValues,
  determineEligibility,
  formatDateForDisplay,
  formatDateToISO,
  startOfDay,
  subtractMonths,
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
import { DobPickerModal } from './components/dob-picker-modal';
import { EligibilitySummary } from './components/eligibility-summary';
import { StepProgress } from './components/step-progress';

type StepFields = keyof ChildFormValues;

const EnrollChild: FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [eligibility, setEligibility] = useState<Eligibility | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const today = useMemo(() => startOfDay(new Date()), []);
  const maxSelectableDob = useMemo(
    () => startOfDay(subtractMonths(today, MIN_AGE_MONTHS)),
    [today],
  );
  const minSelectableDob = useMemo(
    () => startOfDay(subtractMonths(today, MAX_AGE_MONTHS)),
    [today],
  );

  const [dobPickerState, setDobPickerState] = useState<DobPickerState>({
    visible: false,
    date: maxSelectableDob,
  });

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
  const background = useColor('background');
  const primary = useColor('primary');
  const primaryForeground = useColor('primaryForeground');
  const card = useColor('card');
  const borderColor = useColor('border');
  const destructive = useColor('destructive');
  const mutedForeground = useColor('mutedForeground');
  const assessmentCardBackground = useColor('secondary');
  const errorTextStyle = { color: destructive, marginTop: 4, marginBottom: 8 } as const;

  const handleRequestDobPicker = ({
    value,
    onChange,
    onBlur,
  }: {
    value: string;
    onChange: (val: string) => void;
    onBlur: () => void;
  }) => {
    const parsed = value ? new Date(value) : null;
    const initialDate = clampDate(parsed ?? maxSelectableDob, minSelectableDob, maxSelectableDob);

    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        mode: 'date',
        value: initialDate,
        minimumDate: minSelectableDob,
        maximumDate: maxSelectableDob,
        onChange: (event: DateTimePickerEvent, selectedDate?: Date) => {
          if (event.type === 'set' && selectedDate) {
            const boundedDate = clampDate(selectedDate, minSelectableDob, maxSelectableDob);
            onChange(formatDateToISO(boundedDate));
            onBlur();
          }
        },
      });
    } else {
      setDobPickerState({
        visible: true,
        date: initialDate,
        onChange: (val) => onChange(val),
        onBlur,
      });
    }
  };

  const handleDobDateChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setDobPickerState((prev) => ({
        ...prev,
        date: clampDate(date, minSelectableDob, maxSelectableDob),
      }));
    }
  };

  const closeDobPicker = () => {
    setDobPickerState((prev) => ({
      ...prev,
      visible: false,
      onChange: undefined,
      onBlur: undefined,
    }));
  };

  const confirmDobPicker = () => {
    const selectedISO = formatDateToISO(dobPickerState.date);
    dobPickerState.onChange?.(selectedISO);
    dobPickerState.onBlur?.();
    closeDobPicker();
  };

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
    setDobPickerState({
      visible: false,
      date: maxSelectableDob,
      onChange: undefined,
      onBlur: undefined,
    });
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
      <View className="px-4 pt-6" style={{ backgroundColor: background }}>
        <View className="items-center mb-4">
          <Text className="mb-1 text-2xl font-bold" style={{ color: primary }}>
            Enroll Child
          </Text>
          <Text
            className="text-sm text-center"
            style={{
              color: mutedForeground,
            }}
          >
            Scan immunization card to register new beneficiary
          </Text>
        </View>

        <StepProgress currentStep={step} />

        {step === 1 && (
          <Animated.View
            key="step-1"
            entering={SlideInRight}
            exiting={SlideOutLeft}
            style={{ marginBottom: 24 }}
          >
            <ChildInformationStep
              control={control}
              errors={errors}
              errorTextStyle={errorTextStyle}
              showAge={showAge}
              ageInMonths={ageInMonths}
              onRequestDobPicker={handleRequestDobPicker}
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
            className="mb-6 p-4 rounded-xl shadow-md"
            style={{
              backgroundColor: assessmentCardBackground,
              shadowColor: borderColor,
              shadowOpacity: 0.1,
              shadowRadius: 8,
            }}
          >
            <AssessmentStep control={control} errors={errors} errorTextStyle={errorTextStyle} />
          </Animated.View>
        )}

        {step === 3 && eligibility && (
          <Animated.View
            key="step-3"
            entering={SlideInRight}
            exiting={SlideOutLeft}
            style={{ marginBottom: 24 }}
          >
            <EligibilitySummary
              eligibility={eligibility}
              childName={formValues.name}
              onGenerateCard={handleGenerateCard}
              onRefer={() => router.push('/(protected)/(tabs)/refer')}
            />
          </Animated.View>
        )}

        <View className="flex-row justify-between mb-4">
          {step > 1 && (
            <TouchableOpacity
              onPress={handleBack}
              className="flex-1 mr-2 border-2 py-3 rounded-xl items-center"
              style={{
                backgroundColor: card,
                borderColor: primary,
              }}
            >
              <Text style={{ color: primary, fontWeight: '700' }}>Back</Text>
            </TouchableOpacity>
          )}
          {step < 3 && (
            <TouchableOpacity
              onPress={handleNext}
              className="flex-1 py-3 rounded-xl items-center"
              style={{
                marginLeft: step > 1 ? 8 : 0,
                backgroundColor: primary,
              }}
            >
              <Text style={{ color: primaryForeground, fontWeight: '700' }}>Next</Text>
            </TouchableOpacity>
          )}
        </View>

        {Platform.OS === 'ios' && (
          <DobPickerModal
            visible={dobPickerState.visible}
            date={dobPickerState.date}
            minDate={minSelectableDob}
            maxDate={maxSelectableDob}
            onClose={closeDobPicker}
            onConfirm={confirmDobPicker}
            onChange={handleDobDateChange}
          />
        )}

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
