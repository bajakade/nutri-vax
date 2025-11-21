// app/(tabs)/coming-soon.tsx   or any other route
import React from 'react';
import { View, Text } from 'react-native';

const EnrollChild = () => {
  return (
    <View className="items-center justify-center flex-1 px-8 bg-background">
      <View className="items-center">
        <Text className="mb-4 text-4xl font-bold text-center text-foreground">Coming Soon</Text>

        <Text className="text-lg leading-7 text-center text-muted-foreground">
          This feature is under development{'\n'}and will be available very soon.
        </Text>

        <Text className="mt-8 text-sm text-center text-muted-foreground/70">Stay tuned!</Text>
      </View>
    </View>
  );
};

export default EnrollChild;
