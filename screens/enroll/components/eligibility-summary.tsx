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
      <View className="px-4 pt-8 pb-12 rounded-lg mt-4 bg-secondary dark:bg-secondary-dark">
        <Text className="font-bold text-xl text-primary mb-2">Child is Eligible!</Text>
        <Text className="text-foreground dark:text-background">
          {childName} meets all criteria for SQ-LNS supplementation.
        </Text>
        <TouchableOpacity
          onPress={onGenerateCard}
          className="mt-4 bg-primary py-3 rounded-lg items-center"
        >
          <Text className="font-bold text-background">Enroll & Scan Barcode</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="p-4 rounded-lg mb-4 bg-muted dark:bg-secondary-dark">
      <Text className="font-bold text-lg mb-2 text-warning">Refer to CMAM</Text>
      <Text className="text-foreground dark:text-background">
        {childName || 'This child'} does not meet SQ-LNS criteria.
      </Text>
      <TouchableOpacity onPress={onRefer} className="mt-4 py-3 rounded-lg items-center bg-warning">
        <Text className="font-bold text-warning-foreground">Generate Referral Form</Text>
      </TouchableOpacity>
    </View>
  );
}
