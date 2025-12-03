import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';

import { ButtonGroup } from './button-group';
import type { ChildFormValues } from '../helpers';
import React from 'react';
import { YoNOptions } from '@/constants/assessment';
import { useColor } from '@/hooks/use-color';

type AssessmentStepProps = {
  control: Control<ChildFormValues>;
  errors: FieldErrors<ChildFormValues>;
  errorClass: string;
};

export function AssessmentStep({ control, errors, errorClass }: AssessmentStepProps) {
  const destructive = useColor('destructive');
  const borderColor = useColor('border');
  const placeholderColor = useColor('mutedForeground');

  return (
    <View>
      <Text className="mb-2 text-base font-medium text-foreground dark:text-background">
        MUAC (mm) *
      </Text>
      <Controller
        control={control}
        name="muac"
        render={({ field }) => (
          <TextInput
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            placeholder="Enter MUAC measurement"
            keyboardType="numeric"
            placeholderTextColor={placeholderColor}
            className="h-[50px] rounded-lg border px-3 mb-4 text-sm text-foreground dark:text-background bg-card dark:bg-foreground"
            style={{
              borderColor: errors.muac ? destructive : borderColor,
            }}
          />
        )}
      />
      {errors.muac ? <Text className={errorClass}>{errors.muac.message}</Text> : null}

      <Text className="mb-2 text-base font-medium text-foreground dark:text-background">
        Oedema *
      </Text>
      <Controller
        control={control}
        name="oedema"
        render={({ field }) => <ButtonGroup {...field} options={YoNOptions} />}
      />
      {errors.oedema ? <Text className={errorClass}>{errors.oedema.message}</Text> : null}

      <Text className="mb-2 text-base font-medium text-foreground dark:text-background">
        Z-score {'>'} -2 *
      </Text>
      <Controller
        control={control}
        name="zScore"
        render={({ field }) => <ButtonGroup {...field} options={YoNOptions} />}
      />
      {errors.zScore ? <Text className={errorClass}>{errors.zScore.message}</Text> : null}
    </View>
  );
}
