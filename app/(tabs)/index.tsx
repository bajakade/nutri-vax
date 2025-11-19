import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import TopBarHeader from '@/components/tob-bar-header';

interface DashboardProps {
  user: any;
  onNavigate: (page: string) => void;
}

export default function Dashboard({ user, onNavigate }: DashboardProps) {
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <ParallaxScrollView
      stickyHeader={<TopBarHeader />}
      headerBackgroundColor={{ light: '#e8f5e9', dark: '#004d00' }}
    >
      {/* Header Info */}
      <View style={{ alignItems: 'center', marginBottom: 4 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 4,
          }}
        >
          <Icon name="calendar-alt" size={16} color="#666" />
          <Text style={{ color: '#666', fontSize: 14, marginLeft: 6 }}>{today}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 2,
          }}
        >
          <Icon name="map-marker-alt" size={20} color="#006600" />
          <Text style={{ color: '#006600', fontSize: 18, fontWeight: '600', marginLeft: 6 }}>
            {user?.facility || 'Afunori PHCC'}
          </Text>
        </View>

        <Text style={{ color: '#666', fontSize: 14 }}>{user?.lga || 'Nguru'} LGA, Yobe State</Text>
      </View>

      {/* Main Action Buttons */}
      <View
        style={{
          justifyContent: 'center',
          maxWidth: 400,
          alignSelf: 'center',
          marginVertical: 8,
        }}
      >
        {/* Enroll Button */}
        <TouchableOpacity
          onPress={() => onNavigate('enroll')}
          style={{
            backgroundColor: '#006600',
            borderRadius: 20,
            padding: 48,
            alignItems: 'center',
            marginBottom: 16,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 6,
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 999,
              padding: 18,
              marginBottom: 8,
            }}
          >
            <Icon name="user-plus" size={28} color="#006600" />
          </View>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 20,
              fontWeight: '500',
              marginBottom: 4,
              textAlign: 'center',
            }}
          >
            Scan to Enrol New Child
          </Text>
          <Text style={{ fontSize: 14, color: '#C6F0C6', textAlign: 'center' }}>
            Register new beneficiary
          </Text>
        </TouchableOpacity>

        {/* Monthly Visit Button */}
        <TouchableOpacity
          onPress={() => onNavigate('visit')}
          style={{
            backgroundColor: '#00A651',
            borderRadius: 20,
            padding: 48,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 6,
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 999,
              padding: 16,
              marginBottom: 8,
            }}
          >
            <Icon name="barcode" size={32} color="#00A651" />
          </View>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 20,
              fontWeight: '500',
              marginBottom: 4,
              textAlign: 'center',
            }}
          >
            Scan for Monthly Visit
          </Text>
          <Text style={{ fontSize: 14, color: '#C6F0C6', textAlign: 'center' }}>
            Record attendance & distribute
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={{ alignItems: 'center', marginTop: 24 }}>
        <Text style={{ color: '#666', fontSize: 14 }}>
          Health Worker: {user?.name || 'Amina Musa'}
        </Text>
      </View>
    </ParallaxScrollView>
  );
}
