import { Text, TouchableOpacity, View } from 'react-native';

import { Eligibility } from '@/types/enum';
import React from 'react';

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
      <View className="p-4 mb-4 rounded-xl bg-secondary">
        <Text className="mb-2 text-lg font-bold text-primary">Child is Eligible!</Text>
        <Text className="text-foreground">
          {childName} meets all criteria for SQ-LNS supplementation.
        </Text>
        <TouchableOpacity
          onPress={onGenerateCard}
          className="items-center py-3 mt-4 rounded-xl bg-primary"
        >
          <Text className="font-bold text-primary-foreground">
            Enrol & Generate NutriVax Barcode
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="p-4 mb-4 rounded-xl bg-muted">
      <Text className="mb-2 text-lg font-bold text-warning">Refer to CMAM</Text>
      <Text className="text-foreground">
        {childName || 'This child'} does not meet SQ-LNS criteria.
      </Text>
      <TouchableOpacity onPress={onRefer} className="items-center py-3 mt-4 rounded-xl bg-warning">
        <Text className="font-bold text-warning-foreground">Generate Referral Form</Text>
      </TouchableOpacity>
    </View>
  );
}
