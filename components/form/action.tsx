import { Button, Variant } from '../ui/button';
import { RelativePathString, useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/hooks';

interface Props {
  title: string;
  description: string;
  icon: string;
  color?: string;
  href: RelativePathString;
  variant?: Variant;
}
const ActionButton = ({ title, description, color, icon, variant, href }: Props) => {
  const router = useRouter();

  return (
    <Button onPress={() => router.push(href)} variant={variant} size="lg" className="h-24 gap-3">
      <View className="flex-1 flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <MaterialCommunityIcons name={icon as any} size={26} color={color} />
          <View>
            <Text className="text-lg font-semibold" style={{ color }}>
              {title}
            </Text>
            <Text className="text-sm" style={{ color, opacity: 0.85 }}>
              {description}
            </Text>
          </View>
        </View>
        <MaterialCommunityIcons name="arrow-right" size={20} color={color} />
      </View>
    </Button>
  );
};

export const ActionButtons = () => {
  const { colors } = useTheme();
  const actions = [
    {
      title: 'Enroll Child',
      description: 'Register new beneficiary',
      href: '/(protected)/(tabs)/enroll' as RelativePathString,
      color: colors.primaryForeground,
      icon: 'account-plus',
    },
    {
      title: 'Mark Attendance',
      description: 'Distribute SQ-LNS',
      href: '/(protected)/(tabs)/visit' as RelativePathString,
      color: colors.foreground,
      variant: 'outline' as Variant,
      icon: 'clipboard-check-outline',
    },
  ];

  return (
    <View className="gap-3 p-4">
      {actions.map((props) => (
        <ActionButton key={props.title} {...props} />
      ))}
    </View>
  );
};
