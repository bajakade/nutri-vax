import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Menu from './menu';
import { useSelector } from '@/hooks';
import { useTheme } from '@/hooks/use-theme';

enum MenuOption {
  Profile = 'PROFILE',
  Settings = 'SETTING',
}
export default function TopBarHeader() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selected, setSelected] = useState<MenuOption>();

  const { colors } = useTheme();
  const { user } = useSelector((store) => store.auth);

  const menuOptions = useMemo(
    () => [
      {
        label: 'Profile',
        value: MenuOption.Profile,
        icon: 'person',
      },
      {
        label: 'Settings',
        value: MenuOption.Settings,
        icon: 'settings',
      },
    ],
    [],
  );

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleSelect = (id: MenuOption) => {
    // todo: navigate to screen
    console.log(selected);
  };

  return (
    <View className="flex-row items-center justify-between h-16 border-b border-border bg-background dark:bg-primary px-4">
      <View className="flex-row items-center flex-1 gap-3">
        <Text className="text-lg font-semibold text-foreground dark:text-background">
          Garin Alkali PHCC
        </Text>
        <Text className="text-sm text-muted-foreground text-muted">Nguru</Text>
      </View>
      <TouchableOpacity onPress={toggleMenu} className="absolute right-3 p-1">
        <MaterialIcons name="menu" size={28} color={colors.foreground} />
      </TouchableOpacity>

      {/* Placeholder for balance */}
      <View className="w-7" />
      <Menu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        handleSelect={handleSelect}
        options={menuOptions}
      />
    </View>
  );
}
