import { TouchableOpacity, View } from 'react-native';

import { useDispatch } from '@/hooks';
import { useThemeColor } from '@/hooks/use-theme-color';
import { authActions } from '@/store/auth';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from './themed-text';

export function Logout() {
  const { dispatch } = useDispatch();
  const destructive = useThemeColor({}, 'destructive');

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => dispatch(authActions.logout())}
      className="mt-8 border rounded-3xl border-destructive bg-destructive/10"
    >
      <View className="flex-row items-center justify-center gap-2 py-4">
        <Feather name="log-out" size={18} color={destructive} />
        <ThemedText className="text-lg font-semibold dark:text-destructive/50">Log Out</ThemedText>
      </View>
    </TouchableOpacity>
  );
}
