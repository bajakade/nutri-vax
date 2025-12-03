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
          <View className="flex-1 justify-center items-center">
            <Text className="text-lg text-white">Camera permission required</Text>
            <TouchableOpacity
              onPress={requestPermission}
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
