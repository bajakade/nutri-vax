import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { GenderOptions } from '@/constants/assessment';
import { useColor } from '@/hooks/use-color';
import { cn } from '@/lib/utils';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import type { ChildFormValues } from '../helpers';
import { ButtonGroup } from './button-group';
import { DatePicker } from './date-picker';

type ChildInformationStepProps = {
  control: Control<ChildFormValues>;
  errors: FieldErrors<ChildFormValues>;
  errorClass: string;
  showAge: boolean;
  ageInMonths: number;
  formatDobDisplay: (value: string) => string;
  onOpenScanner: () => void;
};

export function ChildInformationStep({
  control,
  errors,
  errorClass,
  showAge,
  ageInMonths,
  onOpenScanner,
}: ChildInformationStepProps) {
  const primary = useColor('primary');
  const placeholderColor = useColor('mutedForeground');

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
            className={cn(
              'mb-3 h-12 rounded-lg border px-3 bg-card text-foreground',
              errors.name ? 'border-destructive' : 'border-border',
            )}
          />
        )}
      />
      {errors.name ? <Text className={errorClass}>{errors.name.message}</Text> : null}

      <Text className="mb-1 text-foreground">Sex *</Text>
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

      <Text className="mb-1 text-foreground">Immunization # *</Text>
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
              className={cn(
                'flex-1 h-12 rounded-lg border px-3 bg-card text-foreground',
                errors.immunizationNumber ? 'border-destructive' : 'border-border',
              )}
            />
          )}
        />
        <TouchableOpacity
          onPress={onOpenScanner}
          className="items-center justify-center w-12 h-12 ml-2 rounded-xl bg-secondary"
        >
          <FontAwesome5 name="barcode" size={20} color={primary} />
        </TouchableOpacity>
      </View>
      {errors.immunizationNumber ? (
        <Text className={errorClass}>{errors.immunizationNumber.message}</Text>
      ) : null}
    </View>
  );
}
