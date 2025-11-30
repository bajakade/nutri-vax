import { ChildInformationSectionProps, Gender } from '@/types';
import { Text, TouchableOpacity, View } from 'react-native';

import { useColor } from '@/hooks/use-color';

interface Props extends ChildInformationSectionProps {}
export default function GenderInput({ formData, onUpdate, successColor, successSurface }: Props) {
  const foreground = useColor('foreground');
  const mutedForeground = useColor('mutedForeground');

  return (
    <View>
      <Text className="mb-2 text-sm font-medium" style={{ color: foreground }}>
        Sex *
      </Text>
      <View className="flex-row items-center gap-6">
        {([Gender.Male, Gender.Female] as const).map((sex) => (
          <TouchableOpacity
            key={sex}
            onPress={() => onUpdate('sex', sex)}
            className="flex-row items-center gap-3"
            activeOpacity={0.85}
          >
            <View
              className="w-6 h-6 rounded-full border-2 items-center justify-center"
              style={{
                borderColor: formData.sex === sex ? successColor : mutedForeground,
                backgroundColor: formData.sex === sex ? successSurface : 'transparent',
              }}
            >
              {formData.sex === sex && (
                <View className="w-2 h-2 roundef-full" style={{ backgroundColor: successColor }} />
              )}
            </View>
            <Text style={{ color: foreground }}>{sex === Gender.Male ? 'Male' : 'Female'}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
