import React, {memo, useEffect} from 'react';
import {Image, ImageSourcePropType} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface Props {
  source: ImageSourcePropType;
  focused: boolean;
}

// The tab icon is the same picture in both states, so the focus has to be
// carried by motion: the active tab lifts and grows, the inactive one settles
// back. Everything runs on the UI thread.
const TabIcon = ({source, focused}: Props) => {
  const progress = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    progress.value = withSpring(focused ? 1 : 0, {
      damping: 14,
      stiffness: 220,
      mass: 0.6,
    });
  }, [focused, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateY: progress.value * -5},
      {scale: 1 + progress.value * 0.14},
    ],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Image source={source} resizeMode="contain" style={{width: 25, height: 25}} />
    </Animated.View>
  );
};

export default memo(TabIcon);
