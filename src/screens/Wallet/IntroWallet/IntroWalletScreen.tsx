import Logo from '@/assets/images/logo.png';
import SCREENS from '@/constants/screen';
import {navigate} from '@/helpers/navigation';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './IntroWalletScreen.styles';

const IntroWalletScreen = () => {
  const {t} = useTranslation(['wallet']);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={Logo}
        style={{height: 120, width: 120}}
        resizeMode={'contain'}
      />
      <Text style={styles.wellcomeText}>{t('welcome')}</Text>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() =>
          navigate(SCREENS.PASSWORD_WALLET, {to: 'CreateWalletScreen'})
        }>
        <Text style={styles.loginText}>{t('createWallet')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.importButton}
        onPress={() =>
          navigate(SCREENS.PASSWORD_WALLET, {to: 'ImportWalletScreen'})
        }>
        <Text style={styles.loginText}>{t('importWallet')}</Text>
      </TouchableOpacity>

      {/* <Image
        style={styles.welcomeBottom}
        source={WelcomeBottom}
        resizeMode={'stretch'}
      /> */}
    </SafeAreaView>
  );
};
export default IntroWalletScreen;
