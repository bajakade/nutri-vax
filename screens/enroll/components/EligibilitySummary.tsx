import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
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
  const primary = useThemeColor({}, 'primary');
  const primaryForeground = useThemeColor({}, 'primaryForeground');
  const successContainerBg = useThemeColor({ light: '#e8f5e9', dark: '#03291c' }, 'secondary');
  const referContainerBg = useThemeColor({ light: '#fff3cd', dark: '#1f2937' }, 'muted');
  const warning = useThemeColor({}, 'warning');
  const warningForeground = useThemeColor({}, 'warningForeground');
  const foreground = useThemeColor({}, 'foreground');

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
