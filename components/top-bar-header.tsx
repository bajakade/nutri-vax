import React from 'react';
import { View, Text } from 'react-native';

export default function TopBarHeader() {
  return (
    <View className="h-14 flex-row items-center justify-start gap-2 bg-background border-b border-border px-4">
      <View className="w-7 h-7 bg-primary rounded-full justify-center items-center">
        <Text className="text-primary-foreground text-sm font-bold">NV</Text>
      </View>

      <Text className="text-primary text-base font-semibold ">NutriVax</Text>
    </View>
  );
}
