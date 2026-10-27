import React, {memo, useEffect} from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {COLORS} from '@/theme';

interface Props {
  isChecked: boolean;
  size?: number;
}

// The gluestack Checkbox pulled a Pressable, an animation driver and several
// style props into the hottest row of the app. A tick only needs two views, so
// the box is drawn here and the check pops in on the UI thread.
const TaskCheckbox = ({isChecked, size = 20}: Props) => {
  const tickSize = Math.round(size * 0.62);
  const progress = useSharedValue(isChecked ? 1 : 0);

  useEffect(() => {
    if (isChecked) {
      // A short squeeze then an overshoot, the way a real tick feels when it
      // snaps into place.
      progress.value = withSequence(
        withTiming(0.55, {duration: 70, easing: Easing.out(Easing.quad)}),
        withSpring(1, {damping: 9, stiffness: 260, mass: 0.5}),
      );
    } else {
      progress.value = withTiming(0, {duration: 130});
    }
  }, [isChecked, progress]);

  const boxStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{scale: interpolate(progress.value, [0, 1], [1, 1.12, 1])}],
  }));

  const tickStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      {scale: interpolate(progress.value, [0, 0.55, 1], [0.3, 1.25, 1])},
      {rotate: `${interpolate(progress.value, [0, 1], [-25, 0])}deg`},
    ],
  }));

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: 5,
        borderWidth: 1.5,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: isChecked ? COLORS.primary_A500 : COLORS.text_A400,
      }}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            borderRadius: 5,
            backgroundColor: COLORS.primary_A500,
          },
          boxStyle,
        ]}
      />
      <Animated.View style={tickStyle}>
        <Svg width={tickSize} height={tickSize} viewBox="0 0 15 11">
          <Path
            d="M13.908 -0.009L5.198 8.701 1.528 5.031 0.803 5.756 4.835 9.788 5.197 10.135 5.559 9.788 14.633 0.716 13.908 -0.009Z"
            fill={COLORS.text_A50}
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

export default memo(TaskCheckbox);
