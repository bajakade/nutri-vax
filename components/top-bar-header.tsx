import { useTheme } from '@/hooks/use-theme';
import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function TopBarHeader() {
  const [menuVisible, setMenuVisible] = useState(false);
  const { colors } = useTheme();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View
      className="flex-row items-center justify-between px-4 border-b h-14"
      style={{
        backgroundColor: colors.background,
        borderBottomColor: colors.border,
      }}
    >
      {/* Menu Button */}
      <TouchableOpacity onPress={toggleMenu} className="p-1">
        <Icon name="menu" size={28} color={colors.foreground} />
      </TouchableOpacity>

      {/* Title and Subtitle */}
      <View className="flex-row items-center flex-1 gap-3">
        <Text className="text-lg font-semibold" style={{ color: colors.foreground }}>
          Garin Alkali PHCC
        </Text>
        <Text className="text-sm" style={{ color: colors.mutedForeground }}>
          Nguru
        </Text>
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
        <TouchableOpacity
          className="flex-1"
          style={{ backgroundColor: colors.overlay }}
          activeOpacity={1}
          onPress={toggleMenu}
        >
          <View
            className="absolute top-[60px] left-4 rounded-lg border shadow-lg min-w-[180px]"
            style={{
              backgroundColor: colors.card,
              borderColor: colors.border,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
            onStartShouldSetResponder={() => true}
          >
            <TouchableOpacity
              className="flex-row items-center gap-3 p-4"
              onPress={() => {
                setMenuVisible(false);
                // Navigate to profile
              }}
            >
              <Icon name="person" size={24} color={colors.foreground} />
              <Text className="text-base font-medium" style={{ color: colors.foreground }}>
                Profile
              </Text>
            </TouchableOpacity>

            <View className="h-[1px]" style={{ backgroundColor: colors.border }} />

            <TouchableOpacity
              className="flex-row items-center gap-3 p-4"
              onPress={() => {
                setMenuVisible(false);
                // Navigate to settings
              }}
            >
              <Icon name="settings" size={24} color={colors.foreground} />
              <Text className="text-base font-medium" style={{ color: colors.foreground }}>
                Settings
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
