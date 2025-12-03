import NetworkStatusChip from '@/components/network-status-chip';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const withAlpha = (hexColor: string, alpha: number) => {
  if (!hexColor || !hexColor.startsWith('#')) {
    return hexColor;
  }

  const normalized =
    hexColor.length === 4
      ? `#${hexColor[1]}${hexColor[1]}${hexColor[2]}${hexColor[2]}${hexColor[3]}${hexColor[3]}`
      : hexColor;

  const alphaHex = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, '0');

  return `${normalized}${alphaHex}`;
};

export default function Dashboard({ user }: { user?: any }) {
  const router = useRouter();
  const { colors } = useTheme();
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  const greetingName = user?.name ?? user?.username ?? 'Health Worker';
  const facilityName = user?.facility?.name ?? 'your facility';

  // Mock data - replace with actual data later
  const stats = {
    todaysChildren: 12,
    totalEnrolled: 150,
    sachetsInStock: 89,
    pendingReferrals: 3,
  };

  const statCards = [
    {
      key: 'todaysChildren',
      title: "Today's children",
      value: stats.todaysChildren,
      helper: '+3 vs yesterday',
      caption: 'already attended',
      valueClass: 'text-foreground',
      icon: (
        <View className="items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100">
          <MaterialIcons name="emoji-emotions" size={26} color="#047857" />
        </View>
      ),
    },
    {
      key: 'totalEnrolled',
      title: 'Total enrolled',
      value: stats.totalEnrolled,
      helper: 'active beneficiaries',
      caption: 'in facility records',
      valueClass: 'text-foreground',
      icon: (
        <View className="items-center justify-center w-12 h-12 bg-indigo-100 rounded-2xl">
          <MaterialIcons name="groups" size={26} color="#1D4ED8" />
        </View>
      ),
    },
    {
      key: 'sachetsInStock',
      title: 'Sachets in stock',
      value: stats.sachetsInStock,
      helper: 'packs left in store',
      caption: 'restock when below 40%',
      valueClass: 'text-warning',
      icon: (
        <View className="items-center justify-center w-12 h-12 rounded-2xl bg-amber-100">
          <MaterialCommunityIcons name="package-variant-closed" size={26} color="#B45309" />
        </View>
      ),
    },
    {
      key: 'pendingReferrals',
      title: 'Pending referrals',
      value: stats.pendingReferrals,
      helper: 'awaiting follow-up',
      caption: 'check referrals desk',
      valueClass: 'text-destructive',
      icon: (
        <View className="items-center justify-center w-12 h-12 rounded-2xl bg-rose-100">
          <MaterialIcons name="event-note" size={26} color="#B91C1C" />
        </View>
      ),
    },
  ];

  const quickActions = [
    {
      key: 'enrol',
      title: 'Enrol Child',
      subtitle: 'Register new beneficiary',
      icon: <MaterialIcons name="person-add-alt-1" size={24} color={colors.primaryForeground} />,
      backgroundColor: colors.primary,
      iconBackground: withAlpha(colors.primaryForeground, 0.15),
      textColor: colors.primaryForeground,
      subtitleColor: withAlpha(colors.primaryForeground, 0.85),
      onPress: () => router.push('/(protected)/(tabs)/enroll'),
    },
    {
      key: 'attendance',
      title: 'Mark Attendance',
      subtitle: 'Distribute SQ-LNS',
      icon: (
        <MaterialCommunityIcons
          name="clipboard-check-outline"
          size={24}
          color={colors.successForeground}
        />
      ),
      backgroundColor: colors.success,
      iconBackground: withAlpha(colors.successForeground, 0.15),
      textColor: colors.successForeground,
      subtitleColor: withAlpha(colors.successForeground, 0.8),
      onPress: () => router.push('/(protected)/(tabs)/visit'),
    },
  ];

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 160 }}>
        <View className="gap-6 px-4 pt-5">
          <View className="p-5 border shadow-sm rounded-3xl border-border bg-card shadow-black/5">
            <Text className="text-sm font-medium tracking-wide uppercase text-muted-foreground">
              {today}
            </Text>
            <Text className="mt-2 text-2xl font-semibold text-foreground">
              Hello, {greetingName}
            </Text>
            <Text className="mt-2 text-base leading-6 text-muted-foreground">
              Here&apos;s what&apos;s happening at {facilityName}. Stay on track and finish your
              queue.
            </Text>

            <View className="flex-row gap-3 mt-4">
              <View className="flex-1 p-4 rounded-2xl bg-muted/40">
                <Text className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                  Facility
                </Text>
                <Text className="mt-1 text-lg font-semibold text-foreground">{facilityName}</Text>
              </View>
              <View className="flex-1 p-4 rounded-2xl bg-muted/40">
                <Text className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                  Pending referrals
                </Text>
                <Text className="mt-1 text-2xl font-semibold text-destructive">
                  {stats.pendingReferrals}
                </Text>
              </View>
            </View>

            <View className="mt-4">
              <NetworkStatusChip />
            </View>
          </View>

          <View>
            <Text className="mb-3 text-base font-semibold text-foreground">
              Today&apos;s snapshot
            </Text>
            <View className="flex-row flex-wrap justify-between gap-3">
              {statCards.map((card) => (
                <View
                  key={card.key}
                  className="w-[48%] rounded-3xl border border-border/60 bg-card p-4 shadow-sm"
                >
                  {card.icon}
                  <Text className="mt-4 text-sm font-medium tracking-wide uppercase text-muted-foreground">
                    {card.title}
                  </Text>
                  <Text className={cn('mt-1 text-4xl font-semibold', card.valueClass)}>
                    {card.value}
                  </Text>
                  <Text className="mt-1 text-xs font-semibold text-muted-foreground">
                    {card.helper}
                  </Text>
                  <Text className="mt-0.5 text-xs text-muted-foreground">{card.caption}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="px-4 pt-4 pb-6 border-t border-border/40 bg-background/95">
        <Text className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Quick actions
        </Text>
        {quickActions.map((action, index) => (
          <Pressable
            key={action.key}
            onPress={action.onPress}
            className={cn(
              'mb-3 rounded-3xl shadow-sm shadow-black/10',
              index === quickActions.length - 1 && 'mb-0',
            )}
            style={{ backgroundColor: action.backgroundColor }}
          >
            <View className="flex-row items-center justify-between px-5 py-4">
              <View className="flex-row items-center gap-4">
                <View
                  className="items-center justify-center w-12 h-12 rounded-2xl"
                  style={{ backgroundColor: action.iconBackground }}
                >
                  {action.icon}
                </View>
                <View>
                  <Text className="text-lg font-semibold" style={{ color: action.textColor }}>
                    {action.title}
                  </Text>
                  <Text className="text-sm" style={{ color: action.subtitleColor }}>
                    {action.subtitle}
                  </Text>
                </View>
              </View>
              <MaterialIcons name="arrow-forward" size={22} color={action.textColor} />
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
