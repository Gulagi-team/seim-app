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
import {Spinner} from '@gluestack-ui/themed';
import {styles} from './SettingScreen.styles';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import WalletCard from '@/components/WalletCard/WalletCard';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import {deviceWidth} from '@/constants/layout';
import {COLORS} from '@/theme';
import IconProfile from '@/assets/icons/icon_profile.svg';
import IconLanguage from '@/assets/icons/icon_language.svg';
import IconGift from '@/assets/icons/icon_gift.svg';
import IconFeedback from '@/assets/icons/icon_feedback.svg';
import IconLogout from '@/assets/icons/icon_logout.svg';
import {navigate, navigateReset} from '@/helpers/navigation';
import SCREENS from '@/constants/screen';

const SettingScreen = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const {avatar, name} = useAppSelector((state: StoreState) => state.userInfo);

  useEffect(() => {
    dispatch(fetchLessions());
  }, []);

  //------
  const handleLogout = () => {
    reduxStorage.setItem('userInfo', '');
    navigateReset(SCREENS.LOGIN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerView}>
        <WalletCard />
        <View style={styles.bodyContainer}>
          <View style={styles.profileConatiner}>
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
              <Text style={styles.userName}>{name}</Text>

              <View style={styles.levelContainer}>
                <Text style={styles.levelText}>Level.2</Text>
                <Text style={styles.percentText}>115/500</Text>
              </View>
              <Progress.Bar
                progress={0.4}
                width={deviceWidth - 121}
                color={COLORS.secondary_orange1}
                unfilledColor={COLORS.text_A100}
                borderWidth={0}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigate(SCREENS.PROFILE)}>
            <IconProfile />
            <Text style={styles.itemText}>My profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigate(SCREENS.LANGUAGE)}>
            <IconLanguage />
            <Text style={styles.itemText}>Language</Text>
          </TouchableOpacity>
          {/* <View style={styles.itemContainer}>
            <IconProfile />
            <Text style={styles.itemText}>Level.2</Text>
          </View> */}
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigate(SCREENS.REFERRAL)}>
            <IconGift />
            <Text style={styles.itemText}>Refferal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigate(SCREENS.FEEDBACK)}>
            <IconFeedback />
            <Text style={styles.itemText}>Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemContainer} onPress={handleLogout}>
            <IconLogout />
            <Text style={styles.itemText}>Log out</Text>
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
