import React, {useEffect} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  // Stagger helper: every screen passes an increasing delay so a block of
  // content arrives one line after the other instead of all at once.
  delay?: number;
  distance?: number;
  scaleFrom?: number;
}

// Entrance animation for anything on first paint. Everything runs on the UI
// thread, so a long list can stagger without touching the JS thread.
const Enter = ({
  children,
  style,
  delay = 0,
  distance = 16,
  scaleFrom = 1,
}: Props) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withSpring(1, {damping: 17, stiffness: 150, mass: 0.7}),
    );
  }, [delay, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      {translateY: (1 - progress.value) * distance},
      {scale: scaleFrom + (1 - scaleFrom) * progress.value},
    ],
  }));

  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
};

export default Enter;
