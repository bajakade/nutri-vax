// app/screens/splash-screen/index.tsx
import { ThemedText } from '@/components/themed-text';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

export default function SplashScreen() {
  const bounceValues = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    const animations = bounceValues.map((value, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 150),
          Animated.timing(value, { toValue: -12, duration: 400, useNativeDriver: true }),
          Animated.timing(value, { toValue: 0, duration: 400, useNativeDriver: true }),
        ]),
      ),
    );
    Animated.stagger(150, animations).start();
  }, []);

  return (
    <LinearGradient colors={['#006600', '#00A651']} style={{ flex: 1 }}>
      <View className="flex-1 justify-center items-center px-6">
        {/* Logo */}
        <View className="mb-8">
          <View className="w-24 h-24 bg-white rounded-3xl justify-center items-center shadow-2xl shadow-black/30">
            <ThemedText
              type="title"
              className="text-[#006600] text-5xl font-bold"
              lightColor="#006600"
            >
              NV
            </ThemedText>
          </View>
        </View>

        {/* App Name */}
        <ThemedText
          type="title"
          className="text-white text-3xl text-center mb-2 font-bold"
          lightColor="#FFFFFF"
        >
          NutriVax Tracker NG
        </ThemedText>

        {/* Tagline */}
        <ThemedText
          type="defaultSemiBold"
          className="text-[#BCE3C7] text-base text-center mb-10 tracking-wide"
          lightColor="#BCE3C7"
        >
          Track SQ-LNS. Save Lives.
        </ThemedText>

        {/* Bouncing Dots Loader */}
        <View className="flex-row gap-2">
          {bounceValues.map((anim, i) => (
            <Animated.View
              key={i}
              style={{ transform: [{ translateY: anim }] }}
              className="w-3 h-3 bg-white rounded-full"
            />
          ))}
        </View>
      </View>
    </LinearGradient>
  );
}
