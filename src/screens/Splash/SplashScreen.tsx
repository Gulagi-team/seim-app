import {useEffect} from 'react';
import {Image, Text} from 'react-native';
// import {useTranslation} from 'react-i18next';
import LogoSeim from '@/assets/images/logoSeim.png';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import CONST_SCREEN from '@/constants/screen';
import {getBooleanLocal, getStringLocal} from '@/helpers/localStorage';
import {navigateReset} from '@/helpers/navigation';
import {getAuth} from '@/store/auth';
import {getKeyLession, getLessionSelected} from '@/store/lessions';
import {updateCode, updateInfoUser} from '@/store/userInfo';
import {getInfoUser} from '@/store/userInfo/action';
import {updateWalletState} from '@/store/wallet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThunkDispatch} from '@reduxjs/toolkit';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {styles} from './SplashScreen.styles';
import {removeFile} from '@/helpers/file';
import {stringUtils} from '@/utils/string';
const SplashScreen = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {t} = useTranslation('other');

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true);
      }, 1000),
    );

    const auth = await getAuth();
    if (auth) {
      dispatch(getInfoUser());
    }
    const getInfoDone = getBooleanLocal('isGetInfoDone');
    const getUserInfoLocal = getStringLocal('userInfo');
    const getLessionsSelectedLocal = getStringLocal('lessionsSelected');
    const getKeyLessionsSelectedLocal = getStringLocal('keyLessionsSelected');
    const address = getStringLocal('address');
    console.log('getInfoDone', getInfoDone);
    console.log('getUserInfoLocal', getUserInfoLocal);
    // await AsyncStorage.removeItem('userInfo');
    // await AsyncStorage.removeItem('mining');
    // await removeFile('topics.json');
    // await removeFile('habits.json');
    // await removeFile('task_histories.json');
    // await removeFile('mining.json');
    // await AsyncStorage.removeItem('currentReward');
    // reduxStorage.removeItem('isGetInfoDone');
    // reduxStorage.removeItem('userInfo');
    navigateReset(CONST_SCREEN.MINING);

    // const referralCode = stringUtils.generateCode();
    // dispatch(updateCode(referralCode));

    if (getInfoDone && getUserInfoLocal) {
      dispatch(updateInfoUser(JSON.parse(getUserInfoLocal)));
      if (getLessionsSelectedLocal && getKeyLessionsSelectedLocal) {
        dispatch(getLessionSelected(JSON.parse(getLessionsSelectedLocal)));
        dispatch(getKeyLession(JSON.parse(getKeyLessionsSelectedLocal)));
        address && dispatch(updateWalletState({chainId: 97, account: address}));
        navigateReset(CONST_SCREEN.MAIN);
      } else {
        navigateReset(CONST_SCREEN.MAIN);
      }
    } else {
      navigateReset(CONST_SCREEN.WELCOME);
    }
  };

  useEffect(() => {
    init();
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
