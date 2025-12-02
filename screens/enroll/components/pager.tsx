import { Text, TouchableOpacity, View } from 'react-native';

import { useColor } from '@/hooks/use-color';

interface Props {
  step: number;
  handleNext: () => void;
  handleBack: () => void;
}
export function Pager({ step, handleBack, handleNext }: Props) {
  const primary = useColor('primary');
  const primaryForeground = useColor('primaryForeground');
  const card = useColor('card');

  return (
    <View className="flex-row justify-between my-4">
      {step > 1 && (
        <TouchableOpacity
          onPress={handleBack}
          className="flex-1 mr-2 border-2 py-3 rounded-lg items-center"
          style={{
            backgroundColor: card,
            borderColor: primary,
          }}
        >
          <Text className="font-bold" style={{ color: primary }}>
            Back
          </Text>
        </TouchableOpacity>
      )}
      {step < 3 && (
        <TouchableOpacity
          onPress={handleNext}
          className="flex-1 py-3 rounded-lg items-center"
          style={{
            marginLeft: step > 1 ? 8 : 0,
            backgroundColor: primary,
          }}
        >
          <Text className="font-bold" style={{ color: primaryForeground }}>
            Next
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
