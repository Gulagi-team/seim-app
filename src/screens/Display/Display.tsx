import Header from '@/components/Header';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
// import i18next from 'i18next';
import IconDarkMoon from '@/assets/icons/darkmode/icon_moon_dark.svg';
import IconDarkSun from '@/assets/icons/darkmode/icon_sun_dark.svg';
import IconMoon from '@/assets/icons/icon_moon.svg';
import IconSun from '@/assets/icons/icon_sun.svg';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import {StoreState, useAppSelector} from '@/store';
import {updateTheme} from '@/store/theme';
import {ThemeType} from '@/types/Appearance';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {styles} from './Display.styles';

const DisplayScreen = () => {
  const {t} = useTranslation(['other']);
  const {
    isDarkMode,
    backgroundColor,
    containerColor,
    textColor,
    borderColor,
    borderSelectedColor,
  } = useAppSelector((state: StoreState) => state.ThemeSlice);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  const onChangeMode = (mode: ThemeType) => {
    dispatch(updateTheme(mode));
    // void i18next.changeLanguage(lang);
    // reduxStorage.setItem('language', lang);
  };
  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: backgroundColor}}>
      <Header title="Display" canGoBack={true} handleGoBack={goBack} />
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={{
            ...styles.itemContainer,
            backgroundColor: containerColor,
            borderColor:
              isDarkMode === false ? borderSelectedColor : borderColor,
          }}
          onPress={() => onChangeMode('light')}>
          <View style={{flexDirection: 'row'}}>
            {isDarkMode ? <IconDarkSun /> : <IconSun />}
            <Text style={{...styles.text, color: textColor}}>{t('light')}</Text>
          </View>

          <View
            style={{
              ...styles.checkBox,
              borderColor:
                isDarkMode === false ? borderSelectedColor : borderColor,
            }}>
            {isDarkMode === false && (
              <View style={{...styles.checkDot, backgroundColor: textColor}} />
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...styles.itemContainer,
            backgroundColor: containerColor,
            borderColor:
              isDarkMode === true ? borderSelectedColor : borderColor,
          }}
          onPress={() => onChangeMode('dark')}>
          <View style={{flexDirection: 'row'}}>
            {isDarkMode ? <IconDarkMoon /> : <IconMoon />}
            <Text style={{...styles.text, color: textColor}}>{t('dark')}</Text>
          </View>
          <View
            style={{
              ...styles.checkBox,
              borderColor:
                isDarkMode === true ? borderSelectedColor : borderColor,
            }}>
            {isDarkMode === true && (
              <View style={{...styles.checkDot, backgroundColor: textColor}} />
            )}
          </View>
        </TouchableOpacity>
      </View>
      <Image
        style={styles.welcomeBottom}
        source={WelcomeBottom}
        resizeMode={'stretch'}
      />
    </SafeAreaView>
  );
};

export default DisplayScreen;
