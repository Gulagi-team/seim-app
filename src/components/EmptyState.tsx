import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {COLORS, POPPINS_BOLD, POPPINS_MEDIUM} from '@/theme';

interface Props {
  title: string;
  message?: string;
}

// A drawn bell inside a soft halo. The halo keeps breathing so an empty screen
// reads as intentional instead of as something that failed to load.
const EmptyBell = () => {
  const float = useSharedValue(0);
  const halo = useSharedValue(0);

  useEffect(() => {
    float.value = withDelay(
      260,
      withRepeat(
        withSequence(
          withTiming(1, {duration: 1600}),
          withTiming(0, {duration: 1600}),
        ),
        -1,
        true,
      ),
    );
    halo.value = withDelay(
      260,
      withRepeat(
        withSequence(
          withTiming(1, {duration: 1600}),
          withTiming(0, {duration: 1600}),
        ),
        -1,
        false,
      ),
    );
  }, [float, halo]);

  const floatStyle = useAnimatedStyle(() => ({
    transform: [{translateY: -6 * float.value}, {scale: 1 + float.value * 0.04}],
  }));

  const haloStyle = useAnimatedStyle(() => ({
    opacity: 0.35 + halo.value * 0.45,
    transform: [{scale: 1 + halo.value * 0.28}],
  }));

  return (
    <View style={styles.art}>
      <Animated.View style={[styles.halo, haloStyle]} />
      <Animated.View style={floatStyle}>
        <Svg width={92} height={92} viewBox="0 0 24 24">
          <Path
            d="M12 3a5.5 5.5 0 0 0-5.5 5.5c0 4-1.5 5.2-1.5 5.2h14s-1.5-1.2-1.5-5.2A5.5 5.5 0 0 0 12 3Z"
            fill="none"
            stroke={COLORS.primary_A500}
            strokeWidth={1.4}
            strokeLinejoin="round"
          />
          <Path
            d="M10 17.2a2 2 0 0 0 4 0"
            fill="none"
            stroke={COLORS.primary_A500}
            strokeWidth={1.4}
            strokeLinecap="round"
          />
          <Circle cx={17.5} cy={5.5} r={2.2} fill={COLORS.secondary_orange1} />
        </Svg>
      </Animated.View>
    </View>
  );
};

const EmptyState = ({title, message}: Props) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withSpring(1, {damping: 16, stiffness: 140, mass: 0.7});
  }, [progress]);

  const style = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  return (
    <View style={styles.container}>
      <EmptyBell />
      <Animated.View style={style}>
        <Text style={styles.title}>{title}</Text>
        {!!message && <Text style={styles.message}>{message}</Text>}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  art: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  halo: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: COLORS.primary_A100,
  },
  title: {
    marginTop: 18,
    fontSize: 17,
    fontWeight: '700',
    fontFamily: POPPINS_BOLD,
    color: COLORS.text_A800,
    textAlign: 'center',
  },
  message: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: POPPINS_MEDIUM,
    color: COLORS.text_A400,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default EmptyState;