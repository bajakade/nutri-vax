import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import IconBadge, { type IconBadgeProps } from '@/components/icon-badge';
import SurfaceCard from '@/components/surface-card';
import { useThemeColor } from '@/hooks/use-theme-color';

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
  const background = useThemeColor({}, 'background');
  const border = useThemeColor({}, 'border');
  const primary = useThemeColor({}, 'primary');
  const primaryForeground = useThemeColor({}, 'primaryForeground');
  const foreground = useThemeColor({}, 'foreground');
  const mutedForeground = useThemeColor({}, 'mutedForeground');
  const overlay = useThemeColor({}, 'overlay');

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
      <View
        style={{
          height: HEADER_HEIGHT,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 8,
          backgroundColor: background,
          borderBottomWidth: 1,
          borderBottomColor: border,
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            width: 28,
            height: 28,
            backgroundColor: primary,
            borderRadius: 14,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: primaryForeground, fontSize: 14, fontWeight: '700' }}>NV</Text>
        </View>

        <Text style={{ color: primary, fontSize: 16, fontWeight: '600' }}>NutriVax</Text>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          onPress={() => setMenuVisible((prev) => !prev)}
          activeOpacity={0.7}
          style={{ padding: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Open user menu"
        >
          <Feather name="menu" size={22} color={primary} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={menuVisible}
        animationType="fade"
        transparent
        onRequestClose={closeMenu}
      >
        <View style={styles.modalRoot} pointerEvents="box-none">
          <Pressable
            style={[StyleSheet.absoluteFillObject, { backgroundColor: overlay }]}
            onPress={closeMenu}
          />

          <View
            style={[
              styles.menuWrapper,
              { paddingTop: insets.top + HEADER_HEIGHT + 8, paddingRight: 16 },
            ]}
            pointerEvents="box-none"
          >
            <SurfaceCard padded={false} className="w-64">
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => navigateTo(item.route)}
                  activeOpacity={0.8}
                  className="flex-row"
                  style={[
                    styles.menuRow,
                    index < menuItems.length - 1 && {
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      borderBottomColor: border,
                    },
                  ]}
                >
                  <IconBadge name={item.icon} />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={{ color: foreground, fontSize: 16, fontWeight: '600' }}>
                      {item.title}
                    </Text>
                    <Text style={{ color: mutedForeground, fontSize: 13, marginTop: 2 }}>
                      {item.subtitle}
                    </Text>
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

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
  },
  menuWrapper: {
    flex: 1,
    alignItems: 'flex-end',
  },
  menuRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
});
