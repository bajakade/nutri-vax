import React from 'react';
import { View } from 'react-native';

import { Search } from 'lucide-react-native';

import { Input } from '@/components/ui/input';
import { useColor } from '@/hooks/use-color';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const iconColor = useColor('mutedForeground');

  return (
    <View className="relative mb-6">
      <View className="absolute z-10 -translate-y-1/2 left-3 top-1/2">
        <Search size={20} color={iconColor} />
      </View>

      <Input
        placeholder="Search by Serial # / Name"
        value={value}
        onChangeText={onChange}
        className="pl-12"
      />
    </View>
  );
};
