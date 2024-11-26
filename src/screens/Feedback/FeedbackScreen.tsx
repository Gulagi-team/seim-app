import Header from '@/components/Header';
import {useTranslation} from 'react-i18next';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import LogoSeim from '@/assets/images/logo.png';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
// import axios from 'axios';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import {showToast} from '@/helpers/toast';
import {StoreState, useAppSelector} from '@/store';
import {useNavigation} from '@react-navigation/native';
import {styles} from './FeedbackScreen.styles';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {addNewFeedback} from '@/store/feedback/action';

const FeedbackScreen = () => {
  const {t} = useTranslation(['feedback']);
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  const {
    backgroundColor,
    textColor,
    textOutstandingColor,
    textContainerColor,
    textBorderColor,
  } = useAppSelector((state: StoreState) => state.ThemeSlice);
  // const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  const handleSubmit = () => {
    if (name && feedback) {
      let body = {
        name: name,
        content: feedback,
      };

      dispatch(addNewFeedback(body));
    } else {
      showToast('error', 'You have not entered any information yet');
    }
  };

  const _scrollToInput = (reactNode: any) => {
    // Add a 'scroll' ref to your ScrollView
    // scrollViewRef.current?.scrollToFocusedInput(reactNode);
  };

  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: backgroundColor}}>
      <Header
        title={t('feedback:title')}
        canGoBack={true}
        handleGoBack={goBack}
      />
      <View style={styles.containerView}>
        <FastImage
          style={styles.logo}
          source={LogoSeim}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={{...styles.seecar, color: textOutstandingColor}}>
          SEIM
        </Text>
        <Text style={{...styles.seeCarIs1, color: textColor}}>
          {t('feedback:speech')}
        </Text>

        <View
          style={{
            ...styles.nameContainer,
            backgroundColor: textContainerColor,
            borderColor: textBorderColor,
          }}>
          <Text style={{...styles.nameTitle, color: textOutstandingColor}}>
            {t('feedback:name')}
          </Text>
          <TextInput
            style={{...styles.nameInput, color: textColor}}
            onChangeText={value => setName(value)}
            placeholder={t('feedback:namePlace')}
            placeholderTextColor={'#A3A3A3'}
            numberOfLines={1}
          />
        </View>
        <View
          style={{
            ...styles.feedbackContainer,
            backgroundColor: textContainerColor,
            borderColor: textBorderColor,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{...styles.nameTitle, color: textOutstandingColor}}>
              {t('feedback:feedback')}
            </Text>
            <Text
              style={{
                ...styles.nameTitle,
                color: textOutstandingColor,
              }}>{`${feedback.length}/200`}</Text>
          </View>

          <TextInput
            style={{...styles.nameInput, color: textColor}}
            onChangeText={value => setFeedback(value)}
            placeholder={t('feedback:feedbackPlace')}
            multiline
            placeholderTextColor={'#A3A3A3'}
            numberOfLines={5}
            maxLength={200}
            textAlignVertical={'top'}
          />
        </View>
        <TouchableOpacity style={styles.getStartParent} onPress={handleSubmit}>
          <Text style={styles.getStart}>{t('feedback:submit')}</Text>
        </TouchableOpacity>
      </View>

      <Image
        style={styles.welcomeBottom}
        source={WelcomeBottom}
        resizeMode={'stretch'}
      />
    </SafeAreaView>
  );
};

export default FeedbackScreen;
