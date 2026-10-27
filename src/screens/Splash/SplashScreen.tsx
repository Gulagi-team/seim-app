import {useEffect} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
// import {useTranslation} from 'react-i18next';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import {navigateReset} from '@/helpers/navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import LogoSeim from '@/assets/images/logoSeim.png';
import {getBooleanLocal, getStringLocal} from '@/helpers/localStorage';
import {useDispatch} from 'react-redux';
import {getKeyLession, getLessionSelected} from '@/store/lessions';
import {styles} from './SplashScreen.styles';
import CONST_SCREEN from '@/constants/screen';
import {updateInfoUser} from '@/store/userInfo';
import {fetchHabits} from '@/store/habits/action';
import {fetchTopics} from '@/store/topics/action';
import {fetchLessions} from '@/store/lessions';
import {syncCatalogOnce} from '@/api/catalog';
import {ThunkDispatch} from '@reduxjs/toolkit';

const SplashScreen = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const entrance = useSharedValue(0);
  const breathe = useSharedValue(0);

  useEffect(() => {
    entrance.value = withTiming(1, {duration: 620});
    // A slow breath on the mark keeps the splash alive while the catalog sync
    // is still running in the background.
    breathe.value = withRepeat(
      withSequence(
        withTiming(1, {duration: 900}),
        withTiming(0, {duration: 900}),
      ),
      -1,
      true,
    );
  }, [breathe, entrance]);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: entrance.value,
    transform: [
      {translateY: interpolate(entrance.value, [0, 1], [26, 0])},
      {scale: interpolate(entrance.value, [0, 1], [0.82, 1])},
      {scale: interpolate(breathe.value, [0, 1], [1, 1.05])},
    ],
  }));

  const bottomStyle = useAnimatedStyle(() => ({
    opacity: entrance.value,
    transform: [{translateY: interpolate(entrance.value, [0, 1], [70, 0])}],
  }));

  const creditStyle = useAnimatedStyle(() => ({
    opacity: withDelay(700, withTiming(1, {duration: 400})),
  }));

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true);
      }, 1000),
    );

    // The only network call of the app: the packs, the topic list and the habit
    // catalog are pulled once, the first time the app runs after install. A
    // timeout keeps a dead network from blocking the start, the bundled catalog
    // is used instead.
    const report = await Promise.race([
      syncCatalogOnce(),
      new Promise<undefined>(resolve => setTimeout(() => resolve(undefined), 8000)),
    ]);
    console.log('Catalog sync:', report);

    dispatch(fetchLessions());
    dispatch(fetchTopics());
    dispatch(fetchHabits());

    const getInfoDone = getBooleanLocal('isGetInfoDone');
    const getUserInfoLocal = getStringLocal('userInfo');
    const getLessionsSelectedLocal = getStringLocal('lessionsSelected');
    const getKeyLessionsSelectedLocal = getStringLocal('keyLessionsSelected');

    console.log(getLessionsSelectedLocal);
    if (getInfoDone) {
      getUserInfoLocal &&
        dispatch(updateInfoUser(JSON.parse(getUserInfoLocal)));
      if (getLessionsSelectedLocal && getKeyLessionsSelectedLocal) {
        dispatch(getLessionSelected(JSON.parse(getLessionsSelectedLocal)));
        dispatch(getKeyLession(JSON.parse(getKeyLessionsSelectedLocal)));
      }
      navigateReset(CONST_SCREEN.MAIN);
    } else {
      navigateReset(CONST_SCREEN.WELCOME);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={logoStyle}>
        <Image
          source={LogoSeim}
          style={styles.imageLogo}
          resizeMode={'contain'}
        />
      </Animated.View>
      {/* <ActivityIndicator size="large" style={{marginVertical: 24}} /> */}
      <Animated.View style={[styles.welcomeBottom, bottomStyle]}>
        <Image
          testID={'welcome-bottom'}
          style={styles.welcomeBottomImage}
          source={WelcomeBottom}
          resizeMode={'stretch'}
        />
      </Animated.View>
      <Animated.Text style={[styles.credit, creditStyle]}>
        Develop by Gulagi
      </Animated.Text>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
//   imageLogo: {height: 150, width: 150},
//   welcomeBottom: {
//     position: 'absolute',
//     width: '100%',
//     height: '30%',
//     bottom: 0,
//   },
// });

export default SplashScreen;
