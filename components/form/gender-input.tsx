import { ChildInformationSectionProps, Gender } from '@/types';
import { Text, TouchableOpacity, View } from 'react-native';

import { cn } from '@/lib/utils';

export default function GenderInput({ formData, onUpdate }: ChildInformationSectionProps) {
  return (
    <View>
      <Text className="mb-2 text-sm font-medium text-foreground">Sex *</Text>
      <View className="flex-row items-center gap-6">
        {([Gender.Male, Gender.Female] as const).map((sex) => (
          <TouchableOpacity
            key={sex}
            onPress={() => onUpdate('sex', sex)}
            className="flex-row items-center gap-3"
            activeOpacity={0.85}
          >
            <View
              className={cn(
                'w-6 h-6 rounded-full border-2 items-center justify-center',
                formData.sex === sex
                  ? 'border-success bg-success/20'
                  : 'border-muted-foreground/40 bg-transparent',
              )}
            >
              {formData.sex === sex && <View className="w-2 h-2 rounded-full bg-success" />}
            </View>
            <Text className="text-foreground">{sex === Gender.Male ? 'Male' : 'Female'}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
