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
import {useDispatch} from 'react-redux';
import {styles} from './ProfileScreen.styles';

const ProfileScreen = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  const lessionsSelected = useAppSelector(
    (state: StoreState) => state.LessionSlice.lessionsSelected,
  );

  const {name, avatar} = useAppSelector((state: StoreState) => state.userInfo);

  const {
    backgroundColor,
    containerColor,
    textColor,
    textOutstandingColor,
    borderColor,
  } = useAppSelector((state: StoreState) => state.ThemeSlice);

  useEffect(() => {
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
      <Header title="Profile" canGoBack={true} handleGoBack={goBack} />
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
              <Text style={{...styles.levelText, color: textColor}}>
                Level: Bronze
              </Text>
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
        <View
          style={{
            ...styles.activityContainer,
            backgroundColor: containerColor,
            borderColor: borderColor,
          }}>
          <View style={styles.activityTitleContainer}>
            <Text style={{...styles.recentText, color: textOutstandingColor}}>
              Activity
            </Text>
            <TouchableOpacity>
              <Text style={styles.seeMoreText}>See all</Text>
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
                Weight
              </Text>
              <Text
                style={{...styles.valueInfoText, color: textOutstandingColor}}>
                60 kg
              </Text>
            </View>
            <View
              style={{
                ...styles.bmiContainer,
                backgroundColor: containerColor,
                borderColor: borderColor,
              }}>
              <Text style={{...styles.keyInfoText, color: textColor}}>
                Height
              </Text>
              <Text
                style={{...styles.valueInfoText, color: textOutstandingColor}}>
                170 cm
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
                21
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
                19.7
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.recentContainer}>
          <Text style={{...styles.recentText, color: textOutstandingColor}}>
            Recent packs
          </Text>
          <TouchableOpacity>
            <Text style={styles.seeMoreText}>See all</Text>
          </TouchableOpacity>
        </View>

        {lessionsSelected.map(item => (
          <PackItem lession={item} key={item.lession_key} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
