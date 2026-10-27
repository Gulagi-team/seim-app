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
import {deviceWidth} from '@/constants/layout';
import React, {useRef, useState} from 'react';
import {showToast} from '@/helpers/toast';
import {styles} from './FeedbackScreen.styles';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import {useNavigation} from '@react-navigation/native';
import {StoreState, useAppSelector} from '@/store';

const FeedbackScreen = () => {
  const {t} = useTranslation(['startup']);
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
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

  // Feedback used to be posted to the Gulagi collection API, which went away
  // with the rest of the backend. The app is offline, so there is nowhere to
  // send the form to.
  const handleSubmit = () => {};

  const _scrollToInput = (reactNode: any) => {
    // Add a 'scroll' ref to your ScrollView
    // scrollViewRef.current?.scrollToFocusedInput(reactNode);
  };

  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: backgroundColor}}>
      <Header title="Feedback" canGoBack={true} handleGoBack={goBack} />
      <View style={styles.containerView}>
        <Image
          style={styles.logo}
          source={LogoSeim}
          resizeMode="contain"
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
            placeholder="Name"
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
            placeholder="Feedback"
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
          <Image
            style={styles.logo}
            source={LogoSeim}
            resizeMode="contain"
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
