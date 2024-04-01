import {
  ActivityIndicator,
  Button,
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
import {deviceWidth} from '@/constants/layout';
import {COLORS} from '@/theme';
import * as Progress from 'react-native-progress';

const adUnitId = 'ca-app-pub-4899008737130339/7604879423';

const rewarded = RewardedAd.createForAdRequest(adUnitId);

const MiningScreen = () => {
  const [isMining, setIsMining] = useState(false);
  const anim = useRef<LottieView>(null);

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
    <SafeAreaView style={styles.container}>
      <View style={styles.containerView}>
        <Text style={styles.titleText}>Mining</Text>
        <View style={styles.rewardContainer}>
          <Text style={styles.rewardText}>Current Rewards</Text>
          <View style={styles.pointContainer}>
            <Image
              source={POINT_SEIM}
              style={styles.imagePoint}
              resizeMode={'contain'}
            />

            <Text style={styles.pointText}>0.0267</Text>
          </View>
          <Image
            source={BACKGROUND_REWARD}
            style={styles.imageBackgroundReward}
            resizeMode={'contain'}
          />
        </View>
        {/* <MiningCard /> */}
        <View style={styles.actionMiningContainer}>
          {/* <View style={styles.plugContainer}>
            <Image
              source={PLUG}
              style={styles.imagePlug}
              resizeMode={'contain'}
            />
          </View> */}
          {/* <SVGatorComponent props={}/> */}
          <LottieView
            ref={anim}
            source={require('@/assets/lotties/gpu_animation.json')}
            loop
            style={{height: '50%', width: '100%'}}
          />
          <View style={styles.levelContainer}>
            <Text style={styles.levelText}>25%</Text>
            <Text style={styles.percentText}>00:00:00</Text>
          </View>
          <Progress.Bar
            progress={0.4}
            width={deviceWidth - 121}
            color={COLORS.primary_A400}
            unfilledColor={COLORS.text_A100}
            borderWidth={0}
          />
          <TouchableOpacity style={styles.btnMint} onPress={onPlayPress}>
            <Text style={styles.mintText}>START MINT</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.miningText}>Mining Info</Text>
        <View style={styles.miningInfoContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.miningDetailLeft}>
              <View style={styles.miningDetailTextContainer}>
                <IconPool />
                <Text style={styles.miningInfoText}>Total Pools Mined</Text>
              </View>

              <Text style={styles.miningInfoValue}>5</Text>
            </View>
            <View style={styles.miningDetailRight}>
              <View style={styles.miningDetailTextContainer}>
                <IconSpeed />
                <Text style={styles.miningInfoText}>Mining amount (24h)</Text>
              </View>

              <Text style={styles.miningInfoValue}>0.03</Text>
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
              style={{width: '45%', height: 1, backgroundColor: '#000'}}></View>
            {/* <Image
              source={LOGO}
              style={{
                width: 20,
                height: 20,
              }}
              resizeMode={'contain'}
            /> */}
            <View
              style={{width: '45%', height: 1, backgroundColor: '#000'}}></View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={styles.miningDetailLeft}>
              <View style={styles.miningDetailTextContainer}>
                <IconDiamond />
                <Text style={styles.miningInfoText}>Level</Text>
              </View>

              <Text style={styles.miningInfoValue}>5</Text>
            </View>
            <View style={styles.miningDetailRight}>
              <View style={styles.miningDetailTextContainer}>
                <IconUser />
                <Text style={styles.miningInfoText}>Invited Peoples</Text>
              </View>

              <Text style={styles.miningInfoValue}>8</Text>
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
