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
      <View className="px-4 pt-8 pb-12 mt-4 rounded-lg bg-secondary dark:bg-secondary-dark">
        <Text className="mb-2 text-xl font-bold text-primary">Child is Eligible!</Text>
        <Text className="text-foreground dark:text-background">
          {childName} meets all criteria for SQ-LNS supplementation.
        </Text>
        <TouchableOpacity
          onPress={onGenerateCard}
          className="items-center py-3 mt-4 rounded-lg bg-primary"
        >
          <Text className="font-bold text-background">Enroll & Scan Barcode</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="p-4 mb-4 rounded-lg bg-muted dark:bg-secondary-dark">
      <Text className="mb-2 text-lg font-bold text-warning">Refer to CMAM</Text>
      <Text className="text-foreground dark:text-background">
        {childName || 'This child'} does not meet SQ-LNS criteria.
      </Text>
      <TouchableOpacity onPress={onRefer} className="items-center py-3 mt-4 rounded-lg bg-warning">
        <Text className="font-bold text-warning-foreground">Generate Referral Form</Text>
      </TouchableOpacity>
    </View>
  );
}
