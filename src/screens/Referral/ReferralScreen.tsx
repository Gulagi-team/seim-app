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
import {navigate} from '@/helpers/navigation';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {styles} from './ReferralScreen.styles';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import IconBarChart from '@/assets/icons/icon_bar_chart.svg';
import Header from '@/components/Header';
import {deviceWidth} from '@/constants/layout';
import {COLORS} from '@/theme';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import BACKGROUND_GIFT from '@/assets/images/gift.png';
import BACKGROUND_FIREWORK from '@/assets/images/firework.png';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ReferralScreen = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Referral" canGoBack={true} handleGoBack={goBack} />
      <View style={styles.containerView}>
        <LinearGradient
          style={styles.bannerContainer}
          locations={[0, 1]}
          colors={['#47A0FF', '#7ED6DF']}
          useAngle={true}>
          <View style={{marginLeft: 10}}>
            <View style={{flexDirection: 'row', height: 18}}>
              <Text style={styles.bannerText}>Get</Text>
              <Text style={styles.seimText}>100 SEIM</Text>
            </View>
            <Text style={styles.bannerText}>for each successful referral</Text>
          </View>
          <FastImage
            style={styles.imageBackgroundGift}
            source={BACKGROUND_GIFT}
            resizeMode={FastImage.resizeMode.contain}
          />
          <FastImage
            style={styles.imageBackgroundFirework}
            source={BACKGROUND_FIREWORK}
            resizeMode={FastImage.resizeMode.contain}
          />
        </LinearGradient>
        <View style={styles.bodyContainer}>
          <Text style={styles.titleText}>Referral code</Text>
          <TouchableOpacity style={styles.referralCodeContainer}>
            <Text style={styles.titleText}>Referral code</Text>
            <Icon
              name="content-copy"
              style={{fontSize: 20, color: '#1B9CFC'}}
            />
          </TouchableOpacity>
          <Text style={styles.titleText}>Referral code</Text>
          <TouchableOpacity style={styles.referralCodeContainer}>
            <Text style={styles.titleText}>Referral code</Text>
            <Icon
              name="content-copy"
              style={{fontSize: 20, color: '#1B9CFC'}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReferralScreen;
