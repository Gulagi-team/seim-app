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
import Icon from 'react-native-vector-icons/MaterialIcons';
import POINT_SEIM from '@/assets/images/point_seim.png';
import PLUG from '@/assets/images/plug.png';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import mobileAds, {
  RewardedAd,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';
import {useEffect, useState} from 'react';
import {showToast} from '@/helpers/toast';

const adUnitId = 'ca-app-pub-4899008737130339/7604879423';

const rewarded = RewardedAd.createForAdRequest(adUnitId);

const MiningScreen = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // setInitAdDone(false);
    mobileAds()
      .initialize()
      .then(() => {
        // setLoaded(true);
      })
      .catch(err => console.log('Init error: ', err))
      .finally(() => console.log('Init Ads success'));

    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        console.log('Load ads success');
        setLoaded(true);
      },
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        // reduxStorage.setItem('turnLeftLocal', 2);
        // dispatch(updateTurnLeftNumber(2));
        // props.callbackChangeVisible();
        // showToast('success', t('home:reward_success'));
        // setLoaded(false);
      },
    );
    rewarded.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  const showAds = () => {
    if (loaded) {
      rewarded.show();
    } else {
      showToast('error', 'No advert ready to show yet');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerView}>
        <View style={styles.pointContainer}>
          <Image
            source={POINT_SEIM}
            style={styles.imagePoint}
            resizeMode={'contain'}
          />
          <Text style={styles.pointText}>0.0267 Seim</Text>
        </View>
        <View style={styles.actionMiningContainer}>
          <View style={styles.plugContainer}>
            <Image
              source={PLUG}
              style={styles.imagePlug}
              resizeMode={'contain'}
            />
          </View>
          <TouchableOpacity style={styles.btnMint} onPress={showAds}>
            <Text style={styles.mintText}>START MINT</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.miningText}>Mining Info</Text>
        <View style={styles.miningInfoContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.miningDetailLeft}>
              <View style={styles.miningDetailTextContainer}>
                <Icon
                  name="supervisor-account"
                  style={{fontSize: 16, color: '#06C270'}}
                />
                <Text style={styles.miningInfoText}>
                  Total number of Pools mined
                </Text>
              </View>

              <Text style={styles.miningInfoValue}>5</Text>
            </View>
            <View style={styles.miningDetailRight}>
              <View style={styles.miningDetailTextContainer}>
                <Icon name="speed" style={{fontSize: 16, color: '#06C270'}} />
                <Text style={styles.miningInfoText}>
                  Mining amount in the last 24 hours
                </Text>
              </View>

              <Text style={styles.miningInfoValue}>0.03</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 12}}>
            <View style={styles.miningDetailLeft}>
              <View style={styles.miningDetailTextContainer}>
                <Icon
                  name="supervisor-account"
                  style={{fontSize: 16, color: '#06C270'}}
                />
                <Text style={styles.miningInfoText}>Level</Text>
              </View>

              <Text style={styles.miningInfoValue}>5</Text>
            </View>
            <View style={styles.miningDetailRight}>
              <View style={styles.miningDetailTextContainer}>
                <Icon name="speed" style={{fontSize: 16, color: '#06C270'}} />
                <Text style={styles.miningInfoText}>
                  Number of people invited
                </Text>
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
