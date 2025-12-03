import { CameraView } from 'expo-camera';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

type BarcodeScannerModalProps = {
  visible: boolean;
  permissionGranted: boolean;
  onRequestPermission: () => void;
  onClose: () => void;
};

export function BarcodeScannerModal({
  visible,
  permissionGranted,
  onRequestPermission,
  onClose,
}: BarcodeScannerModalProps) {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 bg-black">
        {permissionGranted ? (
          <CameraView className="flex-1" facing="back" />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-lg text-white">Camera permission required</Text>
            <TouchableOpacity
              onPress={onRequestPermission}
              className="mt-5 rounded-lg bg-primary px-5 py-3"
            >
              <Text className="text-primary-foreground">Grant Permission</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
}
