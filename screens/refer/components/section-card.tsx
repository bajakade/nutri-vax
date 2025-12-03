import React, { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';

import { cn } from '@/lib/utils';

type SectionCardProps = PropsWithChildren<{
  title: string;
  contentClassName?: string;
}>;

export const SectionCard = ({ title, children, contentClassName }: SectionCardProps) => {
  return (
    <View className="mb-6 overflow-hidden rounded-3xl border border-border bg-card">
      <View className="border-b border-border bg-success/10 px-6 py-4">
        <Text className="text-lg font-semibold text-success">{title}</Text>
      </View>

      <View className={cn('gap-5 p-6', contentClassName)}>{children}</View>
    </View>
  );
};
