import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

import type { ChildFormValues } from '../helpers';
import { YesNoButtonGroup } from './YesNoButtonGroup';

type AssessmentStepProps = {
  control: Control<ChildFormValues>;
  errors: FieldErrors<ChildFormValues>;
  errorTextStyle: { color: string; marginTop: number; marginBottom: number };
};

export function AssessmentStep({ control, errors, errorTextStyle }: AssessmentStepProps) {
  const foreground = useThemeColor({}, 'foreground');
  const destructive = useThemeColor({}, 'destructive');
  const borderColor = useThemeColor({}, 'border');
  const card = useThemeColor({}, 'card');
  const placeholderColor = useThemeColor({ light: '#999999', dark: '#94A3B8' }, 'mutedForeground');

  return (
    <View>
      <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 8, color: foreground }}>
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
            style={{
              height: 50,
              borderWidth: 1,
              borderColor: errors.muac ? destructive : borderColor,
              borderRadius: 12,
              paddingHorizontal: 12,
              marginBottom: 8,
              fontSize: 16,
              backgroundColor: card,
              color: foreground,
            }}
          />
        )}
      />
      {errors.muac ? <Text style={errorTextStyle}>{errors.muac.message}</Text> : null}

      <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 8, color: foreground }}>
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

      <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 8, color: foreground }}>
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
