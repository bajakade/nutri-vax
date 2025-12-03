import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { ChevronDown } from 'lucide-react-native';

import { Input } from '@/components/ui/input';
import { FACILITIES, REFERRAL_TYPE_OPTIONS } from '@/constants/referral';
import { cn } from '@/lib/utils';
import { ReferralFormData } from '@/types';

import { UpdateReferralForm } from '../helpers';
import { SectionCard } from './section-card';

type ReferralDetailsSectionProps = {
  formData: ReferralFormData;
  onUpdate: UpdateReferralForm;
};

export const ReferralDetailsSection = ({ formData, onUpdate }: ReferralDetailsSectionProps) => {
  const [showToFacility, setShowToFacility] = useState(false);

  return (
    <SectionCard title="Referral Details" contentClassName="min-h-[520px]">
      <View className="flex-row gap-4">
        <View className="flex-1">
          <Text className="mb-2 text-sm font-medium text-foreground">From Facility *</Text>
          <Input value={formData.fromFacility} editable={false} />
        </View>

        <View className="relative flex-1">
          <Text className="mb-2 text-sm font-medium text-foreground">To Facility *</Text>
          <TouchableOpacity
            onPress={() => setShowToFacility(true)}
            className="flex-row items-center justify-between rounded-2xl border border-border bg-muted/60 px-4 py-3"
            activeOpacity={0.85}
          >
            <Text
              className={cn('text-foreground', !formData.toFacility && 'text-muted-foreground')}
            >
              {FACILITIES.find((f) => f.value === formData.toFacility)?.label || 'Select facility'}
            </Text>
            <ChevronDown size={20} color="#64748B" />
          </TouchableOpacity>

          {showToFacility && (
            <View className="absolute left-0 right-0 top-[72px] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/20">
              {FACILITIES.map((f, index) => (
                <TouchableOpacity
                  key={f.value}
                  onPress={() => {
                    onUpdate('toFacility', f.value);
                    setShowToFacility(false);
                  }}
                  className={cn(
                    'px-5 py-4 border-b border-border',
                    index === FACILITIES.length - 1 && 'border-b-0',
                  )}
                  activeOpacity={0.85}
                >
                  <Text className="text-foreground">{f.label}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={() => setShowToFacility(false)}
                className="bg-muted/40 px-5 py-4"
                activeOpacity={0.85}
              >
                <Text className="text-center font-semibold text-foreground">Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <View>
        <Text className="mb-3 text-sm font-medium text-foreground">Referral Type *</Text>
        <View className="flex-row flex-wrap gap-3">
          {REFERRAL_TYPE_OPTIONS.map((type) => {
            const isSelected = formData.referralType === type.value;
            return (
              <TouchableOpacity
                key={type.value}
                onPress={() => onUpdate('referralType', type.value)}
                className={cn(
                  'w-[48%] rounded-2xl border px-4 py-4',
                  isSelected ? 'border-success bg-success/10' : 'border-border bg-card',
                )}
                activeOpacity={0.85}
              >
                <View className="flex-row items-center gap-3">
                  <View
                    className={cn(
                      'h-6 w-6 items-center justify-center rounded-full border-2',
                      isSelected
                        ? 'border-success bg-success/10'
                        : 'border-muted-foreground/40 bg-transparent',
                    )}
                  >
                    {isSelected && <View className="h-2.5 w-2.5 rounded-full bg-success" />}
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold text-foreground">{type.label}</Text>
                    <Text className="text-xs text-muted-foreground">{type.desc}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View>
        <Text className="mb-3 text-sm font-medium text-foreground">Reason for Referral *</Text>
        <Input
          multiline
          numberOfLines={4}
          placeholder="Describe the reason for referral..."
          value={formData.reason}
          onChangeText={(text: string) => onUpdate('reason', text)}
          className="min-h-[96px] rounded-2xl py-3"
        />
      </View>
    </SectionCard>
  );
};
