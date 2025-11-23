// components/ui/dialog.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, Pressable } from 'react-native';
import { X } from 'lucide-react-native';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
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
        className="items-center justify-center flex-1 px-4 bg-black/50"
        onPress={() => onOpenChange(false)}
      >
        <Pressable
          onStartShouldSetResponder={() => true}
          className="w-full max-w-md shadow-2xl bg-background rounded-2xl"
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function DialogContent({ children }: { children: React.ReactNode }) {
  return <View className="p-6">{children}</View>;
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <View className="mb-4">{children}</View>;
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <Text className="text-xl font-semibold text-foreground">{children}</Text>;
}

export function DialogFooter({ children }: { children: React.ReactNode }) {
  return <View className="flex-row justify-end gap-3 mt-6">{children}</View>;
}

// This is the key: absolute positioning + high z-index
export function DialogClose({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute z-10 p-2 rounded-full top-4 right-4 bg-muted/50"
      activeOpacity={0.7}
    >
      <X size={22} color="#666" />
    </TouchableOpacity>
  );
}
