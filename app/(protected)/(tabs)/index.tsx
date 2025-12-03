import NetworkStatusChip from '@/components/network-status-chip';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import useSelector from '@/hooks/useSelector';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

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
        <View className="p-4">
          {/* Network Status */}
          <View className="mb-5">
            <NetworkStatusChip />
          </View>
          {/* Statistics Cards Grid */}
          <View className="flex-row flex-wrap gap-3 mb-5">
            {/* Today's children */}
            <View className="w-[48%] p-4 rounded-2xl border border-border bg-card shadow-sm">
              <View className="items-center justify-center mb-3 rounded-full w-14 h-14 bg-green-50">
                <MaterialIcons name="emoji-emotions" size={28} color="#4CAF50" />
              </View>
              <Text className="mb-2 text-sm leading-5 text-muted-foreground">
                Today&apos;s children
              </Text>
              <Text className="text-4xl font-semibold text-foreground">{stats.todaysChildren}</Text>
            </View>

            {/* Total enrolled */}
            <View className="w-[48%] p-4 rounded-2xl border border-border bg-card shadow-sm">
              <View className="items-center justify-center mb-3 rounded-full w-14 h-14 bg-green-50">
                <MaterialIcons name="groups" size={28} color="#4CAF50" />
              </View>
              <Text className="mb-2 text-sm leading-5 text-muted-foreground">Total enrolled</Text>
              <Text className="text-4xl font-semibold text-foreground">{stats.totalEnrolled}</Text>
            </View>

            {/* Pending referrals */}
            <View className="w-[48%] p-4 rounded-2xl border border-border bg-card shadow-sm">
              <View className="items-center justify-center mb-3 rounded-full w-14 h-14 bg-red-50">
                <MaterialIcons name="event-note" size={28} color={colors.destructive} />
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
          className="h-24 gap-3"
        >
          <View className="flex-row items-center justify-between flex-1">
            <View className="flex-row items-center gap-3">
              <MaterialIcons name="person-add-alt-1" size={26} color={colors.primaryForeground} />
              <View>
                <Text className="text-lg font-semibold text-primary-foreground">Enrol Child</Text>
                <Text
                  className="text-sm"
                  style={{ color: colors.primaryForeground, opacity: 0.85 }}
                >
                  Register new beneficiary
                </Text>
              </View>
            </View>
            <MaterialIcons name="arrow-forward" size={20} color={colors.primaryForeground} />
          </View>
        </Button>

        <Button
          onPress={() => router.push('/(protected)/(tabs)/visit')}
          variant="outline"
          size="lg"
          className="h-24 gap-3"
        >
          <View className="flex-row items-center justify-between flex-1">
            <View className="flex-row items-center gap-3">
              <MaterialCommunityIcons
                name="clipboard-check-outline"
                size={26}
                color={colors.foreground}
              />
              <View>
                <Text className="text-base font-semibold text-foreground">Mark Attendance</Text>
                <Text className="text-sm text-muted-foreground">Distribute SQ-LNS</Text>
              </View>
            </View>
            <MaterialIcons name="arrow-forward" size={20} color={colors.foreground} />
          </View>
        </Button>
      </View>
    </View>
  );
}
