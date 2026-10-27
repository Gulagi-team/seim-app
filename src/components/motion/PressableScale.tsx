import React from 'react';
import {Pressable, PressableProps, StyleProp, ViewStyle} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface Props extends Omit<PressableProps, 'style'> {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  scaleTo?: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Every tap target in the app gets a spring squeeze. It runs on the UI thread,
// so it stays smooth even while the JS thread is busy.
const PressableScale = ({children, style, scaleTo = 0.93, ...rest}: Props) => {
  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: 1 - pressed.value * (1 - scaleTo)}],
  }));

  return (
    <AnimatedPressable
      {...rest}
      onPressIn={event => {
        pressed.value = withSpring(1, {damping: 20, stiffness: 340});
        rest.onPressIn?.(event);
      }}
      onPressOut={event => {
        pressed.value = withSpring(0, {damping: 13, stiffness: 200});
        rest.onPressOut?.(event);
      }}
      style={[style, animatedStyle]}>
      {children}
    </AnimatedPressable>
  );
};

export default PressableScale;
