import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { Input } from '@/components/ui/input';

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => onLogin();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#e8f5e9',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 20,
          padding: 24,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 6,
        }}
      >
        <View
          style={{
            width: 64,
            height: 64,
            backgroundColor: '#006600',
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 24,
              fontWeight: '700',
            }}
          >
            NV
          </Text>
        </View>

        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: '#111',
            marginBottom: 4,
          }}
        >
          Welcome Back
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: '#666',
            fontSize: 14,
            marginBottom: 28,
          }}
        >
          Sign in to continue
        </Text>

        <Input
          placeholder="Email or Phone"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={{ marginBottom: 12 }}
        />

        <View style={{ position: 'relative', marginBottom: 16 }}>
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={{ paddingRight: 40 }}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: 12,
              top: 0,
              bottom: 0,
              justifyContent: 'center',
            }}
          >
            <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: '#006600',
            paddingVertical: 12,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontWeight: '600',
              fontSize: 16,
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Entypo name="fingerprint" size={16} color="#006600" />
            <Text style={{ color: '#006600', marginLeft: 6 }}>Biometric Login</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={{ color: '#666' }}>Forgot?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
