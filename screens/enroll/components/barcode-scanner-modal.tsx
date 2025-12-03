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
            onBarcodeScanned={({ type, data }) => {
              CameraView.dismissScanner();
              onClose(data);
            }}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-card text-lg">Camera permission required</Text>
            <TouchableOpacity
              onPress={requestPermission}
              className="mt-5 p-3 rounded-sm bg-primary"
            >
              <Text className="text-card">Grant Permission</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
}
