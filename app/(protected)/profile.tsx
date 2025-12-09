import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import IconBadge from '@/components/icon-badge';
import SurfaceCard from '@/components/surface-card';
import { ThemedText } from '@/components/themed-text';
import { useDispatch, useSelector } from '@/hooks';
import { useThemeColor } from '@/hooks/use-theme-color';
import { withOpacity } from '@/lib/color';
import { authActions } from '@/store/auth';

const getInitials = (value: string) => {
  if (!value) {
    return 'NV';
  }
  const tokens = value.split(/[\s._-]+/).filter(Boolean);
  if (tokens.length === 0) {
    return value.substring(0, 2).toUpperCase();
  }
  return tokens
    .slice(0, 2)
    .map((token) => token.substring(0, 1).toUpperCase())
    .join('');
};

const LOGOUT_SURFACE_FALLBACK = '#FEE2E2';

export default function ProfileScreen() {
  const { user } = useSelector((store) => store.auth);
  const { dispatch } = useDispatch();
  const router = useRouter();

  const accent = useThemeColor({}, 'accent');
  const primary = useThemeColor({}, 'primary');
  const destructive = useThemeColor({}, 'destructive');
  const foreground = useThemeColor({}, 'foreground');
  const mutedForeground = useThemeColor({}, 'mutedForeground');
  const borderColor = useThemeColor({}, 'border');

  const displayName = user?.username ?? 'Community Health Worker';
  const facilityName = user?.facility?.name ?? 'Not assigned';
  const emailAddress = user?.email ?? 'Not provided';
  const phoneNumber = 'Not provided';

  const initials = useMemo(() => getInitials(displayName), [displayName]);
  const avatarBackground = useMemo(() => withOpacity(accent, 0.15) ?? '#E6F4EA', [accent]);
  const tagBackground = useMemo(() => withOpacity(primary, 0.12) ?? '#E1F2E5', [primary]);
  const logoutBackground = useMemo(
    () => withOpacity(destructive, 0.12) ?? LOGOUT_SURFACE_FALLBACK,
    [destructive],
  );

  const infoRows = [
    { key: 'facility', label: 'Facility', value: facilityName, icon: 'home' as const },
    { key: 'phone', label: 'Phone Number', value: phoneNumber, icon: 'phone' as const },
    { key: 'email', label: 'Email', value: emailAddress, icon: 'mail' as const },
  ];

  const renderInfoRow = (item: (typeof infoRows)[number], isLast: boolean) => (
    <View
      key={item.key}
      className="flex-row items-center py-4"
      style={
        !isLast
          ? { borderBottomColor: borderColor, borderBottomWidth: StyleSheet.hairlineWidth }
          : undefined
      }
    >
      <IconBadge name={item.icon} tone="accent" />
      <View className="flex-1 ml-4">
        <ThemedText className="text-xs font-semibold uppercase text-muted-foreground">
          {item.label}
        </ThemedText>
        <ThemedText className="mt-1 text-lg text-foreground">{item.value}</ThemedText>
      </View>
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
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ padding: 20, paddingBottom: 32 }}
    >
      <View className="flex-row items-center mb-5">
        <TouchableOpacity
          onPress={goBack}
          activeOpacity={0.7}
          className="p-2 mr-3 border rounded-full"
          style={{ borderColor }}
        >
          <Feather name="chevron-left" size={20} color={foreground} />
        </TouchableOpacity>
        <ThemedText className="text-3xl font-semibold text-foreground">User Profile</ThemedText>
      </View>

      <SurfaceCard className="items-center px-4 py-8">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => Alert.alert('Edit Profile', 'Profile editing is coming soon.')}
          className="absolute p-2 rounded-full right-5 top-5"
          style={{ backgroundColor: withOpacity(mutedForeground, 0.12) ?? '#E0E0E0' }}
        >
          <Feather name="edit-3" size={16} color={mutedForeground} />
        </TouchableOpacity>

        <View
          className="items-center justify-center rounded-full h-28 w-28"
          style={{ backgroundColor: avatarBackground }}
        >
          <ThemedText className="text-4xl font-semibold" style={{ color: accent }}>
            {initials}
          </ThemedText>
        </View>

        <ThemedText type="title" className="mt-4 text-xl leading-tight text-center">
          {displayName}
        </ThemedText>
        <ThemedText className="mt-1 text-base" style={{ color: primary }}>
          Community Health Worker
        </ThemedText>

        <View className="px-4 py-2 mt-4 rounded-2xl" style={{ backgroundColor: tagBackground }}>
          <ThemedText className="text-sm font-medium" style={{ color: primary }}>
            Assigned to {facilityName}
          </ThemedText>
        </View>
      </SurfaceCard>

      <SurfaceCard className="mt-6">
        <ThemedText className="text-xs font-semibold uppercase text-muted-foreground">
          Account Details
        </ThemedText>
        <View className="mt-2">
          {infoRows.map((item, index) => renderInfoRow(item, index === infoRows.length - 1))}
        </View>
      </SurfaceCard>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => dispatch(authActions.logout())}
        className="mt-8 border rounded-3xl"
        style={{ borderColor: destructive, backgroundColor: logoutBackground }}
      >
        <View className="flex-row items-center justify-center gap-2 py-4">
          <Feather name="log-out" size={18} color={destructive} />
          <ThemedText className="text-lg font-semibold" style={{ color: destructive }}>
            Log Out
          </ThemedText>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
