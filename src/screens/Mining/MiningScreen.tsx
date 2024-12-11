import IconDiamond from '@/assets/icons/icon_diamond.svg';
import {showToast} from '@/helpers/toast';

import IconChevronRight from '@/assets/icons/icon_chevron_right.svg';
import IconPool from '@/assets/icons/icon_pool.svg';
import IconSpeed from '@/assets/icons/icon_speed.svg';
import IconUser from '@/assets/icons/icon_user.svg';
import BACKGROUND_REWARD from '@/assets/images/background_reward.png';
import POINT_SEIM from '@/assets/images/point_seim.png';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import CountdownTimer from '@/components/TimerCountdown/TimerCountdown';
import SCREENS from '@/constants/screen';
import {navigate, navigateReset} from '@/helpers/navigation';
import {StoreState, useAppSelector} from '@/store';
import {getAuth} from '@/store/auth';
import {claimMine, getMiningInfo, startMine} from '@/store/mining/action';
import {MiningData, UserProfileType} from '@/types/colection';
import {stringUtils} from '@/utils/string';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThunkDispatch} from '@reduxjs/toolkit';
import LottieView from 'lottie-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  Modal,
  Platform,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './MiningScreen.styles';

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-6403260985969215~4923743988';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
  requestNonPersonalizedAdsOnly: true,
});
const MiningScreen = () => {
  const AMOUNT_MINING = 1;

  const [isMining, setIsMining] = useState(false);
  const {t} = useTranslation(['mining', 'other']);
  const anim = useRef<LottieView>(null);
  // const endDate = useAppSelector(
  //   (state: StoreState) => state.MiningSlice.miningData.endDate,
  // );

  const [endDate, setEndDate] = useState(0);
  const [startDate, setStartDate] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [currentReward, setCurrentReward] = useState(0);
  const [totalReward, setTotalReward] = useState(AMOUNT_MINING);
  const {
    backgroundColor,
    containerColor,
    textColor,
    textOutstandingColor,
    borderColor,
    cardWalletBackgroundColor,
    cardWalletBorderColor,
  } = useAppSelector((state: StoreState) => state.ThemeSlice);
  const [deviceId, setDeviceId] = useState('');
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {status: miningStatus, miningData} = useSelector(
    (state: StoreState) => state.MiningSlice,
  );
  const [user, setUser] = useState<UserProfileType | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const userExist = await getAuth();
      if (userExist) {
        setShowAlert(false);
        setUser(userExist);
        dispatch(getMiningInfo());
        const reward = await AsyncStorage.getItem('totalReward');
        if (reward) {
          setTotalReward(parseFloat(reward));
        }
      } else {
        setShowAlert(true);
      }
    };
    getData();

    DeviceInfo.getUniqueId().then(uniqueId => {
      setDeviceId(uniqueId);
    });
  }, []);

  const [loaded, setLoaded] = useState(false);

  const startMinining = async () => {
    const boostAdjust = miningData.boost ?? 0;
    const currentDate = new Date();
    const start = currentDate.getTime(); // Current timestamp in milliseconds
    const durationInMs = 5 * 1000; // 24 hours in milliseconds
    const adjustedDuration = stringUtils.calculateTimeAdjustment(boostAdjust);
    const data: MiningData = {
      startDate: start,
      endDate: start + durationInMs - adjustedDuration,
      point: AMOUNT_MINING,
      level: 0,
      miningRate: AMOUNT_MINING.toString(),
      totalInvite: 0,
      totalPoolMined: 0,
      isDone: false,
      boost: boostAdjust,
      isClaimed: false,
      deviceId: deviceId,
    };
    if (user) {
      dispatch(startMine(data));
      await AsyncStorage.setItem('mining', JSON.stringify(data));
      setIsMining(true);
    }
  };

  const startClaim = async () => {
    const data = await AsyncStorage.getItem('mining');
    if (!data) {
      return;
    }
    const dataMining = JSON.parse(data);
    if (dataMining.isClaimed) {
      return;
    }
    if (user) {
      dispatch(claimMine());
    }
    if (miningStatus === 'succeeded') {
      dispatch(getMiningInfo());
      await AsyncStorage.removeItem('mining');
      showToast('success', t('claimSuccess'));
      setIsDone(false);
      setIsMining(false);
      setCurrentReward(0);
      const totalRw = totalReward + AMOUNT_MINING;
      setTotalReward(totalRw);
      await AsyncStorage.setItem('totalReward', totalRw.toString());
      interstitial.load(); // Load quảng cáo mới
    }
  };

  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
        console.log('Ad loaded successfully');
      },
    );

    const unsubscribeOpened = interstitial.addAdEventListener(
      AdEventType.OPENED,
      () => {
        if (Platform.OS === 'android') {
          StatusBar.setHidden(true); // Ẩn status bar khi mở quảng cáo trên Android
        }
      },
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        if (Platform.OS === 'android') {
          StatusBar.setHidden(false); // Hiện lại status bar khi đóng quảng cáo
        }

        startMinining();
      },
    );

    interstitial.load(); // Tải quảng cáo khi màn hình được mount

    return () => {
      unsubscribeLoaded();
      unsubscribeOpened();
      unsubscribeClosed(); // Dọn dẹp sự kiện khi unmount
    };
  }, [user]);

  useEffect(() => {
    if (isMining) {
      anim.current?.play();
    } else {
      anim.current?.pause();
    }
  }, [isMining]);

  const onPlayPress = async () => {
    if (isDone) {
      startClaim();
      return;
    } else {
      interstitial.show();
    }
  };

  useEffect(() => {
    const handleStopMining = async () => {
      try {
        const data = await AsyncStorage.getItem('mining');
        if (data) {
          const dataMining = JSON.parse(data);
          const currentDate = new Date().getTime();

          if (dataMining && dataMining.endDate > currentDate) {
            setIsMining(true);
            setStartDate(dataMining.startDate);
            setEndDate(dataMining.endDate);
            const elapsedTime =
              new Date().getTime() - new Date(dataMining.startDate).getTime(); // Elapsed time in milliseconds
            const totalTime =
              new Date(dataMining.endDate).getTime() -
              new Date(dataMining.startDate).getTime();

            if (elapsedTime <= totalTime) {
              const progress = elapsedTime / totalTime;
              const reward = parseFloat((progress * AMOUNT_MINING).toFixed(4));

              setCurrentReward(parseFloat(reward.toFixed(4)));
            }
          } else {
            //done mining
            if (!dataMining.isClaimed) {
              setIsMining(false);
              setEndDate(0);
              setStartDate(0);
              anim.current?.pause();
              setIsDone(true);
              //make is current reward to total reward
              setCurrentReward(AMOUNT_MINING);

              const newData = {
                ...dataMining,
                isDone: true,
              };
              await AsyncStorage.setItem('mining', JSON.stringify(newData));
            }
          }
        }
      } catch (error) {
        console.error('Error reading mining:', error);
      }
    };

    const interval = setInterval(() => {
      handleStopMining();
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  if (showAlert) {
    return (
      <View style={styles.modal_container}>
        <Modal transparent={true} visible={true} animationType="fade">
          <View style={styles.modal_overlay}>
            <View style={styles.modal_modalContainer}>
              <Text style={styles.modal_title}>{t('mining:loginToMine')}</Text>
              <Text style={styles.modal_message}>{t('mining:warning')}</Text>
              <View style={styles.modal_buttonContainer}>
                <Pressable
                  style={[styles.modal_button, styles.modal_cancelButton]}
                  onPress={() => {
                    navigateReset(SCREENS.MAIN);
                  }}>
                  <Text style={styles.modal_cancelButtonText}>
                    {t('other:cancel')}
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.modal_button, styles.modal_quitButton]}
                  onPress={() => {
                    navigateReset(SCREENS.LOGIN);
                  }}>
                  <Text style={styles.modal_quitButtonText}>
                    {t('other:accept')}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: backgroundColor}}>
      <View style={styles.containerView}>
        <View style={styles.headerView}>
          <Text style={{...styles.titleText, color: textColor}}>
            {t('mining')}
          </Text>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigate(SCREENS.MINING_HISTORY)}>
            <Text style={{...styles.itemText}}>{t('history')}</Text>
            <IconChevronRight />
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 10,
          }}>
          <View
            style={{
              ...styles.rewardContainer,
              backgroundColor: cardWalletBackgroundColor,
              borderColor: cardWalletBorderColor,
            }}>
            <Text style={styles.rewardText}>{t('currentReward')}</Text>
            <View style={styles.pointContainer}>
              <Image
                source={POINT_SEIM}
                style={styles.imagePoint}
                resizeMode={'contain'}
              />

              <Text style={{...styles.pointText, color: textOutstandingColor}}>
                {currentReward}
              </Text>
            </View>
            <Image
              source={BACKGROUND_REWARD}
              style={styles.imageBackgroundReward}
              resizeMode={'contain'}
            />
          </View>
          <View
            style={{
              ...styles.rewardContainer,
              backgroundColor: cardWalletBackgroundColor,
              borderColor: cardWalletBorderColor,
            }}>
            <Text style={styles.rewardText}>{t('totalReward')}</Text>
            <View style={styles.pointContainer}>
              <Image
                source={POINT_SEIM}
                style={styles.imagePoint}
                resizeMode={'contain'}
              />

              <Text style={{...styles.pointText, color: textOutstandingColor}}>
                {totalReward}
              </Text>
            </View>
            <Image
              source={BACKGROUND_REWARD}
              style={styles.imageBackgroundReward}
              resizeMode={'contain'}
            />
          </View>
        </View>
        <View
          style={{
            ...styles.actionMiningContainer,
            backgroundColor: containerColor,
            borderColor: borderColor,
          }}>
          {/* <View style={{flex: 1, width: '100%', alignItems: 'center'}}> */}
          <LottieView
            ref={anim}
            source={require('@/assets/lotties/gpu_animation.json')}
            loop
            style={{height: '40%', width: '60%', flex: 1}}
          />
          {/* </View> */}

          <CountdownTimer endDate={endDate} startDate={startDate} />
          <TouchableOpacity
            style={{
              ...styles.btnMint,
              backgroundColor: isMining ? '#B5DCFB' : '#1B9CFC',
              borderColor: isMining ? '#B5DCFB' : '#1B9CFC',
            }}
            onPress={onPlayPress}
            disabled={isMining || !loaded}>
            <Text style={styles.mintText}>
              {!isMining
                ? isDone
                  ? t('claim')
                  : t('startMining')
                : `${t('mining')}...`}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{...styles.miningText, color: textOutstandingColor}}>
          {t('infor')}
        </Text>
        <View
          style={{
            ...styles.miningInfoContainer,
            backgroundColor: containerColor,
            borderColor: borderColor,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.miningDetailLeft}>
              <View style={styles.miningDetailTextContainer}>
                <IconPool />
                <Text
                  style={{
                    ...styles.miningInfoText,
                    color: textColor,
                    flex: 1,
                    flexWrap: 'wrap',
                  }}>
                  {t('totalPool')}
                </Text>
              </View>

              <Text
                style={{
                  ...styles.miningInfoValue,
                  color: textOutstandingColor,
                }}>
                {miningData.totalPoolMined}
              </Text>
            </View>
            <View
              style={{
                ...styles.miningDetailRight,
                borderColor: textOutstandingColor,
              }}>
              <View style={styles.miningDetailTextContainer}>
                <IconSpeed />
                <Text style={{...styles.miningInfoText, color: textColor}}>
                  {t('miningAmount')} (24h)
                </Text>
              </View>

              <Text
                style={{
                  ...styles.miningInfoValue,
                  color: textOutstandingColor,
                }}>
                {AMOUNT_MINING}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '90%',
              paddingHorizontal: '3%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View
              style={{
                width: '45%',
                height: 1,
                backgroundColor: textOutstandingColor,
              }}></View>
            <View
              style={{
                width: '45%',
                height: 1,
                backgroundColor: textOutstandingColor,
              }}></View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={styles.miningDetailLeft}>
              <View style={styles.miningDetailTextContainer}>
                <IconDiamond />
                <Text style={{...styles.miningInfoText, color: textColor}}>
                  {t('level')}
                </Text>
              </View>

              <Text
                style={{
                  ...styles.miningInfoValue,
                  color: textOutstandingColor,
                }}>
                {miningData.level}
              </Text>
            </View>
            <View
              style={{
                ...styles.miningDetailRight,
                borderColor: textOutstandingColor,
              }}>
              <View style={styles.miningDetailTextContainer}>
                <IconUser />
                <Text style={{...styles.miningInfoText, color: textColor}}>
                  {t('referral')}
                </Text>
              </View>

              <Text
                style={{
                  ...styles.miningInfoValue,
                  color: textOutstandingColor,
                }}>
                {miningData.totalInvite}
              </Text>
            </View>
          </View>
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
export default MiningScreen;
