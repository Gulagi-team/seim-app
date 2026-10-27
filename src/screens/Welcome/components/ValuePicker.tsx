import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {COLORS, POPPINS_BOLD} from '@/theme';
import PressableScale from '@/components/motion/PressableScale';
import Enter from '@/components/motion/Enter';

interface Props {
  presets: number[];
  unit: string;
  placeholder: string;
  value: number;
  onChange: (value: number) => void;
}

const Chip = ({
  label,
  selected,
  onPress,
  index,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  index: number;
}) => {
  const progress = useSharedValue(selected ? 1 : 0);

  useEffect(() => {
    progress.value = withSpring(selected ? 1 : 0, {
      damping: 14,
      stiffness: 230,
      mass: 0.5,
    });
  }, [progress, selected]);

  // Only the scale is animated on the UI thread. The fill colour is plain
  // style: reading a JS value inside a worklet is what reanimated warns about.
  const style = useAnimatedStyle(() => ({
    transform: [{scale: 1 + progress.value * 0.06}],
  }));

  return (
    <Enter delay={Math.min(index, 12) * 35} distance={8} scaleFrom={0.9}>
      <PressableScale onPress={onPress} scaleTo={0.9} accessibilityRole="button">
        <Animated.View
          style={[
            styles.chip,
            selected && styles.chipSelected,
            style,
          ]}>
          <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
            {label}
          </Text>
        </Animated.View>
      </PressableScale>
    </Enter>
  );
};

// Height and weight used to sit on a drag-only wheel: answering one question
// needed a precise swipe and nothing could be tapped. Common values are now one
// tap away, with the free numeric entry kept underneath.
const ValuePicker = ({presets, unit, placeholder, value, onChange}: Props) => {
  const [text, setText] = useState(value ? String(value) : '');

  useEffect(() => {
    setText(value ? String(value) : '');
  }, [value]);

  const handleText = useCallback(
    (input: string) => {
      const clean = input.replace(/[^0-9]/g, '');
      setText(clean);
      const parsed = Number(clean);
      if (clean.length > 0 && parsed > 0) {
        onChange(parsed);
      }
    },
    [onChange],
  );

  const chips = useMemo(
    () =>
      presets.map((preset, index) => (
        <Chip
          key={preset}
          index={index}
          label={String(preset)}
          selected={Number(text) === preset}
          onPress={() => {
            setText(String(preset));
            onChange(preset);
          }}
        />
      )),
    [onChange, presets, text],
  );

  return (
    <View style={styles.container}>
      <View style={styles.valueRow}>
        <TextInput
          style={styles.value}
          value={text}
          onChangeText={handleText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.text_A300}
          keyboardType="number-pad"
          maxLength={3}
          numberOfLines={1}
          selectTextOnFocus
        />
        <Text style={styles.unit}>{unit}</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}>
        {chips}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  value: {
    fontSize: 48,
    fontWeight: '700',
    fontFamily: POPPINS_BOLD,
    color: COLORS.text_A800,
    textAlign: 'center',
    minWidth: 120,
    paddingVertical: 4,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.text_A200,
  },
  unit: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: POPPINS_BOLD,
    color: COLORS.text_A800,
    marginStart: 10,
    marginBottom: 10,
  },
  chipRow: {
    paddingTop: 24,
    paddingHorizontal: 8,
    gap: 10,
  },
  chip: {
    width: 64,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.text_A200,
  },
  chipSelected: {
    backgroundColor: COLORS.primary_A500,
    borderColor: COLORS.primary_A500,
  },
  chipText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: POPPINS_BOLD,
    color: COLORS.text_A800,
  },
  chipTextSelected: {
    color: COLORS.white,
  },
});

export default ValuePicker;