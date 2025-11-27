import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { useColor } from '@/hooks/use-color';
import { Gender } from '@/types/enum';

import type { ChildFormValues } from '../helpers';

type ChildInformationStepProps = {
  control: Control<ChildFormValues>;
  errors: FieldErrors<ChildFormValues>;
  errorTextStyle: { color: string; marginTop: number; marginBottom: number };
  showAge: boolean;
  ageInMonths: number;
  onRequestDobPicker: (params: {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
  }) => void;
  formatDobDisplay: (value: string) => string;
  onOpenScanner: () => void;
};

export function ChildInformationStep({
  control,
  errors,
  errorTextStyle,
  showAge,
  ageInMonths,
  onRequestDobPicker,
  formatDobDisplay,
  onOpenScanner,
}: ChildInformationStepProps) {
  const foreground = useColor('foreground');
  const primary = useColor('primary');
  const primaryForeground = useColor('mutedForeground');
  const card = useColor('card');
  const borderColor = useColor('border');
  const destructive = useColor('destructive');
  const placeholderColor = useColor('mutedForeground');
  const selectionActiveBg = useColor('secondary');
  const selectionInactiveBg = useColor('card');

  return (
    <View>
      <Text style={{ marginBottom: 4, color: foreground }}>Child Name *</Text>
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
            style={{
              height: 48,
              borderWidth: 1,
              borderColor: errors.name ? destructive : borderColor,
              borderRadius: 12,
              paddingHorizontal: 12,
              marginBottom: 4,
              color: foreground,
              backgroundColor: card,
            }}
          />
        )}
      />
      {errors.name ? <Text style={errorTextStyle}>{errors.name.message}</Text> : null}

      <Text style={{ marginBottom: 4, color: foreground }}>Sex *</Text>
      <Controller
        control={control}
        name="sex"
        render={({ field }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            {[Gender.Male, Gender.Female].map((sexOption) => (
              <TouchableOpacity
                key={sexOption}
                onPress={() => {
                  field.onChange(sexOption);
                  field.onBlur();
                }}
                style={{
                  flex: 1,
                  marginHorizontal: 4,
                  paddingVertical: 12,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: field.value === sexOption ? primary : borderColor,
                  backgroundColor:
                    field.value === sexOption ? selectionActiveBg : selectionInactiveBg,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontWeight: '600',
                    color: field.value === sexOption ? primaryForeground : foreground,
                  }}
                >
                  {sexOption === Gender.Male ? 'Male' : 'Female'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
      {errors.sex ? <Text style={errorTextStyle}>{errors.sex.message}</Text> : null}

      <Text style={{ marginBottom: 4, color: foreground }}>Date of Birth *</Text>
      <Controller
        control={control}
        name="dob"
        render={({ field }) => (
          <Pressable
            onPress={() =>
              onRequestDobPicker({
                value: field.value,
                onChange: field.onChange,
                onBlur: field.onBlur,
              })
            }
            style={{
              height: 48,
              borderWidth: 1,
              borderColor: errors.dob ? destructive : borderColor,
              borderRadius: 12,
              paddingHorizontal: 12,
              justifyContent: 'center',
              marginBottom: 4,
              backgroundColor: card,
            }}
          >
            <Text
              style={{
                color: field.value ? foreground : placeholderColor,
                fontSize: 16,
              }}
            >
              {field.value ? formatDobDisplay(field.value) : 'Select date of birth'}
            </Text>
          </Pressable>
        )}
      />
      {errors.dob ? <Text style={errorTextStyle}>{errors.dob.message}</Text> : null}
      {showAge ? (
        <Text style={{ marginBottom: 12, color: primary }}>
          Age: {Math.max(0, Math.round(ageInMonths))} months
        </Text>
      ) : null}

      <Text style={{ marginBottom: 4, color: foreground }}>Immunization # *</Text>
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
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
              style={{
                flex: 1,
                height: 48,
                borderWidth: 1,
                borderColor: errors.immunizationNumber ? destructive : borderColor,
                borderRadius: 12,
                paddingHorizontal: 12,
                color: foreground,
                backgroundColor: card,
              }}
            />
          )}
        />
        <TouchableOpacity
          onPress={onOpenScanner}
          style={{
            width: 48,
            height: 48,
            backgroundColor: selectionActiveBg,
            marginLeft: 8,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name="barcode" size={20} color={primary} />
        </TouchableOpacity>
      </View>
      {errors.immunizationNumber ? (
        <Text style={errorTextStyle}>{errors.immunizationNumber.message}</Text>
      ) : null}
    </View>
  );
}
