import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Dashboard({ user }: { user?: any }) {
  const router = useRouter();
  const { colors } = useTheme();

  // Mock data - replace with actual data later
  const stats = {
    todaysChildren: 12,
    totalEnrolled: 150,
    sachetsInStock: 89,
    pendingReferrals: 3,
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <ScrollView className="flex-1">
        <View className="p-4">
          {/* Statistics Cards Grid */}
          <View className="flex-row flex-wrap gap-3 mb-5">
            {/* Today's children */}
            <View
              className="w-[48%] p-4 rounded-2xl border shadow-sm"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <View
                className="items-center justify-center mb-3 rounded-full w-14 h-14"
                style={{ backgroundColor: '#E8F5E9' }}
              >
                <Icon name="emoji-emotions" size={28} color="#4CAF50" />
              </View>
              <Text className="mb-2 text-sm leading-5" style={{ color: colors.mutedForeground }}>
                Today&apos;s children
              </Text>
              <Text className="text-4xl font-semibold" style={{ color: colors.foreground }}>
                {stats.todaysChildren}
              </Text>
            </View>

            {/* Total enrolled */}
            <View
              className="w-[48%] p-4 rounded-2xl border shadow-sm"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <View
                className="items-center justify-center mb-3 rounded-full w-14 h-14"
                style={{ backgroundColor: '#E8F5E9' }}
              >
                <Icon name="groups" size={28} color="#4CAF50" />
              </View>
              <Text className="mb-2 text-sm leading-5" style={{ color: colors.mutedForeground }}>
                Total enrolled
              </Text>
              <Text className="text-4xl font-semibold" style={{ color: colors.foreground }}>
                {stats.totalEnrolled}
              </Text>
            </View>

            {/* Sachets in stock */}
            <View
              className="w-[48%] p-4 rounded-2xl border-2 shadow-sm"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.warning,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <View
                className="items-center justify-center mb-3 rounded-full w-14 h-14"
                style={{ backgroundColor: '#FFF9C4' }}
              >
                <MaterialCommunityIcons
                  name="package-variant-closed"
                  size={28}
                  color={colors.warning}
                />
              </View>
              <Text className="mb-2 text-sm leading-5" style={{ color: colors.warning }}>
                Sachets in stock
              </Text>
              <Text className="text-4xl font-semibold" style={{ color: colors.warning }}>
                {stats.sachetsInStock}
              </Text>
            </View>

            {/* Pending referrals */}
            <View
              className="w-[48%] p-4 rounded-2xl border shadow-sm"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <View
                className="items-center justify-center mb-3 rounded-full w-14 h-14"
                style={{ backgroundColor: '#FFE6E6' }}
              >
                <Icon name="event-note" size={28} color={colors.destructive} />
              </View>
              <Text className="mb-2 text-sm leading-5" style={{ color: colors.mutedForeground }}>
                Pending referrals
              </Text>
              <Text className="text-4xl font-semibold" style={{ color: colors.foreground }}>
                {stats.pendingReferrals}
              </Text>
            </View>
          </View>

          {/* Online Status Banner */}
          <View
            className="flex-row items-center justify-center gap-2 p-2 mb-5 rounded-xl"
            style={{ backgroundColor: colors.success + '40' }}
          >
            <Icon name="wifi" size={20} color={colors.success} />
            <Text className="text-[11px] font-medium" style={{ color: colors.success }}>
              You are online. Data is syncing.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons - Fixed at bottom */}
      <View className="gap-3 p-4" style={{ backgroundColor: colors.background }}>
        <Button onPress={() => router.push('/(tabs)/enroll')} size="lg" className="gap-2">
          <Icon name="add-circle" size={24} color={colors.primaryForeground} />
          <Text className="text-lg font-semibold" style={{ color: colors.primaryForeground }}>
            Enrol Child
          </Text>
        </Button>

        <Button
          onPress={() => router.push('/(tabs)/visit')}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <MaterialCommunityIcons name="qrcode-scan" size={24} color={colors.foreground} />
          <Text className="text-base font-medium" style={{ color: colors.foreground }}>
            Scan QR for Attendance
          </Text>
        </Button>
      </View>
    </View>
  );
}
