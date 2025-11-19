import React from 'react';
import { View, Text } from 'react-native';

export default function TopBarHeader() {
  return (
    <View
      style={{
        height: 56,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingHorizontal: 16,
        zIndex: 10,
      }}
    >
      {/* Logo */}
      <View
        style={{
          width: 36,
          height: 36,
          backgroundColor: '#006600',
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 0,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>NV</Text>
      </View>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          color: '#006600',
          marginBottom: 4,
          fontWeight: '600',
        }}
      >
        NutriVax
      </Text>
    </View>
  );
}
