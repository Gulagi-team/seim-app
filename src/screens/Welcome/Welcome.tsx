import {useEffect, useState} from 'react';

import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import {navigate} from '@/helpers/navigation';
import LogoSeim from '@/assets/images/logo.png';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import SCREENS from '@/constants/screen';
import {COLORS, POPPINS_BOLD, POPPINS_MEDIUM} from '@/theme';
import {deviceWidth} from '@/constants/layout';
import Enter from '@/components/motion/Enter';
import PressableScale from '@/components/motion/PressableScale';

const WelcomeScreen = () => {
  const glow = useSharedValue(0);

  useEffect(() => {
    glow.value = withDelay(
      400,
      withRepeat(
        withSequence(
          withTiming(1, {duration: 1500}),
          withTiming(0, {duration: 1500}),
        ),
        -1,
        true,
      ),
    );
  }, [glow]);

  // The mark keeps a slow breath while the copy arrives, so the first screen
  // never feels like a static splash the user has to wait out.
  const glowStyle = useAnimatedStyle(() => ({
    transform: [{scale: 1 + glow.value * 0.05}],
    opacity: 0.9 + glow.value * 0.1,
  }));

  const handleStart = () => {
    navigate(SCREENS.GETINFO);
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <Enter delay={60} distance={20} scaleFrom={0.9}>
        <Animated.View style={[styles.logoWrap, glowStyle]}>
          <Image
            source={LogoSeim}
            style={{height: 80, width: 80}}
            resizeMode={'contain'}
          />
          <Text style={styles.seimText}>SEIM</Text>
        </Animated.View>
      </Enter>

      <Enter delay={180} distance={16}>
        <Text style={styles.welcomeText}>Welcome!</Text>
      </Enter>

      <Enter delay={280} distance={16}>
        <Text style={styles.paraText}>
          Chúng tôi rất vui vì bạn đã quan tâm đến ứng dụng này. Chắc chắn bạn
          muốn nâng cấp sức khoẻ và tinh thần của mình. Hãy để chúng tôi giúp bạn,
          Seim sẽ là người bạn đồng hành và giúp bạn khoẻ hơn mỗi ngày.
        </Text>
      </Enter>

      <Enter delay={360} distance={12}>
        <View style={{width: '100%', marginHorizontal: 16}}>
          <Text style={styles.paraText}>Let's get started!</Text>
        </View>
      </Enter>

      <Enter delay={440} distance={14} scaleFrom={0.94}>
        <PressableScale
          onPress={handleStart}
          scaleTo={0.94}
          accessibilityRole="button"
          style={styles.startButton}>
          <Text style={styles.startText}>{'Bắt đầu >'}</Text>
        </PressableScale>
      </Enter>

      <Image
        style={styles.welcomeBottom}
        source={WelcomeBottom}
        resizeMode={'stretch'}
      />
    </SafeAreaView>
  );
};

export default WelcomeScreen;

export const styles = StyleSheet.create({
  containerView: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
  },
  logoWrap: {
    marginTop: '30%',
    alignItems: 'center',
  },
  logo: {width: 64, height: 64},
  seimText: {
    fontSize: 20,
    letterSpacing: 5,
    fontWeight: '700',
    fontFamily: POPPINS_MEDIUM,
    color: COLORS.black,
    textAlign: 'center',
  },
  welcomeText: {
    marginTop: 40,
    fontSize: 30,
    fontWeight: '700',
    fontFamily: POPPINS_BOLD,
    color: COLORS.black,
  },
  paraText: {
    marginTop: 20,
    fontSize: 14,
    fontFamily: POPPINS_MEDIUM,
    color: COLORS.black,
    marginHorizontal: 16,
    lineHeight: 21,
  },
  startButton: {
    backgroundColor: '#1675D6',
    width: 160,
    height: 50,
    borderRadius: 25,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startText: {
    color: 'white',
    fontFamily: POPPINS_MEDIUM,
    fontSize: 15,
    fontWeight: '600',
  },
  welcomeBottom: {
    position: 'absolute',
    width: '100%',
    zIndex: -1,
    height: '25%',
    bottom: 0,
  },
});