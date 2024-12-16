// import { Brand } from "components/molecules";

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import React from 'react';

import {navigate} from '@/helpers/navigation';

import LogoSeim from '@/assets/images/logo.png';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import SCREENS from '@/constants/screen';
import {COLORS, POPPINS_BOLD, POPPINS_MEDIUM} from '@/theme';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
const WelcomeScreen = () => {
  const handleLogin = async () => {
    navigate(SCREENS.GETINFO);
  };
  const {t} = useTranslation(['welcome']);

  return (
    <SafeAreaView style={styles.containerView}>
      <View
        style={{
          marginTop: '30%',
        }}>
        <Image
          source={LogoSeim}
          style={{height: 80, width: 80}}
          resizeMode={'contain'}
        />
        <Text style={styles.seimText}>SEIM</Text>
      </View>
      <Text style={styles.welcomeText}>{t('welcome')}</Text>

      <Text style={styles.paraText}>{t('description')}</Text>

      <View style={{width: '100%', marginHorizontal: 16}}>
        <Text style={styles.paraText}>{t('getStarted')}</Text>
      </View>

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: '#1675D6',
          width: 120,
          height: 45,
          borderRadius: 15,
          marginTop: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white'}}>{t('start')} &gt;</Text>
      </TouchableOpacity>

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
  logo: {width: 64, height: 64},
  seimText: {
    // marginTop: 10,
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
    marginBottom: 10,
  },
  paraText: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: '400',
    marginHorizontal: 16,
    fontFamily: POPPINS_MEDIUM,
    color: COLORS.darkmode_3,
  },

  welcomeBottom: {
    position: 'absolute',
    width: '100%',
    zIndex: -1,
    height: '25%',
    bottom: 0,
  },
});
