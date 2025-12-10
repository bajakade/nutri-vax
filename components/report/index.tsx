import { Text, View } from 'react-native';

import { IOption } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';

const StatCard = ({ label, value, icon }: IOption & { icon: any }) => (
  <View className="w-[48%] p-4 rounded-2xl border border-border bg-card dark:bg-primary/75 shadow-sm">
    <View className="items-center justify-center mb-3 rounded-full w-14 h-14 bg-green-50">
      <MaterialIcons name={icon} size={28} color="#4CAF50" />
    </View>
    <Text className="mb-2 text-sm leading-5 text-muted-foreground dark:text-muted">{label}</Text>
    <Text className="text-4xl font-semibold text-foreground dark:text-secondary">{value}</Text>
  </View>
);

export const EnrollmentStats = () => {
  const stats = {
    today: {
      label: "Today's children",
      value: 12,
      icon: 'emoji-emotions',
    },
    total: {
      label: 'Total enrolled',
      value: 150,
      icon: 'groups',
    },
    pendingReferrals: {
      label: 'Pending referrals',
      value: 3,
      icon: 'event-note',
    },
  };

  return (
    <View className="flex-row flex-wrap gap-3 mb-5">
      {Object.entries(stats).map(([key, props]) => (
        <StatCard key={key} {...props} />
      ))}
    </View>
  );
};
