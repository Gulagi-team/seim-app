import React, {memo, useEffect} from 'react';
import {Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface Props {
  children: string;
  color: string;
  focused: boolean;
}

// The label of the active tab slides up a hair and opens its weight, so the
// focus reads the same in the icon and in the text.
const AnimatedTabLabel = ({children, color, focused}: Props) => {
  const progress = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    progress.value = withSpring(focused ? 1 : 0, {
      damping: 15,
      stiffness: 210,
    });
  }, [focused, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: progress.value * -1.5}],
  }));

  return (
    <Animated.Text style={[animatedStyle, {color}]}>{children}</Animated.Text>
  );
};

export default memo(AnimatedTabLabel);
