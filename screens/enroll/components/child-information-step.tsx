import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useColor } from '@/hooks/use-color';
import { Gender } from '@/types/enum';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
      <Text className="mb-1" style={{ color: foreground }}>
        Child Name *
      </Text>
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
            className="h-12 border rouded-xl px-3 mb-1"
            style={{
              borderColor: errors.name ? destructive : borderColor,
              color: foreground,
              backgroundColor: card,
            }}
          />
        )}
      />
      {errors.name ? <Text style={errorTextStyle}>{errors.name.message}</Text> : null}

      <Text className="mb-1" style={{ color: foreground }}>
        Sex *
      </Text>
      <Controller
        control={control}
        name="sex"
        render={({ field }) => (
          <View className="flex-row justify-between mb-1">
            {[Gender.Male, Gender.Female].map((sexOption) => (
              <TouchableOpacity
                key={sexOption}
                onPress={() => {
                  field.onChange(sexOption);
                  field.onBlur();
                }}
                className="flex-1 mx-1 py-3 rounded-xl border-2 items-center"
                style={{
                  borderColor: field.value === sexOption ? primary : borderColor,
                  backgroundColor:
                    field.value === sexOption ? selectionActiveBg : selectionInactiveBg,
                }}
              >
                <Text
                  className="font-semibold"
                  style={{
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

      <Text className="mb-1" style={{ color: foreground }}>
        Date of Birth *
      </Text>
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
            className="h-12 border rounded-xl px-3 justify-center mb-1"
            style={{
              borderColor: errors.dob ? destructive : borderColor,
              backgroundColor: card,
            }}
          >
            <Text
              className="text-sm"
              style={{ color: field.value ? foreground : placeholderColor }}
            >
              {field.value ? formatDobDisplay(field.value) : 'Select date of birth'}
            </Text>
          </Pressable>
        )}
      />
      {errors.dob ? <Text style={errorTextStyle}>{errors.dob.message}</Text> : null}
      {showAge ? (
        <Text className="mb-3" style={{ color: primary }}>
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
              className="flex-1 h-12 border rounded-xl px-3"
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
        <Text style={errorTextStyle}>{errors.immunizationNumber.message}</Text>
      ) : null}
    </View>
  );
}
