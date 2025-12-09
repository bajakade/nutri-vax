import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, Switch, TouchableOpacity, View } from 'react-native';

import IconBadge, { type IconBadgeProps } from '@/components/icon-badge';
import SurfaceCard from '@/components/surface-card';
import { ThemedText } from '@/components/themed-text';
import { useDispatch } from '@/hooks';
import { useThemeColor } from '@/hooks/use-theme-color';
import { withOpacity } from '@/lib/color';
import { cn } from '@/lib/utils';
import { authActions } from '@/store/auth';

type SettingAction = {
  key: string;
  title: string;
  subtitle?: string;
  value?: string;
  icon: IconBadgeProps['name'];
  tone?: IconBadgeProps['tone'];
  onPress?: () => void;
};

type ToggleConfig = {
  key: string;
  title: string;
  subtitle?: string;
  subtitleTone?: 'accent' | 'muted';
  icon: IconBadgeProps['name'];
  tone?: IconBadgeProps['tone'];
  value: boolean;
  onValueChange: (value: boolean) => void;
};

const SectionHeading = ({ label }: { label: string }) => (
  <ThemedText className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
    {label}
  </ThemedText>
);

export default function SettingsScreen() {
  const { dispatch } = useDispatch();
  const router = useRouter();

  const foreground = useThemeColor({}, 'foreground');
  const mutedForeground = useThemeColor({}, 'mutedForeground');
  const accent = useThemeColor({}, 'accent');
  const destructive = useThemeColor({}, 'destructive');

  const [syncWifiOnly, setSyncWifiOnly] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [inAppAlerts, setInAppAlerts] = useState(false);

  const trackOffColor = useMemo(
    () => withOpacity(mutedForeground, 0.35) ?? '#d4d4d8',
    [mutedForeground],
  );
  const trackOnColor = useMemo(() => withOpacity(accent, 0.5) ?? accent, [accent]);

  const preferenceActions: SettingAction[] = [
    {
      key: 'language',
      title: 'Language',
      value: 'English',
      icon: 'globe',
      tone: 'accent',
      onPress: () => Alert.alert('Language', 'Language preferences will be available soon.'),
    },
  ];

  const preferenceToggles: ToggleConfig[] = [
    {
      key: 'sync',
      title: 'Data Sync',
      subtitle: syncWifiOnly ? 'Sync on Wi-Fi only' : 'Use mobile data when needed',
      subtitleTone: 'accent',
      icon: 'refresh-cw',
      tone: 'primary',
      value: syncWifiOnly,
      onValueChange: setSyncWifiOnly,
    },
  ];

  const notificationToggles: ToggleConfig[] = [
    {
      key: 'push',
      title: 'Push Notifications',
      subtitle: pushEnabled ? 'Enabled for important updates' : 'Currently disabled',
      subtitleTone: pushEnabled ? 'accent' : 'muted',
      icon: 'bell',
      tone: 'accent',
      value: pushEnabled,
      onValueChange: setPushEnabled,
    },
    {
      key: 'alerts',
      title: 'In-app Alerts',
      subtitle: inAppAlerts ? 'Alerts will show in-app banners' : 'Only critical alerts will show',
      subtitleTone: inAppAlerts ? 'accent' : 'muted',
      icon: 'message-circle',
      tone: 'primary',
      value: inAppAlerts,
      onValueChange: setInAppAlerts,
    },
  ];

  const accountActions: SettingAction[] = [
    {
      key: 'edit-profile',
      title: 'Edit Profile',
      icon: 'user',
      tone: 'accent',
      onPress: () => Alert.alert('Edit Profile', 'Profile editing is coming soon.'),
    },
    {
      key: 'change-password',
      title: 'Change Password',
      icon: 'lock',
      tone: 'primary',
      onPress: () => Alert.alert('Change Password', 'Password updates will be available soon.'),
    },
  ];

  const supportActions: SettingAction[] = [
    {
      key: 'help',
      title: 'Help & Support',
      icon: 'help-circle',
      tone: 'accent',
      onPress: () =>
        Alert.alert('Help & Support', 'Visit the NutriVax help center for assistance.'),
    },
    {
      key: 'about',
      title: 'About this App',
      icon: 'info',
      tone: 'primary',
      onPress: () =>
        Alert.alert(
          'About NutriVax',
          'NutriVax empowers health workers with data-driven insights.',
        ),
    },
  ];

  const renderActionRow = (action: SettingAction, isLast: boolean) => (
    <TouchableOpacity
      key={action.key}
      activeOpacity={action.onPress ? 0.7 : 1}
      onPress={action.onPress}
      disabled={!action.onPress}
      className={cn('flex-row items-center py-4', !isLast && 'border-b border-border')}
    >
      <IconBadge name={action.icon} tone={action.tone ?? 'accent'} />
      <View className="flex-1 ml-4">
        <ThemedText className="text-lg text-foreground">{action.title}</ThemedText>
        {action.subtitle ? (
          <ThemedText className="mt-0.5 text-sm text-muted-foreground">
            {action.subtitle}
          </ThemedText>
        ) : null}
      </View>
      {action.value ? (
        <ThemedText className="text-base text-muted-foreground">{action.value}</ThemedText>
      ) : (
        <Feather name="chevron-right" size={20} color={mutedForeground} />
      )}
    </TouchableOpacity>
  );

  const renderToggle = (toggle: ToggleConfig, isLast: boolean) => (
    <View
      key={toggle.key}
      className={cn('flex-row items-center py-4', !isLast && 'border-b border-border')}
    >
      <IconBadge name={toggle.icon} tone={toggle.tone ?? 'accent'} />
      <View className="flex-1 ml-4">
        <ThemedText className="text-lg text-foreground">{toggle.title}</ThemedText>
        {toggle.subtitle ? (
          <ThemedText
            className={cn(
              'mt-0.5 text-sm',
              toggle.subtitleTone === 'accent' ? 'text-accent' : 'text-muted-foreground',
            )}
          >
            {toggle.subtitle}
          </ThemedText>
        ) : null}
      </View>
      <Switch
        value={toggle.value}
        onValueChange={toggle.onValueChange}
        trackColor={{ false: trackOffColor, true: trackOnColor }}
        thumbColor={toggle.value ? accent : '#f4f4f5'}
        ios_backgroundColor={trackOffColor}
      />
    </View>
  );

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(protected)/(tabs)');
    }
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="px-5 pt-12 pb-8">
        <View className="flex-row items-center mb-5">
          <TouchableOpacity
            onPress={goBack}
            activeOpacity={0.7}
            className="p-2 mr-3 border rounded-full border-border"
          >
            <Feather name="chevron-left" size={20} color={foreground} />
          </TouchableOpacity>
          <ThemedText className="text-2xl font-semibold text-foreground">Settings</ThemedText>
        </View>

        <SurfaceCard className="mb-6">
          <SectionHeading label="Preferences" />
          <View className="mt-2">
            {preferenceActions.map((action, index) =>
              renderActionRow(action, index === preferenceActions.length - 1),
            )}
          </View>
          <View className="mt-2 border-t border-border">
            {preferenceToggles.map((toggle) => renderToggle(toggle, true))}
          </View>
        </SurfaceCard>

        <SurfaceCard className="mb-6">
          <SectionHeading label="Notifications" />
          <View className="mt-2">
            {notificationToggles.map((toggle, index) =>
              renderToggle(toggle, index === notificationToggles.length - 1),
            )}
          </View>
        </SurfaceCard>

        <SurfaceCard className="mb-6">
          <SectionHeading label="Account" />
          <View className="mt-2">
            {accountActions.map((action, index) =>
              renderActionRow(action, index === accountActions.length - 1),
            )}
          </View>
        </SurfaceCard>

        <SurfaceCard>
          <SectionHeading label="Support" />
          <View className="mt-2">
            {supportActions.map((action, index) =>
              renderActionRow(action, index === supportActions.length - 1),
            )}
          </View>
        </SurfaceCard>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => dispatch(authActions.logout())}
          className="mt-8 border rounded-3xl border-destructive bg-destructive/10"
        >
          <View className="flex-row items-center justify-center gap-2 py-4">
            <Feather name="log-out" size={18} color={destructive} />
            <ThemedText className="text-lg font-semibold text-destructive">Logout</ThemedText>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
