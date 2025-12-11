import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import IconBadge, { type IconBadgeProps } from '@/components/ui/icon-badge';
import SurfaceCard from '@/components/ui/surface-card';
import { useThemeColor } from '@/hooks/use-theme-color';
import { cn } from '@/lib/utils';

const HEADER_HEIGHT = 56;

type MenuItem = {
  key: string;
  title: string;
  subtitle: string;
  icon: IconBadgeProps['name'];
  route: string;
};

const menuItems: MenuItem[] = [
  {
    key: 'profile',
    title: 'Profile',
    subtitle: 'View personal details',
    icon: 'user',
    route: '/(protected)/profile',
  },
  {
    key: 'settings',
    title: 'Settings',
    subtitle: 'Preferences & notifications',
    icon: 'sliders',
    route: '/(protected)/settings',
  },
];

export default function TopBarHeader() {
  const primary = useThemeColor({}, 'primary');
  const mutedForeground = useThemeColor({}, 'mutedForeground');

  const [menuVisible, setMenuVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const closeMenu = () => setMenuVisible(false);

  const navigateTo = (route: string) => {
    setMenuVisible(false);
    router.push(route as never);
  };

  return (
    <React.Fragment>
      <View className="h-14 flex-row items-center gap-2 border-b border-border bg-background dark:bg-primary px-4">
        <View className="h-7 w-7 items-center justify-center rounded-full bg-primary dark:bg-secondary">
          <Text className="text-sm font-bold text-primary-foreground dark:text-primary">NV</Text>
        </View>
        <Text className="text-base font-semibold text-primary dark:text-secondary">NutriVax</Text>

        <View className="flex-1" />

        <TouchableOpacity
          onPress={() => setMenuVisible((prev) => !prev)}
          activeOpacity={0.7}
          className="p-2"
          accessibilityRole="button"
          accessibilityLabel="Open user menu"
        >
          <Feather name="menu" size={22} color={primary} />
        </TouchableOpacity>
      </View>

      <Modal visible={menuVisible} animationType="fade" transparent onRequestClose={closeMenu}>
        <View className="flex-1" pointerEvents="box-none">
          <Pressable className="absolute inset-0 bg-overlay" onPress={closeMenu} />

          <View
            className="flex-1 items-end pr-4"
            style={{ paddingTop: insets.top + HEADER_HEIGHT + 8 }}
            pointerEvents="box-none"
          >
            <SurfaceCard padded={false} className="w-64">
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => navigateTo(item.route)}
                  activeOpacity={0.8}
                  className={cn(
                    'flex-row items-center px-4 py-3.5',
                    index < menuItems.length - 1 && 'border-b border-border',
                  )}
                >
                  <IconBadge name={item.icon} />
                  <View className="ml-3 flex-1">
                    <Text className="text-base font-semibold text-foreground dark:text-background">
                      {item.title}
                    </Text>
                    <Text className="mt-0.5 text-xs text-muted-foreground">{item.subtitle}</Text>
                  </View>
                  <Feather name="chevron-right" size={18} color={mutedForeground} />
                </TouchableOpacity>
              ))}
            </SurfaceCard>
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
}
