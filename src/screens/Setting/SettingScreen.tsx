import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useEffect, useState} from 'react';
import {StoreState, reduxStorage, useAppSelector} from '@/store';
import {useDispatch} from 'react-redux';
import {fetchLessions} from '@/store/lessions';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {styles} from './SettingScreen.styles';
import UserAvatar from '@/components/UserAvatar';
import * as Progress from 'react-native-progress';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import {deviceWidth} from '@/constants/layout';
import {COLORS} from '@/theme';
import IconProfile from '@/assets/icons/icon_profile.svg';
import IconDarkProfile from '@/assets/icons/darkmode/icon_profile_dark.svg';
import IconLanguage from '@/assets/icons/icon_language.svg';
import IconDarkLanguage from '@/assets/icons/darkmode/icon_language_dark.svg';
import IconTheme from '@/assets/icons/icon_theme.svg';
import IconDarkTheme from '@/assets/icons/darkmode/icon_theme_dark.svg';
import IconFeedback from '@/assets/icons/icon_feedback.svg';
import IconDarkFeedback from '@/assets/icons/darkmode/icon_feedback_dark.svg';
import IconLogout from '@/assets/icons/icon_logout.svg';
import {navigate, navigateReset} from '@/helpers/navigation';
import Enter from '@/components/motion/Enter';
import PressableScale from '@/components/motion/PressableScale';
import SCREENS from '@/constants/screen';

const SettingScreen = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const {avatar, name} = useAppSelector((state: StoreState) => state.userInfo);
  const {
    isDarkMode,
    backgroundColor,
    containerColor,
    textColor,
    textOutstandingColor,
    borderColor,
  } = useAppSelector((state: StoreState) => state.ThemeSlice);

  useEffect(() => {
    dispatch(fetchLessions());
  }, []);

  //------
  const menuItems = [
    {
      key: 'profile',
      label: 'My profile',
      screen: SCREENS.PROFILE,
      icon: isDarkMode ? IconDarkProfile : IconProfile,
    },
    {
      key: 'language',
      label: 'Language',
      screen: SCREENS.LANGUAGE,
      icon: isDarkMode ? IconDarkLanguage : IconLanguage,
    },
    {
      key: 'theme',
      label: 'Theme',
      screen: SCREENS.DISPLAY,
      icon: isDarkMode ? IconDarkTheme : IconTheme,
    },
    {
      key: 'feedback',
      label: 'Feedback',
      screen: SCREENS.FEEDBACK,
      icon: isDarkMode ? IconDarkFeedback : IconFeedback,
    },
  ];

  const handleLogout = () => {
    reduxStorage.setItem('userInfo', '');
    navigateReset(SCREENS.WELCOME);
  };

  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: backgroundColor}}>
      <View style={styles.containerView}>
        <View
          style={{
            ...styles.bodyContainer,
            backgroundColor: containerColor,
            borderColor: borderColor,
          }}>
          <Enter delay={60} distance={12}>
            <View style={styles.profileContainer}>
            <UserAvatar style={styles.avatar} />
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
          </Enter>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Enter key={item.key} delay={150 + index * 55} distance={10}>
                <PressableScale
                  style={styles.itemContainer}
                  scaleTo={0.98}
                  onPress={() => navigate(item.screen)}>
                  <Icon />
                  <Text style={{...styles.itemText, color: textColor}}>
                    {item.label}
                  </Text>
                </PressableScale>
              </Enter>
            );
          })}
          <Enter delay={150 + menuItems.length * 55} distance={10}>
            <PressableScale
              style={styles.itemContainer}
              scaleTo={0.98}
              onPress={handleLogout}>
              <IconLogout />
              <Text style={{...styles.itemText, color: textColor}}>Log out</Text>
            </PressableScale>
          </Enter>
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
