import React from 'react';
import { Text, View } from 'react-native';

import { cn } from '@/lib/utils';

type StepProgressProps = {
  currentStep: number;
};

const STEP_LABELS = ['Scan', 'Verify', 'Issue'];

export function StepProgress({ currentStep }: StepProgressProps) {
  return (
    <>
      <View className="mb-4 flex-row justify-center">
        {[1, 2, 3].map((step) => (
          <View key={step} className="flex-row items-center">
            <View
              className={cn(
                'mx-1 h-9 w-9 items-center justify-center rounded-full border-2 border-border bg-card',
                currentStep >= step && 'border-0 bg-primary',
              )}
            >
              <Text
                className={cn(
                  'font-bold text-muted-foreground',
                  currentStep >= step && 'text-primary-foreground',
                )}
              >
                {step}
              </Text>
            </View>
            {step < 3 && (
              <View
                className={cn(
                  'h-0.5 w-6 rounded-full bg-border',
                  currentStep > step && 'bg-primary',
                )}
              />
            )}
          </View>
        ))}
      </View>

      <View className="mb-6 flex-row justify-around">
        {STEP_LABELS.map((label, index) => (
          <Text
            key={label}
            className={cn(
              'font-normal text-muted-foreground',
              currentStep === index + 1 && 'font-bold text-primary',
            )}
          >
            {label}
          </Text>
        ))}
      </View>
    </>
  );
}
