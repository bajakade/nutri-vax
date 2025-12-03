import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNetInfo } from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { NetworkStatus } from '@/types';

type StatusVariant = {
  icon: 'wifi' | 'wifi-off';
  iconColorKey: 'success' | 'destructive';
  containerClass: string;
  textClass: string;
  fallbackMessage: string;
};

const STATUS_VARIANTS: Record<NetworkStatus, StatusVariant> = {
  [NetworkStatus.Online]: {
    icon: 'wifi',
    iconColorKey: 'success',
    containerClass: 'flex-row items-center justify-center gap-2 rounded-xl bg-success/25 px-3 py-2',
    textClass: 'text-[11px] font-medium text-success',
    fallbackMessage: 'You are online. Data is syncing.',
  },
  [NetworkStatus.Offline]: {
    icon: 'wifi-off',
    iconColorKey: 'destructive',
    containerClass:
      'flex-row items-center justify-center gap-2 rounded-xl bg-destructive/10 px-3 py-2',
    textClass: 'text-[11px] font-medium text-destructive',
    fallbackMessage: 'You are offline. Changes will sync when connection is restored.',
  },
};

export default function NetworkStatusChip() {
  const netInfo = useNetInfo();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [status, setStatus] = useState<NetworkStatus>(NetworkStatus.Offline);

  useEffect(() => {
    if (typeof netInfo.isConnected !== 'boolean') {
      return;
    }

    setStatus(netInfo.isConnected ? NetworkStatus.Online : NetworkStatus.Offline);
  }, [netInfo.isConnected]);

  const variant = STATUS_VARIANTS[status];
  const label = t(`home:network.${status}`, { defaultValue: variant.fallbackMessage });

  return (
    <View className={variant.containerClass}>
      <MaterialIcons name={variant.icon} size={16} color={colors[variant.iconColorKey]} />
      <Text className={variant.textClass}>{label}</Text>
    </View>
  );
}
