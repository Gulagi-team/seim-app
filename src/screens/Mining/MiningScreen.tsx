import {Image, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './MiningScreen.styles';
import POINT_SEIM from '@/assets/images/point_seim.png';
import LOGO from '@/assets/images/logo.png';
import BACKGROUND_REWARD from '@/assets/images/background_reward.png';
import PLUG from '@/assets/images/plug.png';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import mobileAds, {
  RewardedAd,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';
import {useEffect, useRef, useState} from 'react';
import LottieView from 'lottie-react-native';
import IconPool from '@/assets/icons/icon_pool.svg';
import IconSpeed from '@/assets/icons/icon_speed.svg';
import IconDiamond from '@/assets/icons/icon_diamond.svg';
import IconUser from '@/assets/icons/icon_user.svg';
import CountdownTimer from '@/components/TimerCountdown/TimerCountdown';
import {StoreState, useAppSelector} from '@/store';

const adUnitId = 'ca-app-pub-4899008737130339/7604879423';

const rewarded = RewardedAd.createForAdRequest(adUnitId);

const MiningScreen = () => {
  const [isMining, setIsMining] = useState(false);
  const anim = useRef<LottieView>(null);
  const endDate = useAppSelector(
    (state: StoreState) => state.MiningSlice.miningData.endDate,
  );
  const {
    backgroundColor,
    containerColor,
    textColor,
    textOutstandingColor,
    borderColor,
    cardWalletBackgroundColor,
    cardWalletBorderColor,
  } = useAppSelector((state: StoreState) => state.ThemeSlice);
  const [timeLeft, setTimeLeft] = useState(endDate - new Date().getTime());
  const habit = useAppSelector((state: StoreState) => state.HabitsSlide.habits);

  useEffect(() => {
    // setInitAdDone(false);
    // mobileAds()
    //   .initialize()
    //   .then(() => {
    //     // setLoaded(true);
    //   })
    //   .catch(err => console.log('Init error: ', err))
    //   .finally(() => console.log('Init Ads success'));

    // const unsubscribeLoaded = rewarded.addAdEventListener(
    //   RewardedAdEventType.LOADED,
    //   () => {
    //     console.log('Load ads success');
    //     setLoaded(true);
    //   },
    // );
    // const unsubscribeEarned = rewarded.addAdEventListener(
    //   RewardedAdEventType.EARNED_REWARD,
    //   reward => {
    //     // reduxStorage.setItem('turnLeftLocal', 2);
    //     // dispatch(updateTurnLeftNumber(2));
    //     // props.callbackChangeVisible();
    //     showToast('success', 'Success');
    //     // setLoaded(false);
    //   },
    // );
    // rewarded.load();

    return () => {
      // unsubscribeLoaded();
      // unsubscribeEarned();
    };
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      anim.current?.play();
    } else {
      anim.current?.pause();
    }
  }, [timeLeft]);

  const onPlayPress = () => {
    if (isMining) {
      anim.current?.pause();
    } else {
      anim.current?.play();
    }
    setIsMining(p => !p);
  };

  const showAds = () => {
    // if (loaded) {
    //   rewarded.show();
    // } else {
    //   showToast('error', 'No advert ready to show yet');
    // }
    console.log(isMining);
    setIsMining(!isMining);
  };
  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: backgroundColor}}>
      <View style={styles.containerView}>
        <Text style={{...styles.titleText, color: textColor}}>Mining</Text>
        <View
          style={{
            ...styles.rewardContainer,
            backgroundColor: cardWalletBackgroundColor,
            borderColor: cardWalletBorderColor,
          }}>
          <Text style={styles.rewardText}>Current Rewards</Text>
          <View style={styles.pointContainer}>
            <Image
              source={POINT_SEIM}
              style={styles.imagePoint}
              resizeMode={'contain'}
            />

            <Text style={{...styles.pointText, color: textOutstandingColor}}>
              0.0267
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

          <CountdownTimer />
          <TouchableOpacity
            style={styles.btnMint}
            onPress={onPlayPress}
            disabled={timeLeft > 0}>
            <Text style={styles.mintText}>
              {timeLeft == 0 ? 'START MINT' : 'MINING...'}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{...styles.miningText, color: textOutstandingColor}}>
          Mining Info
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
                <Text style={{...styles.miningInfoText, color: textColor}}>
                  Total Pools Mined
                </Text>
              </View>

              <Text
                style={{
                  ...styles.miningInfoValue,
                  color: textOutstandingColor,
                }}>
                5
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
                  Mining amount (24h)
                </Text>
              </View>

              <Text
                style={{
                  ...styles.miningInfoValue,
                  color: textOutstandingColor,
                }}>
                0.03
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
                  Level
                </Text>
              </View>

              <Text
                style={{
                  ...styles.miningInfoValue,
                  color: textOutstandingColor,
                }}>
                5
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
                  Invited Peoples
                </Text>
              </View>

              <Text
                style={{
                  ...styles.miningInfoValue,
                  color: textOutstandingColor,
                }}>
                8
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
