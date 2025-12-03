import { LoginForm, loginSchema } from '@/types';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks';
import { useTheme } from '@/hooks/use-theme';
import useFormValidator from '@/hooks/useFormValidator';
import { FontAwesome } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';

export default function LoginScreen() {
  const { login } = useAuth();
  const { colors } = useTheme();
  const { validate, getErrorProps, clearErrors } = useFormValidator<LoginForm>(loginSchema);

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
    <View className="justify-center flex-1 px-5 bg-background">
      <View className="p-8 shadow-2xl rounded-3xl bg-secondary shadow-black/10">
        {/* Logo */}
        <View className="items-center self-center justify-center w-16 h-16 mb-6 bg-primary rounded-2xl">
          <Text className="text-3xl font-bold text-white">NV</Text>
        </View>

        <Text className="text-lg font-medium text-center text-primary-900 dark:text-white">
          Welcome Back
        </Text>
        <Text className="mt-1 mb-8 text-sm text-center text-gray-500">Sign in to continue</Text>

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

        <View className="flex-row items-center justify-between mt-6">
          <TouchableOpacity className="flex-row items-center gap-2">
            <Entypo name="fingerprint" size={19} color={colors.text} />
            <Text className="font-medium text-muted-foreground">Biometric Login</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text className="font-medium text-gray-600">Forgot?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
