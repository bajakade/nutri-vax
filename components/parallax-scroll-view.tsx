import { useThemeColor } from '@/hooks/use-theme-color';
import type { PropsWithChildren, ReactElement } from 'react';
import { View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage?: ReactElement;
  headerBackgroundColor?: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor = { light: '#e8f5e9', dark: '#004d00' }, // matches your dashboard
}: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);
  const insets = useSafeAreaInsets();
  const background = useThemeColor({}, 'background');
  // Use headerBackgroundColor prop if provided, else fallback to theme 'card'
  const headerBg = useThemeColor(headerBackgroundColor ?? {}, 'card');

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
    <View className="flex-1" style={{ backgroundColor: background }}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 24,
        }}
        className="flex-1"
        style={{ backgroundColor: background }}
      >
        {/* Parallax Header Image */}
        {headerImage && (
          <Animated.View
            style={[
              {
                height: HEADER_HEIGHT,
                backgroundColor: headerBg,
              },
              headerAnimatedStyle,
            ]}
            className="absolute left-0 right-0 overflow-hidden"
          >
            {headerImage}
          </Animated.View>
        )}

        <View className={`pt-${HEADER_HEIGHT / 4 + 12} px-5 gap-6`}>{children}</View>
      </Animated.ScrollView>
    </View>
  );
}
