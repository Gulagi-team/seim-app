import IconChina from '@/assets/icons/icon_china.svg';
import IconEnglish from '@/assets/icons/icon_english.svg';
import IconKorea from '@/assets/icons/icon_indonesia.svg';
import IconVietNam from '@/assets/icons/icon_vietnam.svg';
import Header from '@/components/Header';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import i18next from 'i18next';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import {reduxStorage, StoreState, useAppSelector} from '@/store';
import {updateLanguage} from '@/store/userInfo';
import {LanguageType} from '@/types/colection';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {styles} from './LanguageScreen.styles';
import i18n from '@/translations';
import {fetchHabits} from '@/store/habits/action';
import {ThunkDispatch} from '@reduxjs/toolkit';
// import i18n from '@/translations';

const LanguageScreen = () => {
  const {t} = useTranslation(['setting']);
  const [language, setLanguage] = React.useState<LanguageType>('en');
  useEffect(() => {
    const getLanguage = async () => {
      const lang = await reduxStorage.getItem('language');
      setLanguage(lang);
    };
    getLanguage();
  }, []);
  const {
    backgroundColor,
    containerColor,
    textColor,
    borderColor,
    cardWalletTitleColor,
  } = useAppSelector((state: StoreState) => state.ThemeSlice);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  const onChangeLanguage = async (lang: LanguageType) => {
    await reduxStorage.setItem('language', lang);
    dispatch(updateLanguage(lang));
    dispatch(fetchHabits());
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: backgroundColor}}>
      <Header title={t('languages')} canGoBack={true} handleGoBack={goBack} />

      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={{
            ...styles.itemContainer,
            backgroundColor: containerColor,
            borderColor: language === 'en' ? cardWalletTitleColor : borderColor,
          }}
          onPress={() => onChangeLanguage('en')}>
          <View style={{flexDirection: 'row'}}>
            <IconEnglish />
            <Text style={{...styles.text, color: textColor}}>English (US)</Text>
          </View>
          <View
            style={{
              ...styles.checkBox,
              borderColor:
                language === 'en' ? cardWalletTitleColor : borderColor,
            }}>
            {language === 'en' && (
              <View
                style={{
                  ...styles.checkDot,
                  backgroundColor: cardWalletTitleColor,
                }}
              />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.itemContainer,
            backgroundColor: containerColor,
            borderColor: language === 'vi' ? cardWalletTitleColor : borderColor,
          }}
          onPress={() => onChangeLanguage('vi')}>
          <View style={{flexDirection: 'row'}}>
            <IconVietNam />
            <Text style={{...styles.text, color: textColor}}>Tiếng Việt</Text>
          </View>
          <View
            style={{
              ...styles.checkBox,
              borderColor:
                language === 'vi' ? cardWalletTitleColor : borderColor,
            }}>
            {language === 'vi' && (
              <View
                style={{
                  ...styles.checkDot,
                  backgroundColor: cardWalletTitleColor,
                }}
              />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.itemContainer,
            backgroundColor: containerColor,
            borderColor: language === 'cn' ? cardWalletTitleColor : borderColor,
          }}
          onPress={() => onChangeLanguage('cn')}>
          <View style={{flexDirection: 'row'}}>
            <IconChina />
            <Text style={{...styles.text, color: textColor}}>Chinese</Text>
          </View>
          <View
            style={{
              ...styles.checkBox,

              borderColor:
                language === 'cn' ? cardWalletTitleColor : borderColor,
            }}>
            {language === 'cn' && (
              <View
                style={{
                  ...styles.checkDot,
                  backgroundColor: cardWalletTitleColor,
                }}
              />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.itemContainer,
            backgroundColor: containerColor,
            borderColor: language === 'kr' ? cardWalletTitleColor : borderColor,
          }}
          onPress={() => onChangeLanguage('kr')}>
          <View style={{flexDirection: 'row'}}>
            <IconKorea />
            <Text style={{...styles.text, color: textColor}}>Korea</Text>
          </View>
          <View
            style={{
              ...styles.checkBox,
              borderColor:
                language === 'kr' ? cardWalletTitleColor : borderColor,
            }}>
            {language === 'kr' && (
              <View
                style={{
                  ...styles.checkDot,
                  backgroundColor: cardWalletTitleColor,
                }}
              />
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

export default LanguageScreen;
