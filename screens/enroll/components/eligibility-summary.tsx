import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Eligibility } from '@/types/enum';

type EligibilitySummaryProps = {
  eligibility: Eligibility;
  childName: string;
  onGenerateCard: () => void;
  onRefer: () => void;
};

export function EligibilitySummary({
  eligibility,
  childName,
  onGenerateCard,
  onRefer,
}: EligibilitySummaryProps) {
  if (eligibility === Eligibility.Eligible) {
    return (
      <View className="mb-4 rounded-xl bg-secondary p-4">
        <Text className="mb-2 text-lg font-bold text-primary">Child is Eligible!</Text>
        <Text className="text-foreground">
          {childName} meets all criteria for SQ-LNS supplementation.
        </Text>
        <TouchableOpacity
          onPress={onGenerateCard}
          className="mt-4 items-center rounded-xl bg-primary py-3"
        >
          <Text className="font-bold text-primary-foreground">
            Enrol & Generate NutriVax Barcode
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="mb-4 rounded-xl bg-muted p-4">
      <Text className="mb-2 text-lg font-bold text-warning">Refer to CMAM</Text>
      <Text className="text-foreground">
        {childName || 'This child'} does not meet SQ-LNS criteria.
      </Text>
      <TouchableOpacity onPress={onRefer} className="mt-4 items-center rounded-xl bg-warning py-3">
        <Text className="font-bold text-warning-foreground">Generate Referral Form</Text>
      </TouchableOpacity>
    </View>
  );
}
