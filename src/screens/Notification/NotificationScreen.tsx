import React from 'react';
import {Image, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './NotificationScreen.styles';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import EmptyState from '@/components/EmptyState';
import Enter from '@/components/motion/Enter';

const NotificationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerView}>
        <Enter delay={0} distance={12}>
          <Text style={styles.titleText}>Notification</Text>
        </Enter>
        <EmptyState
          title="Nothing new right now"
          message="Reminders about your habits and your streak will show up here."
        />
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