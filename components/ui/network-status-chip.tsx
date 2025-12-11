import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNetInfo } from '@react-native-community/netinfo';
import { useTheme } from '@/hooks/use-theme';

enum NetworkStatus {
  Online = 'online',
  Offline = 'offline',
}

type StatusVariant = {
  icon: 'wifi' | 'wifi-off';
  iconColorKey: 'success' | 'destructive';
  containerClass: string;
  textClass: string;
  message: string;
};

const STATUS_VARIANTS: Record<NetworkStatus, StatusVariant> = {
  [NetworkStatus.Online]: {
    icon: 'wifi',
    iconColorKey: 'success',
    containerClass: 'flex-row items-center gap-2 rounded-lg bg-success/25 px-3 py-3',
    textClass: 'text-[11px] font-medium text-success',
    message: 'You are online.',
  },
  [NetworkStatus.Offline]: {
    icon: 'wifi-off',
    iconColorKey: 'destructive',
    containerClass: 'flex-row items-center gap-2 rounded-lg bg-destructive/10 px-3 py-3',
    textClass: 'text-[11px] font-medium text-destructive',
    message: 'You are offline. Changes will sync when connection is restored.',
  },
};

export default function NetworkStatusChip() {
  const netInfo = useNetInfo();
  const { colors } = useTheme();
  const [status, setStatus] = useState<NetworkStatus>(NetworkStatus.Offline);

  useEffect(() => {
    if (typeof netInfo.isConnected !== 'boolean') {
      return;
    }

    setStatus(netInfo.isConnected ? NetworkStatus.Online : NetworkStatus.Offline);
  }, [netInfo.isConnected]);

  const variant = STATUS_VARIANTS[status];
  const label = variant.message;

  return (
    <View className={variant.containerClass}>
      <MaterialIcons name={variant.icon} size={16} color={colors[variant.iconColorKey]} />
      <Text className={variant.textClass}>{label}</Text>
    </View>
  );
}
