import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {styles} from './ReferralScreen.styles';
import FastImage from 'react-native-fast-image';
import Header from '@/components/Header';
import {COLORS} from '@/theme';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import BACKGROUND_GIFT from '@/assets/images/gift.png';
import BACKGROUND_FIREWORK from '@/assets/images/firework.png';
import EARN_REAWARD from '@/assets/images/earn_reward.png';
import GIFT_REFERRAL from '@/assets/images/gift_referral.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconInvited from '@/assets/icons/icon_invited.svg';
import IconValid from '@/assets/icons/icon_valid.svg';
import {showToast} from '@/helpers/toast';
import Clipboard from '@react-native-clipboard/clipboard';
import {StoreState, useAppSelector} from '@/store';

const ReferralScreen = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [refCode, setRefCode] = useState('');
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  const {referralCode, referralLink} = useAppSelector(
    (state: StoreState) => state.userInfo,
  );
  const {
    backgroundColor,
    containerColor,
    textColor,
    textOutstandingColor,
    borderColor,
    textContainerColor,
    textBorderColor,
  } = useAppSelector((state: StoreState) => state.ThemeSlice);

  const handleCopyRefCode = () => {
    Clipboard.setString(referralCode);
    showToast('info', 'Referral code is saved to Clipboard');
  };

  const handleCopyRefLink = () => {
    Clipboard.setString(referralLink);
    showToast('info', 'Referral link is saved to Clipboard');
  };

  const handlePasteCode = async () => {
    const code = await Clipboard.getString();
    console.log('code', code);
    setRefCode(code);
  };

  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: backgroundColor}}>
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
        <View
          style={{
            ...styles.bodyContainer,
            backgroundColor: containerColor,
            borderColor: borderColor,
          }}>
          <Text style={{...styles.titleText, color: textColor}}>
            Referral code
          </Text>
          <TouchableOpacity
            style={{
              ...styles.referralCodeContainer,
              backgroundColor: textContainerColor,
              borderColor: textBorderColor,
            }}
            onPress={handleCopyRefCode}>
            <Text style={styles.referralCodeText}>{referralCode}</Text>
            <Icon
              name="content-copy"
              style={{fontSize: 20, color: '#1B9CFC'}}
            />
          </TouchableOpacity>
          <Text style={{...styles.titleText, color: textColor}}>
            Referral link
          </Text>
          <TouchableOpacity
            style={{
              ...styles.referralCodeContainer,
              backgroundColor: textContainerColor,
              borderColor: textBorderColor,
            }}
            onPress={handleCopyRefLink}>
            <Text style={{...styles.referralLinkText, color: textColor}}>
              {referralLink}
            </Text>
            <Icon
              name="content-copy"
              style={{fontSize: 20, color: '#1B9CFC'}}
            />
          </TouchableOpacity>
          <View style={styles.lineConatiner} />
          <View style={styles.referralEarnContainer}>
            <View style={{flexDirection: 'row'}}>
              <FastImage
                style={styles.imageEarnReward}
                source={EARN_REAWARD}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text
                style={{
                  ...styles.referralLinkText,
                  color: textOutstandingColor,
                }}>
                Earned
              </Text>
            </View>

            <Text style={styles.earnedPointsText}>240 Points</Text>
          </View>
          <View
            style={{
              ...styles.referralAmountContainer,
              backgroundColor: textContainerColor,
            }}>
            <Text style={{...styles.paraText, color: textColor}}>
              Your friend needs to complete at least 01 swap transaction to
              become a valid referral.
            </Text>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.miningDetailLeft}>
                <View style={styles.miningDetailTextContainer}>
                  <IconInvited />
                  <Text style={{...styles.miningInfoText, color: textColor}}>
                    INVITED
                  </Text>
                </View>

                <Text
                  style={{
                    ...styles.miningInfoValue,
                    color: textOutstandingColor,
                  }}>
                  15
                </Text>
              </View>
              <View style={styles.miningDetailRight}>
                <View style={styles.miningDetailTextContainer}>
                  <IconValid />
                  <Text style={{...styles.miningInfoText, color: textColor}}>
                    VALID
                  </Text>
                </View>
                <Text
                  style={{
                    ...styles.miningInfoValue,
                    color: textOutstandingColor,
                  }}>
                  10
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            ...styles.enterCodeContainer,
            backgroundColor: containerColor,
            borderColor: borderColor,
          }}>
          <View style={{flex: 1, alignItems: 'center', width: '100%'}}>
            <FastImage
              style={styles.imageGiftReferral}
              source={GIFT_REFERRAL}
              resizeMode={FastImage.resizeMode.contain}
            />

            <Text
              style={{...styles.whoInviteText, color: textOutstandingColor}}>
              Who invited you?
            </Text>
            <Text style={{...styles.paraInviteText, color: textColor}}>
              Enter your friend’s referral code to send them a gift from SEIM
            </Text>
          </View>

          <View
            style={{
              ...styles.codeContainer,
              backgroundColor: textContainerColor,
              borderColor: textBorderColor,
            }}>
            <TextInput
              style={{...styles.codeInput, color: textOutstandingColor}}
              onChangeText={value => setRefCode(value)}
              placeholder="Enter code here"
              placeholderTextColor={COLORS.text_A400}
              numberOfLines={1}
              value={refCode}
            />
            <TouchableOpacity
              style={styles.pasteContainer}
              onPress={handlePasteCode}>
              <Text style={styles.codeTitle}>Paste</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.addCodeContainer}>
            <Text style={styles.addCodeText}>Add code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReferralScreen;
