import ParallaxScrollView from '@/components/parallax-scroll-view';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Dashboard({ user }: { user?: any }) {
  const router = useRouter();
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
      <ParallaxScrollView headerBackgroundColor={{ light: '#fff', dark: '#004d00' }}>
        <View className="items-center py-6">
        <View className="flex-row items-center mb-3">
          <Icon name="calendar-alt" size={16} color="#666" />
          <Text className="text-muted-foreground text-base ml-2">{today}</Text>
        </View>

        <View className="flex-row items-center mb-2">
          <Icon name="map-marker-alt" size={22} color="hsl(var(--primary))" />
          <Text className="text-primary text-lg font-semibold ml-2">
            {user?.facility || 'Afunori PHCC'}
          </Text>
        </View>

        <Text className="text-muted-foreground text-base">
          {user?.lga || 'Nguru'} LGA, Yobe State
        </Text>
      </View>

      <View className="px-5 max-w-md mx-auto">
        {/* Enrol New Child */}
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/enroll')}
          activeOpacity={0.9}
          className="bg-primary rounded-3xl py-16 px-20 items-center mb-6 shadow-xl shadow-black/20"
        >
          <View className="bg-primary-foreground rounded-full p-6 mb-4">
            <Icon name="user-plus" size={36} color="hsl(var(--primary))" />
          </View>
          <Text className="text-primary-foreground text-xl font-semibold px-8 text-center">
            Scan to Enrol New Child
          </Text>
          <Text className="text-primary-foreground/80 text-sm mt-2">
            Register new beneficiary
          </Text>
        </TouchableOpacity>

        {/* Monthly Visit */}
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/visit')}
          activeOpacity={0.9}
          className="bg-accent rounded-3xl py-16 px-20 items-center shadow-xl shadow-black/20"
        >
          <View className="bg-primary-foreground rounded-full p-6 mb-4">
            <Icon name="barcode" size={40} color="hsl(var(--accent))" />
          </View>
          <Text className="text-accent-foreground text-xl font-semibold px-8 text-center">
            Scan for Monthly Visit
          </Text>
          <Text className="text-accent-foreground/80 text-sm mt-2">
            Record attendance & distribute
          </Text>
        </TouchableOpacity>
      </View>

        <View className="items-center my-10">
        <Text className="text-muted-foreground text-base">
          Health Worker: {user?.name || 'Amina Musa'}
        </Text>
        </View>
      </ParallaxScrollView>
  );
}