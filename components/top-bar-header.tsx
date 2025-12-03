import { useTheme } from '@/hooks/use-theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

export default function TopBarHeader() {
  const [menuVisible, setMenuVisible] = useState(false);
  const { colors } = useTheme();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View className="flex-row items-center justify-between h-14 border-b border-border bg-background px-4">
      {/* Menu Button */}
      <TouchableOpacity onPress={toggleMenu} className="p-1">
        <MaterialIcons name="menu" size={28} color={colors.foreground} />
      </TouchableOpacity>

      {/* Title and Subtitle */}
      <View className="flex-row items-center flex-1 gap-3">
        <Text className="text-lg font-semibold text-foreground">Garin Alkali PHCC</Text>
        <Text className="text-sm text-muted-foreground">Nguru</Text>
      </View>

      {/* Placeholder for balance */}
      <View className="w-7" />

      {/* Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleMenu}
      >
        <TouchableOpacity className="flex-1 bg-black/50" activeOpacity={1} onPress={toggleMenu}>
          <View
            className="absolute left-4 top-[60px] min-w-[180px] rounded-lg border border-border bg-card shadow-lg shadow-black/20"
            onStartShouldSetResponder={() => true}
          >
            <TouchableOpacity
              className="flex-row items-center gap-3 p-4"
              onPress={() => {
                setMenuVisible(false);
                // Navigate to profile
              }}
            >
              <MaterialIcons name="person" size={24} color={colors.foreground} />
              <Text className="text-base font-medium text-foreground">Profile</Text>
            </TouchableOpacity>

            <View className="h-px bg-border" />

            <TouchableOpacity
              className="flex-row items-center gap-3 p-4"
              onPress={() => {
                setMenuVisible(false);
                // Navigate to settings
              }}
            >
              <MaterialIcons name="settings" size={24} color={colors.foreground} />
              <Text className="text-base font-medium text-foreground">Settings</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
