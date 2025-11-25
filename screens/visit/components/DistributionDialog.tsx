import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { AlertTriangle, CheckCircle } from 'lucide-react-native';

import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { SACHETS, TOTAL_VISITS } from '@/constants/distribution';
import { Colors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

import { ChildRecord, MUACColorToken, getMUACColorToken } from '../helpers';

type DistributionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  child: ChildRecord | null;
  muacUpdate: string;
  onMuacChange: (value: string) => void;
  sachets: string;
  onSachetsChange: (value: string) => void;
  emptySachets: string;
  onEmptySachetsChange: (value: string) => void;
  vaccineUpdated: boolean;
  onToggleVaccine: () => void;
  onSubmit: () => void;
};

const MUAC_THEME_KEYS: Record<
  MUACColorToken,
  keyof typeof Colors.light & keyof typeof Colors.dark
> = {
  success: 'success',
  warning: 'warning',
  destructive: 'destructive',
};

export const DistributionDialog = ({
  open,
  onOpenChange,
  child,
  muacUpdate,
  onMuacChange,
  sachets,
  onSachetsChange,
  emptySachets,
  onEmptySachetsChange,
  vaccineUpdated,
  onToggleVaccine,
  onSubmit,
}: DistributionDialogProps) => {
  const surface = useThemeColor({}, 'neutralSurface');
  const card = useThemeColor({}, 'neutralCard');
  const elevated = useThemeColor({}, 'neutralElevated');
  const border = useThemeColor({}, 'border');
  const borderStrong = useThemeColor({}, 'neutralBorderStrong');
  const accent = useThemeColor({}, 'neutralAccent');
  const accentInverse = useThemeColor({}, 'neutralAccentInverse');
  const muted = useThemeColor({}, 'neutralMuted');
  const foreground = useThemeColor({}, 'foreground');
  const mutedForeground = useThemeColor({}, 'mutedForeground');
  const background = useThemeColor({}, 'background');
  const muacValue = Number.parseInt(muacUpdate, 10);
  const normalizedMuac = Number.isNaN(muacValue) ? 0 : muacValue;
  const muacToken = getMUACColorToken(normalizedMuac);
  const muacColor = useThemeColor({}, MUAC_THEME_KEYS[muacToken]);
  const inputStyle = {
    backgroundColor: background,
    borderColor: border,
    color: foreground,
  };

  const renderActionButton = (label: string, opts: { filled?: boolean; onPress: () => void }) => (
    <TouchableOpacity
      onPress={opts.onPress}
      activeOpacity={0.85}
      className="flex-1 items-center rounded-[22px] border py-3.5"
      style={{
        borderColor: opts.filled ? accent : border,
        backgroundColor: opts.filled ? accent : 'transparent',
      }}
    >
      <Text
        className="text-[15px] font-semibold"
        style={{ color: opts.filled ? accentInverse : foreground }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <View>
        <DialogClose onPress={() => onOpenChange(false)} />

        <DialogContent>
          <View
            className="space-y-8 rounded-[32px] border px-6 pt-7 pb-8"
            style={{ backgroundColor: surface, borderColor: border }}
          >
            <View className="space-y-1">
              <Text className="text-[20px] font-bold mb-2" style={{ color: foreground }}>
                Record Distribution
              </Text>
              <Text className="text-[13px] mb-2" style={{ color: mutedForeground }}>
                Daily SQ-LNS log
              </Text>
            </View>

            {child && (
              <ScrollView className="max-h-[70vh]" showsVerticalScrollIndicator={false}>
                <View className="pb-2 space-y-6">
                  <View
                    className="space-y-4 rounded-[22px] border p-5"
                    style={{ backgroundColor: card, borderColor: border }}
                  >
                    <View className="flex-row items-center gap-4">
                      <View
                        className="h-[54px] w-[54px] items-center justify-center rounded-full border"
                        style={{ backgroundColor: elevated, borderColor: border }}
                      >
                        <Text className="text-2xl" style={{ color: foreground }}>
                          {child.photo}
                        </Text>
                      </View>
                      <View className="flex-1 my-2">
                        <Text className="text-lg font-semibold" style={{ color: foreground }}>
                          {child.name}
                        </Text>
                        <Text className="text-sm" style={{ color: mutedForeground }}>
                          {child.serial}
                        </Text>
                      </View>
                      <View
                        className="min-w-[88px] items-center my-2 rounded-2xl border px-3 py-2"
                        style={{ borderColor: border, backgroundColor: background }}
                      >
                        <Text className="text-xs font-semibold" style={{ color: foreground }}>
                          Visit {child.visits + 1}
                        </Text>
                        <Text className="text-[11px]" style={{ color: mutedForeground }}>
                          of {TOTAL_VISITS}
                        </Text>
                      </View>
                    </View>
                    <View
                      className="w-full h-px my-2 opacity-70"
                      style={{ backgroundColor: border }}
                    />
                    <Text className="text-xs leading-5" style={{ color: muted }}>
                      Keep anthropometric updates consistent and monochrome for quick stamping.
                    </Text>
                  </View>

                  <View className="mt-3 space-y-3">
                    <Text
                      className="text-[13px] mb-2 font-semibold uppercase tracking-[0.7px]"
                      style={{ color: foreground }}
                    >
                      MUAC Update (mm)
                    </Text>
                    <View className="flex-row items-center gap-3">
                      <Input
                        keyboardType="numeric"
                        value={muacUpdate}
                        onChangeText={onMuacChange}
                        placeholder="e.g. 118"
                        style={inputStyle}
                      />
                      <View
                        className="w-10 h-10 border rounded-full"
                        style={{
                          borderColor: border,
                          backgroundColor: muacUpdate ? muacColor : elevated,
                        }}
                      />
                    </View>
                  </View>

                  <View className="mt-3 space-y-3 ">
                    <Text
                      className="mb-2 text-[13px] font-semibold uppercase tracking-[0.7px]"
                      style={{ color: foreground }}
                    >
                      Sachets to Issue
                    </Text>
                    <Input
                      keyboardType="numeric"
                      value={sachets}
                      onChangeText={onSachetsChange}
                      style={inputStyle}
                    />
                    <View className="gap-1 mt-2">
                      <Text className="text-[11px]" style={{ color: mutedForeground }}>
                        Standard: {SACHETS.STANDARD} sachets
                      </Text>
                      <Text className="text-[11px]" style={{ color: mutedForeground }}>
                        Access issues: {SACHETS.ACCESS_ISSUES} sachets
                      </Text>
                    </View>
                  </View>

                  <View className="mt-3 space-y-3">
                    <Text
                      className="text-[13px] mb-2 font-semibold uppercase tracking-[0.7px]"
                      style={{ color: foreground }}
                    >
                      Empty Sachets Returned
                    </Text>
                    <Input
                      keyboardType="numeric"
                      value={emptySachets}
                      onChangeText={onEmptySachetsChange}
                      placeholder="Count returned"
                      style={inputStyle}
                    />
                  </View>

                  <TouchableOpacity
                    onPress={onToggleVaccine}
                    className="flex-row items-center gap-3 pt-3 mb-2"
                  >
                    <View
                      className="h-6 w-6 items-center justify-center rounded-[10px] border"
                      style={{
                        borderColor: vaccineUpdated ? accent : border,
                        backgroundColor: vaccineUpdated ? accent : background,
                      }}
                    >
                      {vaccineUpdated && <CheckCircle size={16} color={accentInverse} />}
                    </View>
                    <Text style={{ color: foreground }}>Vaccine updated today</Text>
                  </TouchableOpacity>

                  <View
                    className="flex-row gap-3 rounded-[18px] border p-4"
                    style={{ borderColor: borderStrong, backgroundColor: elevated }}
                  >
                    <View
                      className="h-[34px] w-[34px] items-center justify-center rounded-full"
                      style={{ backgroundColor: accent }}
                    >
                      <AlertTriangle size={18} color={accentInverse} />
                    </View>
                    <View className="flex-1 mb-2">
                      <Text className="text-sm font-semibold" style={{ color: foreground }}>
                        Counseling Points
                      </Text>
                      <Text className="mt-1 text-xs leading-5" style={{ color: foreground }}>
                        • 1 sachet per day (20g)
                        {'\n'}• Mix with porridge
                        {'\n'}• Report adverse reactions
                      </Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
            )}

            <View className="flex-row gap-4">
              {renderActionButton('Cancel', { onPress: () => onOpenChange(false) })}
              {renderActionButton('Confirm & Stamp', { filled: true, onPress: onSubmit })}
            </View>
          </View>
        </DialogContent>
      </View>
    </Dialog>
  );
};
