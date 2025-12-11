import 'react-native-get-random-values'; // polyfill for uuid
import 'react-native-reanimated';
import '../shim';
import './global.css';

import { Provider as DatabaseProvider } from '@/database';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider as StoreProvider } from '@/store';
import ThemeProvider from './providers/theme';
import { install } from 'react-native-quick-crypto';

export const unstable_settings = {
  initialRouteName: 'splash',
};

// override global.Buffer and global.crypto
install();

export default function RootLayout() {
  return (
    <ThemeProvider>
      <DatabaseProvider>
        <StoreProvider>
          <Stack>
            <Stack.Screen name="(protected)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </StoreProvider>
      </DatabaseProvider>
    </ThemeProvider>
  );
}
