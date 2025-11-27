import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';

import { useColor } from '@/hooks/use-color';

import type { ChildFormValues } from '../helpers';
import { YesNoButtonGroup } from './yes-no-button-group';

type AssessmentStepProps = {
  control: Control<ChildFormValues>;
  errors: FieldErrors<ChildFormValues>;
  errorTextStyle: { color: string; marginTop: number; marginBottom: number };
};

export function AssessmentStep({ control, errors, errorTextStyle }: AssessmentStepProps) {
  const foreground = useColor('foreground');
  const destructive = useColor('destructive');
  const borderColor = useColor('border');
  const card = useColor('card');
  const placeholderColor = useColor('mutedForeground');

  return (
    <View>
      <Text className="mb-2 text-base font-medium" style={{ color: foreground }}>
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
            className="h-[50px] rounded-xl border px-3"
            style={{
              borderColor: errors.muac ? destructive : borderColor,
              marginBottom: 8,
              fontSize: 16,
              backgroundColor: card,
              color: foreground,
            }}
          />
        )}
      />
      {errors.muac ? <Text style={errorTextStyle}>{errors.muac.message}</Text> : null}

      <Text className="mb-2 text-base font-medium" style={{ color: foreground }}>
        Oedema *
      </Text>
      <Controller
        control={control}
        name="oedema"
        render={({ field }) => (
          <YesNoButtonGroup value={field.value} onChange={field.onChange} onBlur={field.onBlur} />
        )}
      />
      {errors.oedema ? <Text style={errorTextStyle}>{errors.oedema.message}</Text> : null}

      <Text className="mb-2 text-base font-medium" style={{ color: foreground }}>
        Z-score {'>'} -2 *
      </Text>
      <Controller
        control={control}
        name="zScore"
        render={({ field }) => (
          <YesNoButtonGroup value={field.value} onChange={field.onChange} onBlur={field.onBlur} />
        )}
      />
      {errors.zScore ? <Text style={errorTextStyle}>{errors.zScore.message}</Text> : null}
    </View>
  );
}
