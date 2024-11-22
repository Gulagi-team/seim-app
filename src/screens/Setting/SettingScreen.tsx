import React from 'react';

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
import {COLORS} from '@/theme';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {useEffect} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {styles} from './SettingScreen.styles';

import AsyncStorage from '@react-native-async-storage/async-storage';
const SettingScreen = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const {avatar, name, access_token} = useAppSelector(
    (state: StoreState) => state.userInfo,
  );

  const {
    isDarkMode,
    backgroundColor,
    containerColor,
    textColor,
    textOutstandingColor,
    borderColor,
  } = useAppSelector((state: StoreState) => state.ThemeSlice);

  const getUser = async () => {
    try {
      // await AsyncStorage.removeItem('userInfo');
      const user = await AsyncStorage.getItem('userInfo');
      if (user) {
        const info = JSON.parse(user);
        if (info.access_token === '') {
          navigateReset(SCREENS.LOGIN);
        }
      } else {
        navigateReset(SCREENS.LOGIN);
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
  const handleLogout = () => {
    reduxStorage.setItem('userInfo', '');
    navigateReset(SCREENS.LOGIN);
  };

  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: backgroundColor}}>
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
                uri: avatar
                  ? avatar
                  : 'https://p16-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/a6f08bb5d661b2839f5be9f2fb755f47.jpeg',
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View style={styles.nameContainer}>
              <Text style={{...styles.userName, color: textOutstandingColor}}>
                {name}
              </Text>

              <View style={styles.levelContainer}>
                <Text style={styles.levelText}>Level.2</Text>
                <Text
                  style={{...styles.percentText, color: textOutstandingColor}}>
                  115/500
                </Text>
              </View>
              <Progress.Bar
                progress={0.4}
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
              My profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigate(SCREENS.LANGUAGE)}>
            {isDarkMode ? <IconDarkLanguage /> : <IconLanguage />}
            <Text style={{...styles.itemText, color: textColor}}>Language</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigate(SCREENS.DISPLAY)}>
            {isDarkMode ? <IconDarkTheme /> : <IconTheme />}
            <Text style={{...styles.itemText, color: textColor}}>Theme</Text>
          </TouchableOpacity>
          {/* <View style={styles.itemContainer}>
            <IconProfile />
            <Text style={styles.itemText}>Level.2</Text>
          </View> */}
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigate(SCREENS.REFERRAL)}>
            {isDarkMode ? <IconDarkGift /> : <IconGift />}

            <Text style={{...styles.itemText, color: textColor}}>Refferal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigate(SCREENS.FEEDBACK)}>
            {isDarkMode ? <IconDarkFeedback /> : <IconFeedback />}

            <Text style={{...styles.itemText, color: textColor}}>Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemContainer} onPress={handleLogout}>
            <IconLogout />
            <Text style={{...styles.itemText, color: textColor}}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Image
        style={styles.welcomeBottom}
        source={WelcomeBottom}
        resizeMode={'stretch'}
      />
    </SafeAreaView>
  );
};

export default SettingScreen;
