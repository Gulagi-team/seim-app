/* eslint-disable react-native/no-inline-styles */
import React, {useState, useTransition} from 'react';

import IconDarkFeedback from '@/assets/icons/darkmode/icon_feedback_dark.svg';
import IconDarkGift from '@/assets/icons/darkmode/icon_gift_dark.svg';
import IconDarkLanguage from '@/assets/icons/darkmode/icon_language_dark.svg';
import IconDarkProfile from '@/assets/icons/darkmode/icon_profile_dark.svg';
import IconDarkTheme from '@/assets/icons/darkmode/icon_theme_dark.svg';
import IconFeedback from '@/assets/icons/icon_feedback.svg';
import IconGift from '@/assets/icons/icon_gift.svg';
import IconLanguage from '@/assets/icons/icon_language.svg';
import IconLogout from '@/assets/icons/icon_logout.svg';
import IconProfile from '@/assets/icons/icon_profile.svg';
import IconTheme from '@/assets/icons/icon_theme.svg';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import WalletCard from '@/components/WalletCard/WalletCard';
import {deviceWidth} from '@/constants/layout';
import SCREENS from '@/constants/screen';
import {navigate, navigateReset} from '@/helpers/navigation';
import {StoreState, reduxStorage, useAppSelector} from '@/store';
import {fetchTopics} from '@/store/topics/action';
import LogoSeim from '@/assets/images/logoSeim.png';

import {COLORS} from '@/theme';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {useEffect} from 'react';
import {
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './SettingScreen.styles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import {UserProfileType} from '@/types/colection';
import {getMiningInfo} from '@/store/mining/action';
import {stringUtils} from '@/utils/string';
import {getInfoUser} from '@/store/userInfo/action';
import {getStringLocal} from '@/helpers/localStorage';
const SettingScreen = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const [showAlert, setShowAlert] = useState(false);
  const {t} = useTranslation(['setting']);

  const {
    isDarkMode,
    backgroundColor,
    containerColor,
    textColor,
    textOutstandingColor,
    borderColor,
  } = useAppSelector((state: StoreState) => state.ThemeSlice);
  const [userInfor, setUserInfor] = React.useState<UserProfileType>();
  const {miningData} = useSelector((state: StoreState) => state.MiningSlice);

  const getUser = async () => {
    try {
      // await AsyncStorage.removeItem('userInfo');
      const user = await AsyncStorage.getItem('userInfo');
      const getUserInfoLocal = getStringLocal('userInfo');
      const {name} = JSON.parse(getUserInfoLocal as string);
      if (user) {
        console.log('name', name);
        const info = JSON.parse(user);
        setUserInfor({
          ...info,
          name: name !== '' ? name : info.name,
        });
        dispatch(getInfoUser());
        dispatch(getMiningInfo());

        if (info.access_token === '') {
          navigateReset(SCREENS.LOGIN);
        }
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Failed to load user info:', error);
      navigateReset(SCREENS.LOGIN);
    }
  };
  useEffect(() => {
    getUser();
    dispatch(fetchTopics());
  }, []);

  //------
  const handleLogout = async () => {
    // reduxStorage.setItem('userInfo', '');
    await AsyncStorage.removeItem('userInfo');

    navigateReset(SCREENS.LOGIN);
  };

  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: backgroundColor}}>
      {showAlert && (
        <View
          style={{
            ...styles.containerView,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={LogoSeim}
            style={styles.imageLogo}
            resizeMode={'contain'}
          />
          <Text style={styles.modal_message}>{t('setting:warning')}</Text>
          <Pressable
            style={[styles.modal_button, styles.modal_quitButton]}
            onPress={() => {
              navigateReset(SCREENS.LOGIN);
            }}>
            <Text style={styles.modal_quitButtonText}>
              {t('setting:loginNow')}
            </Text>
          </Pressable>
        </View>
      )}
      {!showAlert && (
        <View style={styles.containerView}>
          <WalletCard />
          <View
            style={{
              ...styles.bodyContainer,
              backgroundColor: containerColor,
              borderColor: borderColor,
            }}>
            <View style={styles.profileContainer}>
              <FastImage
                style={styles.avatar}
                source={{
                  uri: userInfor?.avatar
                    ? userInfor?.avatar
                    : 'https://p16-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/a6f08bb5d661b2839f5be9f2fb755f47.jpeg',
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <View style={styles.nameContainer}>
                <Text style={{...styles.userName, color: textOutstandingColor}}>
                  {userInfor?.name}
                </Text>

                <View style={styles.levelContainer}>
                  <Text style={styles.levelText}>
                    {t('level', {level: miningData.level})}
                  </Text>
                  <Text
                    style={{
                      ...styles.percentText,
                      color: textOutstandingColor,
                    }}>
                    {miningData.totalInvite}/
                    {stringUtils.getMaxInviteByLevel(miningData.level)}
                  </Text>
                </View>
                <Progress.Bar
                  progress={
                    miningData.totalInvite /
                    stringUtils.getMaxInviteByLevel(miningData.level)
                  }
                  width={deviceWidth - 121}
                  color={COLORS.secondary_orange1}
                  unfilledColor={borderColor}
                  borderWidth={0}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => navigate(SCREENS.PROFILE)}>
              {isDarkMode ? <IconDarkProfile /> : <IconProfile />}
              <Text style={{...styles.itemText, color: textColor}}>
                {t('myProfile')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => navigate(SCREENS.LANGUAGE)}>
              {isDarkMode ? <IconDarkLanguage /> : <IconLanguage />}
              <Text style={{...styles.itemText, color: textColor}}>
                {t('languages')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => navigate(SCREENS.REFERRAL)}>
              {isDarkMode ? <IconDarkGift /> : <IconGift />}

              <Text style={{...styles.itemText, color: textColor}}>
                {t('referral')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => navigate(SCREENS.FEEDBACK)}>
              {isDarkMode ? <IconDarkFeedback /> : <IconFeedback />}

              <Text style={{...styles.itemText, color: textColor}}>
                {t('feedback')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={handleLogout}>
              <IconLogout />
              <Text style={{...styles.itemText, color: textColor}}>
                {t('logout')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Image
        style={styles.welcomeBottom}
        source={WelcomeBottom}
        resizeMode={'stretch'}
      />
    </SafeAreaView>
  );
};

export default SettingScreen;
