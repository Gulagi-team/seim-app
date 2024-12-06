import {Keyboard, Text, TextInput, TouchableOpacity, View} from 'react-native';
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
import React from 'react';
import {StoreState, useAppSelector} from '@/store';
import {getAuth} from '@/store/auth';
import {getStringLocal} from '@/helpers/localStorage';
import {addNewReferral, getReferralInfomation} from '@/store/referral/action';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTranslation} from 'react-i18next';

const ReferralScreen = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [refCode, setRefCode] = useState('');
  const {t} = useTranslation('referral');
  const navigation = useNavigation();

  const goBack = () => navigation.goBack();

  const {referralCode, referralLink} = useAppSelector(
    (state: StoreState) => state.userInfo,
  );

  const {referralData, status} = useAppSelector(
    (state: StoreState) => state.ReferralSlice,
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
    showToast('info', t('copyCode'));
  };

  const handleCopyRefLink = () => {
    Clipboard.setString(referralLink);
    showToast('info', t('copyLink'));
  };

  const handlePasteCode = async () => {
    const code = await Clipboard.getString();
    setRefCode(code);
  };

  useEffect(() => {
    const getData = async () => {
      const auth = await getAuth();
      if (auth) {
        dispatch(getReferralInfomation());
      }
    };
    getData();
  }, []);

  const handleAddCode = () => {
    if (refCode === '') {
      showToast('error', t('empty'));
      return;
    }
    dispatch(addNewReferral(refCode));

    if (status === 'succeeded') {
      showToast('success', t('success'));
      setRefCode('');
    }
  };
  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: backgroundColor}}>
      <Header title={t('title')} canGoBack={true} handleGoBack={goBack} />
      <View style={styles.containerView}>
        <LinearGradient
          style={styles.bannerContainer}
          locations={[0, 1]}
          colors={['#47A0FF', '#7ED6DF']}
          useAngle={true}>
          <View style={{marginLeft: 10}}>
            <View style={{flexDirection: 'row', height: 18}}>
              <Text style={styles.bannerText}>{t('get')}</Text>
              <Text style={styles.seimText}>1 Point</Text>
            </View>
            <Text style={styles.bannerText}>{t('bannerText')}</Text>
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
            {t('code')}
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
            {t('link')}
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
                {t('earned')}
              </Text>
            </View>

            <Text style={styles.earnedPointsText}>
              {referralData.totalEarned} Points
            </Text>
          </View>
          <View
            style={{
              ...styles.referralAmountContainer,
              backgroundColor: textContainerColor,
            }}>
            <Text style={{...styles.paraText, color: textColor}}>
              {t('des')}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.miningDetailLeft}>
                <View style={styles.miningDetailTextContainer}>
                  <IconInvited />
                  <Text style={{...styles.miningInfoText, color: textColor}}>
                    {t('invited')}
                  </Text>
                </View>

                <Text
                  style={{
                    ...styles.miningInfoValue,
                    color: textOutstandingColor,
                  }}>
                  {referralData.totalInvited}
                </Text>
              </View>
              <View style={styles.miningDetailRight}>
                <View style={styles.miningDetailTextContainer}>
                  <IconValid />
                  <Text style={{...styles.miningInfoText, color: textColor}}>
                    {t('valid')}
                  </Text>
                </View>
                <Text
                  style={{
                    ...styles.miningInfoValue,
                    color: textOutstandingColor,
                  }}>
                  {referralData.totalValid}
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
              {t('invitedWho')}
            </Text>
            <Text style={{...styles.paraInviteText, color: textColor}}>
              {t('descInvite')}
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
              placeholder={t('enterCode')}
              placeholderTextColor={COLORS.text_A400}
              numberOfLines={1}
              value={refCode}
            />
            <TouchableOpacity
              style={styles.pasteContainer}
              onPress={handlePasteCode}>
              <Text style={styles.codeTitle}>{t('paste')}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleAddCode}
            style={{
              ...styles.addCodeContainer,
              backgroundColor: refCode === '' ? '#96d2ff' : COLORS.primary_A500,
            }}>
            <Text style={styles.addCodeText}>{t('addCode')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReferralScreen;
