import { Text, TouchableOpacity, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { useSelector } from '@/hooks';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useRouter } from 'expo-router';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Dashboard() {
  const router = useRouter();
  const { user } = useSelector((store) => store.auth);
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const background = useThemeColor({}, 'background');
  const foreground = useThemeColor({}, 'foreground');
  const mutedFg = useThemeColor({}, 'mutedForeground');
  const primary = useThemeColor({}, 'primary');
  const primaryFg = useThemeColor({}, 'primaryForeground');
  const accent = useThemeColor({}, 'accent');
  const accentFg = useThemeColor({}, 'accentForeground');
  const cardBg = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');

  return (
    <ParallaxScrollView>
      <View className="items-center py-3" style={{ backgroundColor: background }}>
        <View className="flex-row items-center mb-3" style={{ backgroundColor: background }}>
          <Icon name="calendar-alt" size={16} color={mutedFg} />
          <Text style={{ color: mutedFg }} className="ml-2 text-base">
            {today}
          </Text>
        </View>

        <View className="flex-row items-center mb-2" style={{ backgroundColor: background }}>
          <Icon name="map-marker-alt" size={22} color={primary} />
          <Text style={{ color: primary }} className="ml-2 text-lg font-semibold">
            {user?.facility.name}
          </Text>
        </View>

        <Text style={{ color: mutedFg }} className="text-base">
          Nguru LGA, Yobe State
        </Text>
      </View>

      <View className="max-w-md px-5 mx-auto" style={{ backgroundColor: background }}>
        {/* Enrol New Child */}
        <TouchableOpacity
          onPress={() => router.push('/(protected)/(tabs)/enroll')}
          activeOpacity={0.9}
          className="items-center px-10 py-8 mb-6 shadow-xl rounded-3xl shadow-black/20"
          style={{ backgroundColor: primary, shadowColor: borderColor }}
        >
          <View className="p-6 mb-4 rounded-full" style={{ backgroundColor: primaryFg }}>
            <Icon name="user-plus" size={36} color={primary} />
          </View>
          <Text style={{ color: primaryFg }} className="px-8 text-xl font-semibold text-center">
            Scan to Enrol New Child
          </Text>
          <Text style={{ color: primaryFg, opacity: 0.8 }} className="mt-2 text-sm">
            Register new beneficiary
          </Text>
        </TouchableOpacity>

        {/* Monthly Visit */}
        <TouchableOpacity
          onPress={() => router.push('/(protected)/(tabs)/visit')}
          activeOpacity={0.9}
          className="items-center px-16 py-8 shadow-xl rounded-3xl shadow-black/20"
          style={{ backgroundColor: accent, shadowColor: borderColor }}
        >
          <View className="p-6 mb-4 rounded-full" style={{ backgroundColor: cardBg }}>
            <Icon name="barcode" size={40} color={primary} />
          </View>
          <Text style={{ color: accentFg }} className="px-8 text-xl font-semibold text-center">
            Scan for Monthly Visit
          </Text>
          <Text style={{ color: accentFg, opacity: 0.8 }} className="mt-2 text-sm">
            Record attendance & distribute
          </Text>
        </TouchableOpacity>
      </View>

      <View className="items-center my-5" style={{ backgroundColor: background }}>
        <Text style={{ color: foreground }} className="text-base">
          Health Worker: {user?.username}
        </Text>
      </View>
    </ParallaxScrollView>
  );
}
