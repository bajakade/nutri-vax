import { Animated, View } from 'react-native';
import React, { useEffect, useRef } from 'react';

import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';

export default function SplashScreen() {
  const { colors } = useTheme();
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
    <LinearGradient colors={[colors?.primary, colors?.accent]} style={{ flex: 1 }}>
      <View className="items-center justify-center flex-1 px-6">
        {/* Logo */}
        <View className="mb-8">
          <View className="items-center justify-center w-24 h-24 bg-white shadow-2xl rounded-3xl shadow-black/30">
            <ThemedText
              type="title"
              className={`text-primary text-5xl font-bold`}
              lightColor={colors?.primary}
            >
              NV
            </ThemedText>
          </View>
        </View>

        {/* App Name */}
        <ThemedText
          type="title"
          className="mb-2 text-3xl font-bold text-center text-white"
          lightColor={colors?.background}
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
