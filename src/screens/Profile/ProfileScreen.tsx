import Header from '@/components/Header';
import PackItem from '@/components/listItem/PackItem';
import {deviceWidth} from '@/constants/layout';
import {StoreState, useAppSelector} from '@/store';
import {fetchTopics} from '@/store/topics/action';
import {COLORS} from '@/theme';
import {useNavigation} from '@react-navigation/native';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BarChart} from 'react-native-gifted-charts';
import * as Progress from 'react-native-progress';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './ProfileScreen.styles';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {getStringLocal} from '@/helpers/localStorage';
import {getAuth} from '@/store/auth';
import {UserProfileType} from '@/types/colection';
import {stringUtils} from '@/utils/string';
const ProfileScreen = () => {
  const {t} = useTranslation(['setting']);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  const habits = useAppSelector(
    (state: StoreState) => state.HabitsSlide.habits,
  );
  const getUserInfoLocal = getStringLocal('userInfo');
  const {weight, height, old} = JSON.parse(getUserInfoLocal as string);

  const [userInfor, setUserInfor] = React.useState<UserProfileType>();
  const {
    backgroundColor,
    containerColor,
    textColor,
    textOutstandingColor,
    borderColor,
  } = useAppSelector((state: StoreState) => state.ThemeSlice);
  const {miningData} = useSelector((state: StoreState) => state.MiningSlice);

  useEffect(() => {
    const getInfo = async () => {
      const user = await getAuth();
      if (user) {
        setUserInfor(user);
      }
    };
    getInfo();

    dispatch(fetchTopics());
  }, []);

  const barData = [
    {value: 250, label: 'Mo'},
    {value: 500, label: 'Tu'},
    {value: 745, label: 'We'},
    {value: 320, label: 'Th'},
    {value: 600, label: 'Fr'},
    {value: 256, label: 'Sa'},
    {value: 300, label: 'Su'},
  ];

  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: backgroundColor}}>
      <Header title={t('profile')} canGoBack={true} handleGoBack={goBack} />
      <ScrollView style={styles.scrollviewContainer}>
        <View
          style={{
            ...styles.profileContainer,
            backgroundColor: containerColor,
            borderColor: borderColor,
          }}>
          <FastImage
            style={styles.avatar}
            source={{
              uri: userInfor?.avatar
                ? userInfor.avatar
                : 'https://p16-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/a6f08bb5d661b2839f5be9f2fb755f47.jpeg',
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={styles.nameContainer}>
            <Text style={{...styles.userName, color: textOutstandingColor}}>
              {userInfor?.name}
            </Text>

            <View style={styles.levelContainer}>
              <Text style={{...styles.levelText, color: textColor}}>
                {t('level', {level: miningData.level})}
              </Text>
              <Text
                style={{...styles.percentText, color: textOutstandingColor}}>
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
        <View
          style={{
            ...styles.activityContainer,
            backgroundColor: containerColor,
            borderColor: borderColor,
          }}>
          <View style={styles.activityTitleContainer}>
            <Text style={{...styles.recentText, color: textOutstandingColor}}>
              {t('activity')}
            </Text>
            <TouchableOpacity>
              <Text style={styles.seeMoreText}>{t('seeAll')}</Text>
            </TouchableOpacity>
          </View>
          <BarChart
            barWidth={20}
            stepHeight={5}
            // xAxisLength={12}
            // noOfSections={4}
            hideAxesAndRules={true}
            rulesLength={0}
            // barBorderRadius={4}
            frontColor={COLORS.primary_A500}
            xAxisLabelTextStyle={{...styles.weekdayText, color: textColor}}
            data={barData}
            dashWidth={0}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoContainer1}>
            <View
              style={{
                ...styles.bmiContainer,
                backgroundColor: containerColor,
                borderColor: borderColor,
              }}>
              <Text style={{...styles.keyInfoText, color: textColor}}>
                {t('weight')}
              </Text>
              <Text
                style={{...styles.valueInfoText, color: textOutstandingColor}}>
                {weight} kg
              </Text>
            </View>
            <View
              style={{
                ...styles.bmiContainer,
                backgroundColor: containerColor,
                borderColor: borderColor,
              }}>
              <Text style={{...styles.keyInfoText, color: textColor}}>
                {t('height')}
              </Text>
              <Text
                style={{...styles.valueInfoText, color: textOutstandingColor}}>
                {height} cm
              </Text>
            </View>
          </View>
          <View style={styles.infoContainer1}>
            <View
              style={{
                ...styles.bmiContainer,
                backgroundColor: containerColor,
                borderColor: borderColor,
              }}>
              <Text style={{...styles.keyInfoText, color: textColor}}>Age</Text>
              <Text
                style={{...styles.valueInfoText, color: textOutstandingColor}}>
                {old}
              </Text>
            </View>
            <View
              style={{
                ...styles.bmiContainer,
                backgroundColor: containerColor,
                borderColor: borderColor,
              }}>
              <Text style={{...styles.keyInfoText, color: textColor}}>BMI</Text>
              <Text
                style={{...styles.valueInfoText, color: textOutstandingColor}}>
                {Math.round(
                  (Number(weight) / Math.pow(Number(height) / 100, 2)) * 10,
                ) / 10}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.recentContainer}>
          <Text style={{...styles.recentText, color: textOutstandingColor}}>
            {t('recentPacks')}
          </Text>
          <TouchableOpacity>
            <Text style={styles.seeMoreText}>{t('seeAll')}</Text>
          </TouchableOpacity>
        </View>

        {habits.map(item => (
          <PackItem lession={item} key={item.habit.id} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
