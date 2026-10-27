import React, {memo, useEffect} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import HabitImage from '@/components/HabitImage';
import PressableScale from '@/components/motion/PressableScale';
import {Habit} from '@/types/colection';

interface Props {
  habit: Habit;
  selected: boolean;
  onSelect: (index: number) => void;
  index: number;
  containerStyle: StyleProp<ViewStyle>;
  imageStyle: StyleProp<ViewStyle>;
  lineStyle: StyleProp<ViewStyle>;
}

// One habit in the strip at the top of Home. The selected tile grows a little
// and its underline draws itself, so switching days reads as a movement rather
// than a repaint.
const HabitTileContent = ({
  habit,
  selected,
  onSelect,
  index,
  containerStyle,
  imageStyle,
  lineStyle,
}: Props) => {
  const progress = useSharedValue(selected ? 1 : 0);

  useEffect(() => {
    progress.value = withSpring(selected ? 1 : 0, {
      damping: 16,
      stiffness: 190,
      mass: 0.6,
    });
  }, [progress, selected]);

  const tileStyle = useAnimatedStyle(() => ({
    transform: [{scale: 1 + progress.value * 0.07}],
  }));

  const lineStyleAnimated = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{scaleX: 0.25 + progress.value * 0.75}],
  }));

  return (
    <PressableScale
      scaleTo={0.9}
      onPress={() => onSelect(index)}
      accessibilityRole="button"
      accessibilityState={{selected}}
      style={containerStyle}>
      <Animated.View style={tileStyle}>
        <HabitImage style={imageStyle} name={habit.habit.name} />
        {selected && (
          <Animated.View style={[lineStyle, lineStyleAnimated]} />
        )}
      </Animated.View>
    </PressableScale>
  );
};

export default memo(HabitTileContent);
