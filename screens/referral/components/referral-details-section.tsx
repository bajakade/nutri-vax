import { FACILITIES, REFERRAL_TYPE_OPTIONS } from '@/constants/referral';
import React, { useState } from 'react';
import { ReferralFormData, UpdateReferralForm } from '@/types';
import { Text, TouchableOpacity, View } from 'react-native';

import { ChevronDown } from 'lucide-react-native';
import { Input } from '@/components/ui';
import { SectionCard } from './section-card';
import { useColor } from '@/hooks/use-color';
import { withOpacity } from '../helpers';

type ReferralDetailsSectionProps = {
  formData: ReferralFormData;
  onUpdate: UpdateReferralForm;
  successColor: string;
  successSurface: string;
};

export const ReferralDetailsSection = ({
  formData,
  onUpdate,
  successColor,
  successSurface,
}: ReferralDetailsSectionProps) => {
  const [showToFacility, setShowToFacility] = useState(false);
  const foreground = useColor('foreground');
  const mutedForeground = useColor('mutedForeground');
  const borderColor = useColor('border');
  const card = useColor('card');
  const muted = useColor('muted');
  const mutedSurface = withOpacity(muted, 0.5);

  return (
    <SectionCard
      title="Referral Details"
      accentColor={successColor}
      accentSurface={successSurface}
      contentStyle={{ minHeight: 520 }}
    >
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ marginBottom: 8, fontSize: 14, fontWeight: '500', color: foreground }}>
            From Facility *
          </Text>
          <Input value={formData.fromFacility} editable={false} />
        </View>

        <View style={{ flex: 1, position: 'relative' }}>
          <Text style={{ marginBottom: 8, fontSize: 14, fontWeight: '500', color: foreground }}>
            To Facility *
          </Text>
          <TouchableOpacity
            onPress={() => setShowToFacility(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 18,
              borderWidth: 1,
              borderColor,
              backgroundColor: mutedSurface,
            }}
            activeOpacity={0.85}
          >
            <Text style={{ color: formData.toFacility ? foreground : mutedForeground }}>
              {FACILITIES.find((f) => f.value === formData.toFacility)?.label || 'Select facility'}
            </Text>
            <ChevronDown size={20} color={mutedForeground} />
          </TouchableOpacity>

          {showToFacility && (
            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 72,
                borderRadius: 18,
                borderWidth: 1,
                borderColor,
                backgroundColor: card,
                shadowColor: '#000',
                shadowOpacity: 0.18,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 8 },
                elevation: 6,
                overflow: 'hidden',
              }}
            >
              {FACILITIES.map((f, index) => (
                <TouchableOpacity
                  key={f.value}
                  onPress={() => {
                    onUpdate('toFacility', f.value);
                    setShowToFacility(false);
                  }}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    borderBottomWidth: index === FACILITIES.length - 1 ? 0 : 1,
                    borderColor,
                  }}
                  activeOpacity={0.85}
                >
                  <Text style={{ color: foreground }}>{f.label}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={() => setShowToFacility(false)}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  backgroundColor: mutedSurface,
                }}
                activeOpacity={0.85}
              >
                <Text style={{ textAlign: 'center', fontWeight: '600', color: foreground }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <View>
        <Text style={{ marginBottom: 12, fontSize: 14, fontWeight: '500', color: foreground }}>
          Referral Type *
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {REFERRAL_TYPE_OPTIONS.map((type) => {
            const isSelected = formData.referralType === type.value;
            return (
              <TouchableOpacity
                key={type.value}
                onPress={() => onUpdate('referralType', type.value)}
                style={{
                  flexBasis: '48%',
                  borderWidth: 1,
                  borderColor: isSelected ? successColor : borderColor,
                  backgroundColor: isSelected ? successSurface : card,
                  borderRadius: 20,
                  padding: 16,
                }}
                activeOpacity={0.85}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      borderWidth: 2,
                      borderColor: isSelected ? successColor : mutedForeground,
                      backgroundColor: isSelected ? successSurface : 'transparent',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isSelected && (
                      <View
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: successColor,
                        }}
                      />
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: '600', color: foreground }}>{type.label}</Text>
                    <Text style={{ fontSize: 12, color: mutedForeground }}>{type.desc}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View>
        <Text style={{ marginBottom: 12, fontSize: 14, fontWeight: '500', color: foreground }}>
          Reason for Referral *
        </Text>
        <Input
          multiline
          numberOfLines={4}
          placeholder="Describe the reason for referral..."
          value={formData.reason}
          onChangeText={(text: string) => onUpdate('reason', text)}
          style={{
            paddingVertical: 12,
            minHeight: 96,
            borderRadius: 16,
          }}
        />
      </View>
    </SectionCard>
  );
};
