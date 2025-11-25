import React from 'react';
import { Text, View } from 'react-native';

import { Award, CheckCircle } from 'lucide-react-native';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TOTAL_VISITS } from '@/constants/distribution';

import { ChildRecord, getMUACColorClass } from '../helpers';

type ChildCardProps = {
  child: ChildRecord;
  onDistribute: (child: ChildRecord) => void;
};

export const ChildCard = ({ child, onDistribute }: ChildCardProps) => {
  return (
    <View className="p-5 my-2 border shadow-sm bg-card rounded-2xl border-border">
      <View className="flex-row gap-4">
        <View className="items-center justify-center w-12 h-12 rounded-full bg-success/10">
          <Text className="text-xl">{child.photo}</Text>
        </View>

        <View className="flex-1">
          <View className="flex-row items-start justify-between mb-2">
            <View>
              <Text className="font-semibold text-foreground">{child.name}</Text>
              <Text className="text-sm text-muted-foreground">{child.serial}</Text>
            </View>
            <View className={`w-7 h-7 rounded-full ${getMUACColorClass(child.muac)}`} />
          </View>

          <View className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <Text className="text-muted-foreground">
              Age: <Text className="text-foreground">{child.age} years</Text>
            </Text>
            <Text className="text-muted-foreground">
              MUAC: <Text className="text-foreground">{child.muac}mm</Text>
            </Text>
            <Text className="text-muted-foreground">
              Visits: <Text className="text-foreground">{child.visits}/12</Text>
            </Text>
            <Text className="text-muted-foreground">
              Last: <Text className="text-foreground">{child.lastVisit}</Text>
            </Text>
          </View>

          <View className="flex-row flex-wrap gap-2 mb-4">
            {Array.from({ length: TOTAL_VISITS }).map((_, i) => (
              <View
                key={i}
                className={`w-9 h-9 rounded-lg border items-center justify-center ${
                  i < child.visits
                    ? 'bg-success/10 border-success text-success'
                    : 'bg-muted border-border text-muted-foreground'
                }`}
              >
                <Text className="text-xs font-medium">{i + 1}</Text>
              </View>
            ))}
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
