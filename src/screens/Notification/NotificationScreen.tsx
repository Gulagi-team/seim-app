import React from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {styles} from './NotificationScreen.styles';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import {useTranslation} from 'react-i18next';

const NotificationScreen = () => {
  const {t} = useTranslation(['other']);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerView}>
        <Text style={styles.titleText}>{t('noti')}</Text>
      </View>

      <Image
        style={styles.welcomeBottom}
        source={WelcomeBottom}
        resizeMode={'stretch'}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;
