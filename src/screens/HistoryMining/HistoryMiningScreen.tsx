import POINT_SEIM from '@/assets/images/point_seim.png';

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {styles} from './HistoryMiningScreen.styles';
import Header from '@/components/Header';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {StoreState, useAppSelector} from '@/store';
import {getAuth} from '@/store/auth';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {getAllMine} from '@/store/mining/action';
import {Filter, MiningData} from '@/types/colection';
import {stringUtils} from '@/utils/string';
import ICON_VALID from '@/assets/icons/icon_valid.svg';

const timeAgos = [
  'other:secondAgo',
  'other:minuteAgo',
  'other:hourAgo',
  'other:dayAgo',
  'other:weekAgo',
  'other:dayAgo',
  'other:monthAgo',
  'other:yearAgo',
];

const HistoryMiningScreen = () => {
  const {t} = useTranslation(['mining', 'other']);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  const {textOutstandingColor} = useAppSelector(
    (state: StoreState) => state.ThemeSlice,
  );
  const [filter, setFilter] = useState<Filter>({
    page: 1,
    limit: 100,
    sortBy: 'createdAt',
    sortDir: 'DESC',
  });
  const {histories} = useSelector((state: StoreState) => state.MiningSlice);
  useEffect(() => {
    const getData = async () => {
      const userExist = await getAuth();
      if (userExist) {
        dispatch(getAllMine(filter));
      }
    };
    getData();
  }, []);
  return (
    <SafeAreaView style={{...styles.container}}>
      <Header
        title={t('mining:miningHistory')}
        canGoBack={true}
        handleGoBack={goBack}
      />

      {histories.length === 0 && (
        <ActivityIndicator size="large" color="#00ff00" />
      )}
      {histories.length > 0 && (
        <ScrollView style={styles.scrollView}>
          {histories.map((item: MiningData) => {
            const {time, level} = stringUtils.caculateTimeAgos(
              item.createdAt as string,
            );
            const timeAgo = t(timeAgos[level], {time});
            return (
              <View key={item.id} style={styles.item}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      ...styles.itemContainer,
                    }}>
                    <Image
                      source={POINT_SEIM}
                      style={styles.imagePoint}
                      resizeMode={'contain'}
                    />
                    <Text
                      style={{
                        ...styles.pointText,
                        color: textOutstandingColor,
                      }}>
                      {item.point} POINT
                    </Text>
                  </View>
                  <Text
                    style={{...styles.timeText, color: textOutstandingColor}}>
                    {item.isClaimed && <ICON_VALID />}
                  </Text>
                </View>
                <Text style={{...styles.timeText, color: textOutstandingColor}}>
                  {timeAgo}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default HistoryMiningScreen;
