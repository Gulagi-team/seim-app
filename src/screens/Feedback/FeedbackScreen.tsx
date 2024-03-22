import Header from '@/components/Header';
import navigation from '@/navigation';
import {ApplicationScreenProps} from '@/types/navigation';
import {useTranslation} from 'react-i18next';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  findNodeHandle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';

// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import LogoSeim from '@/assets/images/logo.png';
import FastImage from 'react-native-fast-image';
import {deviceWidth} from '@/constants/layout';
import React, {useRef, useState} from 'react';
// import axios from 'axios';
import {showToast} from '@/helpers/toast';
import {styles} from './FeedbackScreen.styles';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';

const FeedbackScreen = () => {
  const {t} = useTranslation(['startup']);
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  // const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  const handleSubmit = () => {
    // if (name && feedback) {
    //   let body = {
    //     data: {
    //       name: name,
    //       content: feedback,
    //     },
    //   };
    //   axios
    //     .post(
    //       `https://app.gulagi.com/api/collections/save/See_car_feedback?token=028a110f9935d381205d43cf782f45`,
    //       body,
    //     )
    //     .then(data => {
    //       console.log('data', data.data);
    //       showToast('success', 'Thank you for your feedback');
    //     })
    //     .catch(error => {
    //       console.log('error', error);
    //       // stateStore.dispatch(updateLoading(false));
    //       showToast('error', 'Cant submit feedback');
    //     });
    // } else {
    //   showToast('error', 'You have not entered any information yet');
    // }
  };

  const _scrollToInput = (reactNode: any) => {
    // Add a 'scroll' ref to your ScrollView
    // scrollViewRef.current?.scrollToFocusedInput(reactNode);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header
        title={t('screens:feedback')}
        handleGoBack={() => navigation.goBack()}
      /> */}
      <View style={styles.containerView}>
        <FastImage
          style={styles.logo}
          source={LogoSeim}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.seecar}>SEIM</Text>
        <Text style={styles.seeCarIs1}>{t('feedback:speech')}</Text>

        <View style={styles.nameContainer}>
          <Text style={styles.nameTitle}>{t('feedback:name')}</Text>
          <TextInput
            style={styles.nameInput}
            onChangeText={value => setName(value)}
            // placeholder="Name"
            placeholderTextColor={'#fff'}
            numberOfLines={1}
          />
        </View>
        <View style={styles.feedbackContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.nameTitle}>{t('feedback:feedback')}</Text>
            <Text style={styles.nameTitle}>{`${feedback.length}/500`}</Text>
          </View>

          <TextInput
            style={styles.nameInput}
            onChangeText={value => setFeedback(value)}
            // placeholder="Name"
            multiline
            placeholderTextColor={'#fff'}
            numberOfLines={6}
            maxLength={500}
          />
        </View>
        <TouchableOpacity style={styles.getStartParent} onPress={handleSubmit}>
          <Text style={styles.getStart}>{t('feedback:submit')}</Text>
        </TouchableOpacity>
      </View>
      {/* <KeyboardAwareScrollView
        ref={scrollViewRef}
        // ref={inputRef}
        // onFocus={(event: Event) => {
        //   // `bind` the function if you're using ES6 classes
        //   _scrollToInput(findNodeHandle(event.target))
        // }}
        // showsVerticalScrollIndicator={false}
        // resetScrollToCoords={{x: 0, y: 0}}
        scrollEnabled={true}
        style={{flex: 1, width: '100%', height: '100%'}}>
        <LinearGradient
          style={styles.contentContainer}
          locations={[0, 1]}
          colors={['#262626', '#171717']}
          useAngle={true}
          angle={180}>
          <FastImage
            style={styles.logo}
            source={LogoSeim}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.seecar}>SEECAR</Text>
          <Text style={styles.seeCarIs1}>{t('feedback:speech')}</Text>

          <View style={styles.nameContainer}>
            <Text style={styles.nameTitle}>{t('feedback:name')}</Text>
            <TextInput
              style={styles.nameInput}
              onChangeText={value => setName(value)}
              // placeholder="Name"
              placeholderTextColor={'#fff'}
              numberOfLines={1}
            />
          </View>
          <View style={styles.feedbackContainer}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.nameTitle}>{t('feedback:feedback')}</Text>
              <Text style={styles.nameTitle}>{`${feedback.length}/500`}</Text>
            </View>

            <TextInput
              style={styles.nameInput}
              onChangeText={value => setFeedback(value)}
              // placeholder="Name"
              multiline
              placeholderTextColor={'#fff'}
              numberOfLines={6}
              maxLength={500}
            />
          </View>
          <TouchableOpacity
            style={styles.getStartParent}
            onPress={handleSubmit}>
            <Text style={styles.getStart}>{t('feedback:submit')}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </KeyboardAwareScrollView> */}
      <Image
        style={styles.welcomeBottom}
        source={WelcomeBottom}
        resizeMode={'stretch'}
      />
    </SafeAreaView>
  );
};

export default FeedbackScreen;
