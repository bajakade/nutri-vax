import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/haptic-tab';
import TopBarHeader from '@/components/top-bar-header';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const background = useThemeColor({}, 'background');

  return (
    <React.Fragment>
      <SafeAreaView edges={['top']} style={{ backgroundColor: background }}>
        <TopBarHeader />
      </SafeAreaView>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#004d00',
            borderTopWidth: 0,
            height: 56 + (insets.bottom || 0),
            paddingBottom: insets.bottom || 6,
            paddingTop: 6,
          },

          tabBarActiveTintColor: '#00A651',
          tabBarInactiveTintColor: '#C8E6C9',
          tabBarButton: HapticTab,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color }) => <IconSymbol name="house.fill" size={26} color={color} />,
          }}
        />
        <Tabs.Screen
          name="enroll"
          options={{
            title: 'Enroll',
            tabBarIcon: ({ color }) => (
              <IconSymbol name="person.crop.circle.badge.plus" size={26} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="visit"
          options={{
            title: 'Visit',
            tabBarIcon: ({ color }) => (
              <IconSymbol name="barcode.viewfinder" size={26} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="refer"
          options={{
            title: 'Refer',
            tabBarIcon: ({ color }) => (
              <IconSymbol name="arrowshape.turn.up.right.fill" size={26} color={color} />
            ),
          }}
        />
      </Tabs>
    </React.Fragment>
  );
}
