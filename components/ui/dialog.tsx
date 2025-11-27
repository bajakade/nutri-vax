import { X } from 'lucide-react-native';
import React from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  const card = useThemeColor({}, 'neutralCard');
  const border = useThemeColor({}, 'neutralBorderStrong');
  const overlay = useThemeColor({}, 'overlay');

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => onOpenChange(false)}
    >
      {/* Backdrop */}
      <Pressable
        className="items-center justify-center flex-1 px-4"
        style={{ backgroundColor: overlay }}
        onPress={() => onOpenChange(false)}
      >
        <Pressable
          onStartShouldSetResponder={() => true}
          className="w-full max-w-md shadow-2xl"
          style={{ backgroundColor: card, borderColor: border, borderWidth: 1, borderRadius: 32 }}
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function DialogContent({ children }: { children: React.ReactNode }) {
  return <View className="space-y-4">{children}</View>;
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <View className="mb-5 space-y-2">{children}</View>;
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  const titleColor = useThemeColor({}, 'foreground');
  return (
    <Text className="text-xl font-semibold" style={{ color: titleColor }}>
      {children}
    </Text>
  );
}

export function DialogFooter({ children }: { children: React.ReactNode }) {
  const border = useThemeColor({}, 'border');
  return (
    <View
      className="flex-row justify-end gap-4 pt-4 mt-8"
      style={{ borderTopWidth: 1, borderColor: border }}
    >
      {children}
    </View>
  );
}

export function DialogClose({ onPress }: { onPress: () => void }) {
  const muted = useThemeColor({}, 'neutralElevated');
  const mutedForeground = useThemeColor({}, 'neutralAccent');
  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute z-10 p-2 rounded-full top-4 right-4"
      style={{ backgroundColor: `${muted}80` }}
      activeOpacity={0.7}
    >
      <X size={22} color={mutedForeground} />
    </TouchableOpacity>
  );
}
