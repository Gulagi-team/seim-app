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
import {LessionType} from '@/types/colection';
import PackItem from '@/components/listItem/PackItem';
import {StoreState, reduxStorage, useAppSelector} from '@/store';
import {useDispatch} from 'react-redux';
import {fetchLessions} from '@/store/lessions';
import {navigate} from '@/helpers/navigation';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {Spinner} from '@gluestack-ui/themed';
import {styles} from './ProfileScreen.styles';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import IconBarChart from '@/assets/icons/icon_bar_chart.svg';
import Header from '@/components/Header';
import {deviceWidth} from '@/constants/layout';
import {COLORS} from '@/theme';
import {useNavigation} from '@react-navigation/native';
import {BarChart} from 'react-native-gifted-charts';

const ProfileScreen = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  const lessionsSelected = useAppSelector(
    (state: StoreState) => state.LessionSlice.lessionsSelected,
  );

  const {email, name, avatar} = useAppSelector(
    (state: StoreState) => state.userInfo,
  );

  useEffect(() => {
    dispatch(fetchLessions());
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
    <SafeAreaView style={styles.container}>
      <Header title="PROFILE" canGoBack={true} handleGoBack={goBack} />
      <ScrollView style={styles.scrollviewContainer}>
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
            <Text style={styles.userName}>{name}</Text>

            <View style={styles.levelContainer}>
              <Text style={styles.levelText}>Level: Bronze</Text>
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
        <View style={styles.activityContainer}>
          <View style={styles.activityTitleContainer}>
            <Text style={styles.recentText}>Activity</Text>
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
            xAxisLabelTextStyle={styles.weekdayText}
            data={barData}
            dashWidth={0}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoContainer1}>
            <View style={styles.bmiContainer}>
              <Text style={styles.keyInfoText}>Weight</Text>
              <Text style={styles.valueInfoText}>60 kg</Text>
            </View>
            <View style={styles.bmiContainer}>
              <Text style={styles.keyInfoText}>Height</Text>
              <Text style={styles.valueInfoText}>170 cm</Text>
            </View>
          </View>
          <View style={styles.infoContainer1}>
            <View style={styles.bmiContainer}>
              <Text style={styles.keyInfoText}>Age</Text>
              <Text style={styles.valueInfoText}>21</Text>
            </View>
            <View style={styles.bmiContainer}>
              <Text style={styles.keyInfoText}>BMI</Text>
              <Text style={styles.valueInfoText}>19.7</Text>
            </View>
          </View>
        </View>
        <View style={styles.recentContainer}>
          <Text style={styles.recentText}>Recent packs</Text>
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
