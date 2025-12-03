import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { CheckCircle, Printer, Share2 } from 'lucide-react-native';

import { useColor } from '@/hooks/use-color';

type SubmissionSuccessProps = {
  onNewReferral: () => void;
};

export const SubmissionSuccess = ({ onNewReferral }: SubmissionSuccessProps) => {
  const success = useColor('success');
  const successForeground = useColor('successForeground');

  return (
    <View className="flex-1 bg-background">
      <View className="flex-grow px-4 pt-6">
        <View className="w-full max-w-[640px] self-center">
          <View className="rounded-3xl border border-success/30 bg-success/10 p-6">
            <View className="items-center">
              <View className="mb-6 h-20 w-20 items-center justify-center rounded-full bg-success">
                <CheckCircle size={40} color={successForeground} />
              </View>
              <Text className="mb-2 text-2xl font-bold text-success">Referral Submitted</Text>
              <Text className="mb-8 text-center text-muted-foreground">
                Referral form has been generated successfully.
              </Text>

              <View className="flex-row flex-wrap justify-center gap-3">
                {[
                  { label: 'Print PDF', icon: Printer },
                  { label: 'Share WhatsApp', icon: Share2 },
                ].map((action) => (
                  <TouchableOpacity
                    key={action.label}
                    className="flex-row items-center gap-2 rounded-[20px] border border-success bg-background px-5 py-3"
                    activeOpacity={0.85}
                  >
                    <action.icon size={18} color={success} />
                    <Text className="font-semibold text-success">{action.label}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  onPress={onNewReferral}
                  className="rounded-[20px] bg-success px-6 py-3.5"
                  activeOpacity={0.9}
                >
                  <Text className="font-bold text-success-foreground">New Referral</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
