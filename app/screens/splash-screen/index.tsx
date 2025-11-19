import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/themed-text';

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
          Animated.timing(value, { toValue: -10, duration: 300, useNativeDriver: true }),
          Animated.timing(value, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]),
      ),
    );
    Animated.stagger(150, animations).start();
  }, []);

  return (
    <LinearGradient colors={['#006600', '#00A651']} start={[0, 0]} end={[1, 1]} style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        <View style={{ marginBottom: 24 }}>
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: 24,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOpacity: 0.25,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 5 },
              elevation: 8,
            }}
          >
            <ThemedText type="title" style={{ color: '#006600', fontSize: 40, fontWeight: 'bold' }}>
              NV
            </ThemedText>
          </View>
        </View>

        <ThemedText
          type="title"
          style={{ color: 'white', marginBottom: 8, fontSize: 24, textAlign: 'center' }}
        >
          NutriVax Tracker NG
        </ThemedText>

        <ThemedText
          type="defaultSemiBold"
          style={{ color: '#BCE3C7', marginBottom: 32, fontSize: 16, textAlign: 'center' }}
        >
          Track SQ-LNS. Save Lives.
        </ThemedText>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 32 }}>
          {bounceValues.map((val, idx) => (
            <Animated.View
              key={idx}
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: 'white',
                marginHorizontal: 4,
                transform: [{ translateY: val }],
              }}
            />
          ))}
        </View>
      </View>
    </LinearGradient>
  );
}
