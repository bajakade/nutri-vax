import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { CheckCircle, Printer, Share2 } from 'lucide-react-native';

import { useColor } from '@/hooks/use-color';

import { withOpacity } from '../helpers';

type SubmissionSuccessProps = {
  onNewReferral: () => void;
};

export const SubmissionSuccess = ({ onNewReferral }: SubmissionSuccessProps) => {
  const background = useColor('background');
  const success = useColor('success');
  const successForeground = useColor('successForeground');
  const mutedForeground = useColor('mutedForeground');
  const successSurface = withOpacity(success, 0.12);
  const successBorder = withOpacity(success, 0.25);

  return (
    <View className="flex-1" style={{ backgroundColor: background }}>
      <View className="flex-grow px-4 pt-6">
        <View className="w-full max-w-[640px] self-center">
          <View
            className="rounded-3xl border p-6"
            style={{
              borderColor: successBorder,
              backgroundColor: successSurface,
            }}
          >
            <View className="items-center">
              <View
                className="mb-6 h-20 w-20 items-center justify-center rounded-full"
                style={{ backgroundColor: success }}
              >
                <CheckCircle size={40} color={successForeground} />
              </View>
              <Text className="mb-2 text-2xl font-bold" style={{ color: success }}>
                Referral Submitted
              </Text>
              <Text className="mb-8 text-center" style={{ color: mutedForeground }}>
                Referral form has been generated successfully.
              </Text>

              <View className="flex-row flex-wrap justify-center gap-3">
                {[
                  { label: 'Print PDF', icon: Printer },
                  { label: 'Share WhatsApp', icon: Share2 },
                ].map((action) => (
                  <TouchableOpacity
                    key={action.label}
                    className="flex-row items-center gap-2 rounded-[20px] border px-5 py-3"
                    style={{
                      borderColor: success,
                      backgroundColor: background,
                    }}
                    activeOpacity={0.85}
                  >
                    <action.icon size={18} color={success} />
                    <Text className="font-semibold" style={{ color: success }}>
                      {action.label}
                    </Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  onPress={onNewReferral}
                  className="rounded-[20px] px-6 py-3.5"
                  style={{ backgroundColor: success }}
                  activeOpacity={0.9}
                >
                  <Text className="font-bold" style={{ color: successForeground }}>
                    New Referral
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
