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

const SplashScreen = () => {
  const dispatch = useDispatch();

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

    console.log(getLessionsSelectedLocal);
    if (getInfoDone && getUserInfoLocal) {
      console.log('getUserInfoLocal', getUserInfoLocal);
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
      navigateReset(CONST_SCREEN.LOGIN);
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
        Develop by Gulagi
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
