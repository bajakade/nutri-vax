import React from 'react';
import { Text, View } from 'react-native';

import { Award, CheckCircle } from 'lucide-react-native';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TOTAL_VISITS } from '@/constants/distribution';
import { useThemeColor } from '@/hooks/use-theme-color';

import { ChildRecord, getMUACColorToken, withOpacity } from '../helpers';

type ChildCardProps = {
  child: ChildRecord;
  onDistribute: (child: ChildRecord) => void;
};

export const ChildCard = ({ child, onDistribute }: ChildCardProps) => {
  const card = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const foreground = useThemeColor({}, 'foreground');
  const mutedForeground = useThemeColor({}, 'mutedForeground');
  const success = useThemeColor({}, 'success');
  const successSurface = withOpacity(success, 0.12);
  const muted = useThemeColor({}, 'muted');
  const mutedSurface = withOpacity(muted, 0.5);
  const muacToken = getMUACColorToken(child.muac);
  const muacColor = useThemeColor({}, muacToken);

  return (
    <View
      className="p-5 my-2 border shadow-sm rounded-2xl"
      style={{ backgroundColor: card, borderColor: border }}
    >
      <View className="flex-row gap-4">
        <View
          className="items-center justify-center w-12 h-12 rounded-full"
          style={{ backgroundColor: successSurface }}
        >
          <Text className="text-xl">{child.photo}</Text>
        </View>

        <View className="flex-1">
          <View className="flex-row items-start justify-between mb-2">
            <View>
              <Text className="font-semibold" style={{ color: foreground }}>
                {child.name}
              </Text>
              <Text className="text-sm" style={{ color: mutedForeground }}>
                {child.serial}
              </Text>
            </View>
            <View className="w-7 h-7 rounded-full" style={{ backgroundColor: muacColor }} />
          </View>

          <View className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <Text style={{ color: mutedForeground }}>
              Age: <Text style={{ color: foreground }}>{child.age} years</Text>
            </Text>
            <Text style={{ color: mutedForeground }}>
              MUAC: <Text style={{ color: foreground }}>{child.muac}mm</Text>
            </Text>
            <Text style={{ color: mutedForeground }}>
              Visits: <Text style={{ color: foreground }}>{child.visits}/12</Text>
            </Text>
            <Text style={{ color: mutedForeground }}>
              Last: <Text style={{ color: foreground }}>{child.lastVisit}</Text>
            </Text>
          </View>

          <View className="flex-row flex-wrap gap-2 mb-4">
            {Array.from({ length: TOTAL_VISITS }).map((_, index) => {
              const isCompleted = index < child.visits;

              return (
                <View
                  key={index}
                  className="w-9 h-9 rounded-lg border items-center justify-center"
                  style={{
                    backgroundColor: isCompleted ? successSurface : mutedSurface,
                    borderColor: isCompleted ? success : border,
                  }}
                >
                  <Text
                    className="text-xs font-medium"
                    style={{ color: isCompleted ? success : mutedForeground }}
                  >
                    {index + 1}
                  </Text>
                </View>
              );
            })}
          </View>

          <View className="flex-row flex-wrap w-full gap-2 mb-4">
            {child.vaccineStatus === 'up-to-date' && (
              <Badge variant="secondary" icon={<CheckCircle size={12} />}>
                Vaccine Up-to-date
              </Badge>
            )}
            {child.vaccineStatus === 'updated-today' && (
              <Badge variant="default" icon={<CheckCircle size={12} />}>
                Updated Today
              </Badge>
            )}
            {child.visits >= TOTAL_VISITS - 1 && (
              <Badge variant="default" icon={<Award size={12} />}>
                Near Graduation
              </Badge>
            )}
          </View>

          <View className="flex-row flex-wrap w-full gap-3">
            <Button
              size="sm"
              onPress={() => {
                onDistribute(child);
              }}
            >
              Distribute
            </Button>
            {child.visits >= TOTAL_VISITS - 1 && (
              <Button size="sm" variant="outline">
                Graduate
              </Button>
            )}
            <Button size="sm" variant="outline">
              Refer SAM/MAM
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};
