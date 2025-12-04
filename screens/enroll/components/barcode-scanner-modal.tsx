import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useRef } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

type BarcodeScannerModalProps = {
  visible: boolean;
  onClose: (data?: string) => void;
};

export function BarcodeScannerModal({ visible, onClose }: BarcodeScannerModalProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const camera = useRef<CameraView>(null);

  useEffect(() => {
    if (camera.current) {
      CameraView.launchScanner();
    }
  }, [camera]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={() => onClose()}>
      <View className="flex-1 bg-foreground">
        {Boolean(permission?.granted) ? (
          <CameraView
            ref={camera}
            className="flex-1"
            facing="back"
            onBarcodeScanned={({ data }) => {
              CameraView.dismissScanner();
              onClose(data);
            }}
          />
        ) : (
          <View className="items-center justify-center flex-1">
            <Text className="text-lg text-card">Camera permission required</Text>
            <TouchableOpacity
              onPress={requestPermission}
              className="p-3 mt-5 rounded-sm bg-primary"
            >
              <Text className="text-card">Grant Permission</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
}
