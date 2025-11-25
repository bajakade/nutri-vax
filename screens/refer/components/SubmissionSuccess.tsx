import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { CheckCircle, Printer, Share2 } from 'lucide-react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

import { withOpacity } from '../helpers';

type SubmissionSuccessProps = {
  onNewReferral: () => void;
};

export const SubmissionSuccess = ({ onNewReferral }: SubmissionSuccessProps) => {
  const background = useThemeColor({}, 'background');
  const success = useThemeColor({}, 'success');
  const successForeground = useThemeColor({}, 'successForeground');
  const mutedForeground = useThemeColor({}, 'mutedForeground');
  const successSurface = withOpacity(success, 0.12);
  const successBorder = withOpacity(success, 0.25);

  return (
    <View style={{ flex: 1, backgroundColor: background }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 24, flexGrow: 1 }}>
        <View style={{ maxWidth: 640, width: '100%', alignSelf: 'center' }}>
          <View
            style={{
              padding: 24,
              borderWidth: 1,
              borderColor: successBorder,
              backgroundColor: successSurface,
              borderRadius: 24,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: success,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
                }}
              >
                <CheckCircle size={40} color={successForeground} />
              </View>
              <Text style={{ marginBottom: 8, fontSize: 24, fontWeight: '700', color: success }}>
                Referral Submitted
              </Text>
              <Text
                style={{
                  marginBottom: 32,
                  textAlign: 'center',
                  color: mutedForeground,
                }}
              >
                Referral form has been generated successfully.
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: 12,
                }}
              >
                {[
                  { label: 'Print PDF', icon: Printer },
                  { label: 'Share WhatsApp', icon: Share2 },
                ].map((action) => (
                  <TouchableOpacity
                    key={action.label}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                      paddingHorizontal: 20,
                      paddingVertical: 12,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: success,
                      backgroundColor: background,
                    }}
                    activeOpacity={0.85}
                  >
                    <action.icon size={18} color={success} />
                    <Text style={{ color: success, fontWeight: '600' }}>{action.label}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  onPress={onNewReferral}
                  style={{
                    paddingHorizontal: 24,
                    paddingVertical: 14,
                    borderRadius: 20,
                    backgroundColor: success,
                  }}
                  activeOpacity={0.9}
                >
                  <Text style={{ color: successForeground, fontWeight: '700' }}>New Referral</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
