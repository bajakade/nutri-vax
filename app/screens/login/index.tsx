import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="flex-1 bg-[#e8f5e9] justify-center px-5">
      <View className="p-8 bg-white shadow-2xl rounded-3xl shadow-black/10">
        {/* Logo */}
        <View className="w-16 h-16 bg-[#006600] rounded-2xl justify-center items-center self-center mb-6">
          <Text className="text-3xl font-bold text-white">NV</Text>
        </View>

        {/* Title */}
        <Text className="text-lg font-medium text-center text-gray-900">Welcome Back</Text>
        <Text className="mt-1 mb-8 text-sm text-center text-gray-500">Sign in to continue</Text>

        {/* Email */}
        <Input
          placeholder="Email or Phone"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          className="mb-4"
        />

        {/* Password + Eye */}
        <View className="relative mb-8">
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            className="pr-12"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 justify-center right-3"
          >
            <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={22} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Sign In Button – using your beautiful Button component */}
        <Button onPress={onLogin} size="lg">
          Sign In
        </Button>

        {/* Bottom Links */}
        <View className="flex-row items-center justify-between mt-6">
          <TouchableOpacity className="flex-row items-center gap-2">
            <Entypo name="fingerprint" size={19} color="#006600" />
            <Text className="text-[#006600] font-medium">Biometric Login</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text className="font-medium text-gray-600">Forgot?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
