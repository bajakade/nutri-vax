import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useColor } from '@/hooks/use-color';
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
  const primary = useColor('primary');
  const primaryForeground = useColor('primaryForeground');
  const successContainerBg = useColor('secondary');
  const referContainerBg = useColor('muted');
  const warning = useColor('warning');
  const warningForeground = useColor('warningForeground');
  const foreground = useColor('foreground');

  if (eligibility === Eligibility.Eligible) {
    return (
      <View
        style={{
          backgroundColor: successContainerBg,
          padding: 16,
          borderRadius: 12,
          marginBottom: 16,
        }}
      >
        <Text style={{ fontWeight: '700', fontSize: 18, color: primary, marginBottom: 8 }}>
          Child is Eligible!
        </Text>
        <Text style={{ color: foreground }}>
          {childName} meets all criteria for SQ-LNS supplementation.
        </Text>
        <TouchableOpacity
          onPress={onGenerateCard}
          style={{
            marginTop: 16,
            backgroundColor: primary,
            paddingVertical: 12,
            borderRadius: 12,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: primaryForeground, fontWeight: '700' }}>
            Enrol & Generate NutriVax Barcode
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: referContainerBg,
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
      }}
    >
      <Text style={{ fontWeight: '700', fontSize: 18, color: warning, marginBottom: 8 }}>
        Refer to CMAM
      </Text>
      <Text style={{ color: foreground }}>
        {childName || 'This child'} does not meet SQ-LNS criteria.
      </Text>
      <TouchableOpacity
        onPress={onRefer}
        style={{
          marginTop: 16,
          backgroundColor: warning,
          paddingVertical: 12,
          borderRadius: 12,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: warningForeground, fontWeight: '700' }}>Generate Referral Form</Text>
      </TouchableOpacity>
    </View>
  );
}
