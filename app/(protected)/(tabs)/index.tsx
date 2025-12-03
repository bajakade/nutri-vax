import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import useSelector from '@/hooks/useSelector';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Dashboard() {
  const router = useRouter();
  const { colors } = useTheme();
  const { user } = useSelector((store) => store.auth);
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Mock data - replace with actual data later
  const stats = {
    todaysChildren: 12,
    totalEnrolled: 150,
    pendingReferrals: 3,
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Online Status Banner */}
        <View className="flex-row items-center justify-center gap-2 p-2 mb-5 rounded-xl bg-success/25">
          <Icon name="wifi" size={20} color={colors.success} />
          <Text className="text-[11px] font-medium text-success">
            You are online. Data is syncing.
          </Text>
        </View>
        <View className="p-4">
          {/* Statistics Cards Grid */}
          <View className="flex-row flex-wrap gap-3 mb-5">
            {/* Today's children */}
            <View className="w-[48%] p-4 rounded-2xl border border-border bg-card shadow-sm">
              <View className="items-center justify-center mb-3 rounded-full w-14 h-14 bg-green-50">
                <Icon name="emoji-emotions" size={28} color="#4CAF50" />
              </View>
              <Text className="mb-2 text-sm leading-5 text-muted-foreground">
                Today&apos;s children
              </Text>
              <Text className="text-4xl font-semibold text-foreground">{stats.todaysChildren}</Text>
            </View>

            {/* Total enrolled */}
            <View className="w-[48%] p-4 rounded-2xl border border-border bg-card shadow-sm">
              <View className="items-center justify-center mb-3 rounded-full w-14 h-14 bg-green-50">
                <Icon name="groups" size={28} color="#4CAF50" />
              </View>
              <Text className="mb-2 text-sm leading-5 text-muted-foreground">Total enrolled</Text>
              <Text className="text-4xl font-semibold text-foreground">{stats.totalEnrolled}</Text>
            </View>

            {/* Pending referrals */}
            <View className="w-[48%] p-4 rounded-2xl border border-border bg-card shadow-sm">
              <View className="items-center justify-center mb-3 rounded-full w-14 h-14 bg-red-50">
                <Icon name="event-note" size={28} color={colors.destructive} />
              </View>
              <Text className="mb-2 text-sm leading-5 text-muted-foreground">
                Pending referrals
              </Text>
              <Text className="text-4xl font-semibold text-foreground">
                {stats.pendingReferrals}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons - Fixed at bottom */}
      <View className="gap-3 p-4 bg-background">
        <Button
          onPress={() => router.push('/(protected)/(tabs)/enroll')}
          size="lg"
          className="gap-2"
        >
          <Icon name="add-circle" size={24} color={colors.primaryForeground} />
          <Text className="text-lg font-semibold text-primary-foreground">Enrol Child</Text>
        </Button>

        <Button
          onPress={() => router.push('/(protected)/(tabs)/visit')}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <MaterialCommunityIcons name="qrcode-scan" size={24} color={colors.foreground} />
          <Text className="text-base font-medium text-foreground">Scan QR for Attendance</Text>
        </Button>
      </View>
    </View>
  );
}
