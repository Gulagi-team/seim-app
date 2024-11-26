import {useEffect} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
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
import {updateWalletState} from '@/store/wallet';
import {updateInfoUser} from '@/store/userInfo';
import {fetchMining} from '@/store/mining/action';
import {ThunkDispatch} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {readFromFile, removeFile} from '@/helpers/file';
import {checkStateOfTaskPreviousDay, updateState} from '@/store/habits';
import {reduxStorage} from '@/store';
import {useTranslation} from 'react-i18next';

const SplashScreen = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {t} = useTranslation('other');

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true);
      }, 1000),
    );
    const getInfoDone = getBooleanLocal('isGetInfoDone');
    const getUserInfoLocal = getStringLocal('userInfo');
    const getLessionsSelectedLocal = getStringLocal('lessionsSelected');
    const getKeyLessionsSelectedLocal = getStringLocal('keyLessionsSelected');
    const address = getStringLocal('address');

    // await AsyncStorage.removeItem('userInfo');
    // await removeFile('topics.json');
    // await removeFile('habits.json');
    // await removeFile('task_histories.json');

    navigateReset(CONST_SCREEN.WELCOME);

    // dispatch(checkStateOfTaskPreviousDay());

    // if (getInfoDone && getUserInfoLocal) {
    //   dispatch(updateInfoUser(JSON.parse(getUserInfoLocal)));
    //   if (getLessionsSelectedLocal && getKeyLessionsSelectedLocal) {
    //     dispatch(getLessionSelected(JSON.parse(getLessionsSelectedLocal)));
    //     dispatch(getKeyLession(JSON.parse(getKeyLessionsSelectedLocal)));
    //     address && dispatch(updateWalletState({chainId: 97, account: address}));
    //     navigateReset(CONST_SCREEN.MAIN);
    //   } else {
    //     navigateReset(CONST_SCREEN.MAIN);
    //   }
    // } else {
    //   navigateReset(CONST_SCREEN.WELCOME);
    // }
  };

  useEffect(() => {
    init();
    dispatch(fetchMining());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={LogoSeim}
        style={styles.imageLogo}
        resizeMode={'contain'}
      />
      {/* <ActivityIndicator size="large" style={{marginVertical: 24}} /> */}
      <Image
        testID={'welcome-bottom'}
        style={styles.welcomeBottom}
        source={WelcomeBottom}
        resizeMode={'stretch'}
      />
      <Text
        style={{
          position: 'absolute',
          bottom: 15,
        }}>
        {t('developed', {name: 'Gulagi'})}
      </Text>
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
