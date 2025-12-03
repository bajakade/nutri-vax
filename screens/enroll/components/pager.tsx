import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
  step: number;
  handleNext: () => void;
  handleBack: () => void;
}
export function Pager({ step, handleBack, handleNext }: Props) {
  return (
    <View className="flex-row justify-between my-4">
      {step > 1 && (
        <TouchableOpacity
          onPress={handleBack}
          className="flex-1 mr-2 border-2 py-3 rounded-lg items-center bg-card dark:bg-secondary-dark border-primary"
        >
          <Text className="font-bold text-primary dark:text-primary-foreground">Back</Text>
        </TouchableOpacity>
      )}
      {step < 3 && (
        <TouchableOpacity
          onPress={handleNext}
          className="flex-1 py-3 rounded-lg items-center bg-primary"
          style={{
            marginLeft: step > 1 ? 8 : 0,
          }}
        >
          <Text className="font-bold text-secondary">Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
