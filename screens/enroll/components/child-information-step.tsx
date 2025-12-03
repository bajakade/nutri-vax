import React, { useState } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { GenderOptions } from '@/constants/assessment';
import { useColor } from '@/hooks/use-color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import type { ChildFormValues } from '../helpers';
import { BarcodeScannerModal } from './barcode-scanner-modal';
import { ButtonGroup } from './button-group';
import { DatePicker } from './date-picker';

type ChildInformationStepProps = {
  control: Control<ChildFormValues>;
  setQr: (qr: string) => void;
  errors: FieldErrors<ChildFormValues>;
  errorClass: string;
  showAge: boolean;
  ageInMonths: number;
  formatDobDisplay: (value: string) => string;
};

export function ChildInformationStep({
  control,
  setQr,
  errors,
  errorClass,
  showAge,
  ageInMonths,
}: ChildInformationStepProps) {
  const foreground = useColor('foreground');
  const primary = useColor('primary');
  const card = useColor('card');
  const borderColor = useColor('border');
  const destructive = useColor('destructive');
  const placeholderColor = useColor('mutedForeground');
  const selectionActiveBg = useColor('secondary');

  const [showScanner, setShowScanner] = useState(false);

  const onOpenScanner = () => setShowScanner(true);
  const handleCloseScanner = (qr?: string) => {
    setShowScanner(false);

    if (qr) {
      setQr(qr);
    } else {
      // allow camera to hide
      setTimeout(() => Alert.alert('Error', 'No barcode detected. Please try again.'), 2000);
    }
  };

  return (
    <View>
      <Text className="mb-1 text-foreground dark:text-background">Child Name *</Text>
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextInput
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            placeholder="Enter child's full name"
            placeholderTextColor={placeholderColor}
            className="h-12 border rounded-lg px-3 mb-3"
            style={{
              borderColor: errors.name ? destructive : borderColor,
              color: foreground,
              backgroundColor: card,
            }}
          />
        )}
      />
      {errors.name ? <Text className={errorClass}>{errors.name.message}</Text> : null}

      <Text className="mb-1" style={{ color: foreground }}>
        Sex *
      </Text>
      <Controller
        control={control}
        name="sex"
        render={({ field }) => <ButtonGroup {...field} options={GenderOptions} />}
      />
      {errors.sex ? <Text className={errorClass}>{errors.sex.message}</Text> : null}

      <Text className="mb-1 text-foreground dark:text-background">Date of Birth *</Text>
      <Controller
        control={control}
        name="dob"
        render={({ field }) => (
          <DatePicker {...field} label="Select date of birth" errors={errors.dob} />
        )}
      />
      {errors.dob ? <Text className={errorClass}>{errors.dob.message}</Text> : null}
      {showAge ? (
        <Text className="mb-3 text-sm text-accent">
          Age: {Math.max(0, Math.round(ageInMonths))} months
        </Text>
      ) : null}

      <Text className="mb-1" style={{ color: foreground }}>
        Immunization # *
      </Text>
      <View className="flex-row mb-3">
        <Controller
          control={control}
          name="immunizationNumber"
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              placeholder="Scan or enter number"
              placeholderTextColor={placeholderColor}
              className="flex-1 h-12 border rounded-lg px-3"
              style={{
                borderColor: errors.immunizationNumber ? destructive : borderColor,
                color: foreground,
                backgroundColor: card,
              }}
            />
          )}
        />
        <TouchableOpacity
          onPress={onOpenScanner}
          className="w-12 h-12 ml-2 rounded-xl justify-center items-center"
          style={{ backgroundColor: selectionActiveBg }}
        >
          <Icon name="barcode" size={20} color={primary} />
        </TouchableOpacity>
      </View>
      {errors.immunizationNumber ? (
        <Text className={errorClass}>{errors.immunizationNumber.message}</Text>
      ) : null}

      <BarcodeScannerModal visible={showScanner} onClose={handleCloseScanner} />
    </View>
  );
}
