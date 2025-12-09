import 'react-native-get-random-values'; // polyfill for uuid
import 'react-native-reanimated';
import '../../shim';
import '../global.css';

import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { useDatabase, useDispatch, useSelector } from '@/hooks';
import { useEffect, useState } from 'react';

import { authActions } from '@/store/auth';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { install } from 'react-native-quick-crypto';
import CustomSplashScreen from '../../screens/splash-screen';

export const unstable_settings = {
  initialRouteName: 'splash',
};

// override global.Buffer and global.crypto
install();

export default function ProtectedLayout() {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((store) => store.auth);
  const { database } = useDatabase();
  const { dispatch } = useDispatch();

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(Ionicons.font);
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

  useEffect(() => {
    if (!database) {
      return;
    }

    database.auth
      .getAuth()
      .exec()
      .then(async (session) => {
        if (session?.user) {
          const { username, token, user } = session;
          dispatch(authActions.login(user, token!, username));
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);
      });
  }, [database, dispatch]);

  if (!isReady || isLoading) {
    return <CustomSplashScreen />;
  }

  return (
    <Stack>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
