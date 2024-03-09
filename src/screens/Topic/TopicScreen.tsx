import React from 'react';
import {ScrollView, Text, TouchableOpacity, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {navigate} from '@/helpers/navigation';
import Header from '@/components/Header';
import {styles} from './TopicScreen.styles';
import HealthCare from '@/assets/images/health.png';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import SCREENS from '@/constants/screen';

const TopicScreen = () => {
  const navigation = useNavigation();
  const goBack = () => navigation.pop();

  return (
    <SafeAreaView style={styles.container}>
      <Header renderLogo canGoBack={true} handleGoBack={goBack} />
      <Text style={styles.textTitle}>Categories</Text>
      <ScrollView style={styles.ScrollView}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigate(SCREENS.LESSION)}>
          <Image
            style={styles.itemImg}
            source={HealthCare}
            resizeMode={'stretch'}
          />
          <View style={styles.itemTitle}>
            <Text style={styles.title}>Health care</Text>
            <Text style={styles.secondTitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
            <Text style={styles.thridTitle}>136 lession</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <Image
        style={styles.welcomeBottom}
        source={WelcomeBottom}
        resizeMode={'stretch'}
      />
    </SafeAreaView>
  );
};

export default TopicScreen;
