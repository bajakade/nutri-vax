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
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        {permissionGranted ? (
          <CameraView style={{ flex: 1 }} facing="back" />
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 18 }}>Camera permission required</Text>
            <TouchableOpacity
              onPress={onRequestPermission}
              style={{
                marginTop: 20,
                padding: 12,
                backgroundColor: '#006600',
                borderRadius: 8,
              }}
            >
              <Text style={{ color: '#fff' }}>Grant Permission</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
}
