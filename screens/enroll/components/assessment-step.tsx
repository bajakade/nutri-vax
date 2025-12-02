import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';

import { YoNOptions } from '@/constants/assessment';
import { useColor } from '@/hooks/use-color';
import React from 'react';
import type { ChildFormValues } from '../helpers';
import { ButtonGroup } from './button-group';

type AssessmentStepProps = {
  control: Control<ChildFormValues>;
  errors: FieldErrors<ChildFormValues>;
  errorClass: string;
};

export function AssessmentStep({ control, errors, errorClass }: AssessmentStepProps) {
  const foreground = useColor('foreground');
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
            className="h-[50px] rounded-lg border px-3 mb-4 text-sm text-foreground dark:text-background bg-card"
            style={{
              borderColor: errors.muac ? destructive : borderColor,
            }}
          />
        )}
      />
      {errors.muac ? <Text className={errorClass}>{errors.muac.message}</Text> : null}

      <Text className="mb-2 text-base font-medium" style={{ color: foreground }}>
        Oedema *
      </Text>
      <Controller
        control={control}
        name="oedema"
        render={({ field }) => <ButtonGroup {...field} options={YoNOptions} />}
      />
      {errors.oedema ? <Text className={errorClass}>{errors.oedema.message}</Text> : null}

      <Text className="mb-2 text-base font-medium" style={{ color: foreground }}>
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
