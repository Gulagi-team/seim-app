/* eslint-disable react-native/no-inline-styles */
import POINT_SEIM from '@/assets/images/point_seim.png';
import React, {useEffect, useState} from 'react';

import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

import BACKGROUND_REWARD from '@/assets/images/background_reward.png';
import {getShortAddress} from '@/helpers/conversion';
import {StoreState, useAppSelector} from '@/store';
import {checkProgressOfHabit} from '@/store/habits/action';
import {
  FONT_SIZE,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
} from '@/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {useTranslation} from 'react-i18next';
import {getMiningInfo} from '@/store/mining/action';

export const WalletBalance = () => {
  const currentAccount = useAppSelector(
    state => state.walletSlice.currentAccount,
  );
  const {textColor} = useAppSelector((state: StoreState) => state.ThemeSlice);
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text
        style={{
          fontFamily: POPPINS_MEDIUM,
          fontSize: FONT_SIZE.small1,
          fontWeight: '500',
          color: textColor,
          paddingRight: 5,
        }}>
        {getShortAddress(currentAccount)}
      </Text>
      <Icon name="content-copy" style={{fontSize: FONT_SIZE.small1}} />
    </View>
  );
};

const WalletCard = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const [total, setTotal] = useState(0);

  const {miningEarned} = useSelector((state: StoreState) => state.userInfo);
  const {t} = useTranslation(['setting', 'mining']);
  const {
    cardWalletBackgroundColor,
    cardWalletBorderColor,
    textOutstandingColor,
  } = useAppSelector((state: StoreState) => state.ThemeSlice);

  useEffect(() => {
    const getPoints = async () => {
      const totalPointsTask = await AsyncStorage.getItem('totalPointsTask');
      const mineEarned = miningEarned ? parseFloat(miningEarned.toString()) : 0;

      const parsedTotalPointsTask = parseFloat(
        totalPointsTask?.toString() as string,
      );
      const totalReward = mineEarned + parsedTotalPointsTask;
      setTotal(parseFloat(totalReward.toFixed(2)));
    };
    dispatch(checkProgressOfHabit());
    dispatch(getMiningInfo());

    getPoints();
  }, [miningEarned]);

  return (
    <View
      style={{
        ...styles.cardContainer,
        backgroundColor: cardWalletBackgroundColor,
        borderColor: cardWalletBorderColor,
      }}>
      <Image
        source={BACKGROUND_REWARD}
        style={styles.imageBackgroundReward}
        resizeMode={'contain'}
      />
      <Text style={styles.rewardText}>{t('mining:currentReward')}</Text>
      <View style={styles.pointContainer}>
        <Image
          source={POINT_SEIM}
          style={styles.imagePoint}
          resizeMode={'contain'}
        />

        <Text style={{...styles.pointText, color: textOutstandingColor}}>
          {total}
        </Text>
      </View>
    </View>
  );
};

export default WalletCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 100,
    position: 'relative',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 12,
    borderRadius: 10,
  },
  imageBackgroundReward: {
    width: '70%',
    height: 150,
    position: 'absolute',
    right: 0,
  },
  balanceText: {
    fontFamily: POPPINS_MEDIUM,
    fontSize: FONT_SIZE.tiny0,
    fontWeight: '500',
  },
  balanceContainer: {
    flexDirection: 'row',
    // marginTop: 5,
    alignItems: 'center',
  },

  balanceTokenText: {
    marginLeft: 5,
    fontFamily: POPPINS_MEDIUM,
    fontSize: FONT_SIZE.medium0,
    fontWeight: '600',
  },
  rewardText: {
    marginTop: 15,
    fontSize: FONT_SIZE.medium0,
    fontWeight: '500',
    color: '#1B9CFC',
    marginLeft: 10,
    fontFamily: POPPINS_REGULAR,
  },
  pointContainer: {
    // marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    // borderColor: '#B5DCFB',
    // borderWidth: 1,
    // flex: 1,
  },
  imagePoint: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  pointText: {
    fontSize: FONT_SIZE.medium0,
    fontWeight: '700',
    marginLeft: 5,
    fontFamily: POPPINS_BOLD,
  },
});
