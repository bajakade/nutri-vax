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
    <ParallaxScrollView>
      <View className="items-center py-6">
        <View className="flex-row items-center mb-3">
          <Icon name="calendar-alt" size={16} color="#666" />
          <Text className="ml-2 text-base text-muted-foreground">{today}</Text>
        </View>

        <View className="flex-row items-center mb-2">
          <Icon name="map-marker-alt" size={22} color="hsl(var(--primary))" />
          <Text className="ml-2 text-lg font-semibold text-primary">
            {user?.facility || 'Afunori PHCC'}
          </Text>
        </View>

        <Text className="text-base text-muted-foreground">
          {user?.lga || 'Nguru'} LGA, Yobe State
        </Text>
      </View>

      <View className="max-w-md px-5 mx-auto">
        {/* Enrol New Child */}
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/enroll')}
          activeOpacity={0.9}
          className="items-center px-20 py-16 mb-6 shadow-xl bg-primary rounded-3xl shadow-black/20"
        >
          <View className="p-6 mb-4 rounded-full bg-primary-foreground">
            <Icon name="user-plus" size={36} color="hsl(var(--primary))" />
          </View>
          <Text className="px-8 text-xl font-semibold text-center text-primary-foreground">
            Scan to Enrol New Child
          </Text>
          <Text className="mt-2 text-sm text-primary-foreground/80">Register new beneficiary</Text>
        </TouchableOpacity>

        {/* Monthly Visit */}
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/visit')}
          activeOpacity={0.9}
          className="items-center px-20 py-16 shadow-xl bg-accent rounded-3xl shadow-black/20"
        >
          <View className="p-6 mb-4 rounded-full bg-primary-foreground">
            <Icon name="barcode" size={40} color="hsl(var(--accent))" />
          </View>
          <Text className="px-8 text-xl font-semibold text-center text-accent-foreground">
            Scan for Monthly Visit
          </Text>
          <Text className="mt-2 text-sm text-accent-foreground/80">
            Record attendance & distribute
          </Text>
        </TouchableOpacity>
      </View>

      <View className="items-center my-10">
        <Text className="text-base text-muted-foreground">
          Health Worker: {user?.name || 'Amina Musa'}
        </Text>
      </View>
    </ParallaxScrollView>
  );
}
