import { LoginForm, loginSchema } from '@/types';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

import { Button } from '@/components/ui/button'; // ← your awesome Button
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks';
import { useTheme } from '@/hooks/use-theme';
import useFormValidator from '@/hooks/useFormValidator';
import { FontAwesome } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';

export default function LoginScreen() {
  const { login } = useAuth();
  const { colors } = useTheme();
  const { validate, getErrorProps, errors, clearErrors } = useFormValidator<LoginForm>(loginSchema);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleOnChangeText = (key: 'username' | 'password', value: string) => {
    clearErrors();
    if (key === 'username') {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  const onLogin = async () => {
    const isValid = await validate({ username, password });
    if (!isValid) {
      return;
    }

    const { ok, error } = await login({ username, password });
    if (!ok) {
      Alert.alert('Error', String(error));
    }
  };

  return (
    <View className="flex-1 justify-center px-5" style={{ backgroundColor: colors.background }}>
      <View
        className="rounded-3xl p-8 shadow-2xl shadow-black/10"
        style={{ backgroundColor: colors.secondary }}
      >
        {/* Logo */}
        <View className="w-16 h-16 bg-primary rounded-2xl justify-center items-center self-center mb-6">
          <Text className="text-white text-3xl font-bold">NV</Text>
        </View>

        <Text className="text-center text-lg font-medium text-gray-900 dark:text-white">
          Welcome Back
        </Text>
        <Text className="text-center text-sm text-gray-500 mt-1 mb-8">Sign in to continue</Text>

        <Input
          placeholder="Username or Phone"
          value={username}
          onChangeText={(val: string) => handleOnChangeText('username', val)}
          keyboardType="default"
          autoCapitalize="none"
          className="mb-4"
          {...getErrorProps('username')}
        />

        <View className="relative mb-8">
          <Input
            placeholder="Password"
            value={password}
            onChangeText={(val: string) => handleOnChangeText('password', val)}
            secureTextEntry={!showPassword}
            className="pr-12"
            {...getErrorProps('password')}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 justify-center right-3"
          >
            <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={22} color={colors.icon} />
          </TouchableOpacity>
        </View>

        <Button onPress={onLogin} size="lg">
          Sign In
        </Button>

        <View className="flex-row justify-between items-center mt-6">
          <TouchableOpacity className="flex-row items-center gap-2">
            <Entypo name="fingerprint" size={19} color={colors.text} />
            <Text className="text-muted-foreground font-medium">Biometric Login</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text className="font-medium text-gray-600">Forgot?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
