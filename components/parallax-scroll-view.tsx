import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { SafeAreaView } from 'react-native-safe-area-context';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage?: ReactElement;
  stickyHeader?: ReactElement;
  headerBackgroundColor?: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  stickyHeader,
  headerBackgroundColor = { light: '#fff', dark: '#000' },
}: Props) {
  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
          [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
        ),
      },
      {
        scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
      },
    ],
  }));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <View style={{ flex: 1 }}>
        {stickyHeader && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 10,
            }}
          >
            {stickyHeader}
          </View>
        )}

        <Animated.ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingTop: stickyHeader ? 56 : 0, // space for sticky header
          }}
        >
          {headerImage && (
            <Animated.View
              style={[
                styles.header,
                { backgroundColor: headerBackgroundColor[colorScheme] },
                headerAnimatedStyle,
              ]}
            >
              {headerImage}
            </Animated.View>
          )}

          <ThemedView style={styles.content}>{children}</ThemedView>
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
