import { ScrollView, View } from 'react-native';

import { ActionButtons } from '@/components/form/action';
import { EnrollmentStats } from '@/components/report';
import { NetworkStatusChip } from '@/components/ui';
import React from 'react';

export default function Dashboard() {
  // Mock data - replace with actual data later
  const stats = {
    todaysChildren: 12,
    totalEnrolled: 150,
    pendingReferrals: 3,
  };

  return (
    <View className="flex-1 bg-background dark:bg-foreground">
      <ScrollView className="flex-1">
        <View className="p-4">
          <View className="mb-5">
            <NetworkStatusChip />
          </View>
          <EnrollmentStats />
        </View>
      </ScrollView>
      <ActionButtons />
    </View>
  );
}
