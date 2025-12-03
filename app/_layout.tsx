import '@/i18n';
import 'react-native-get-random-values'; // polyfill for uuid
import 'react-native-reanimated';
import '../shim';
import './global.css';

import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { useEffect, useState } from 'react';

import { Provider as DatabaseProvider } from '@/database';
import { Provider as StoreProvider } from '@/store';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { install } from 'react-native-quick-crypto';
import CustomSplashScreen from '../screens/splash-screen';
import ThemeProvider from './providers/theme';

export const unstable_settings = {
  initialRouteName: 'splash',
};

// override global.Buffer and global.crypto
install();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          ...Ionicons.font,
          ...MaterialIcons.font,
          ...MaterialCommunityIcons.font,
          ...FontAwesome5.font,
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        try {
          await SplashScreen.hideAsync();
        } catch (e) {
          console.warn('failed to hide splash', e);
        }
        setIsReady(true);
      }
    }
    prepare();
  }, []);

  if (!isReady) {
    return <CustomSplashScreen />;
  }

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
