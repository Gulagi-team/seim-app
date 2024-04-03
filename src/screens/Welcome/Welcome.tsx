// import { Brand } from "components/molecules";
import {useState} from 'react';

import {
  Text,
  View,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {navigate} from '@/helpers/navigation';

import LogoSeim from '@/assets/images/logo.png';
import {SafeAreaView} from 'react-native-safe-area-context';
import SCREENS from '@/constants/screen';
import {COLORS, POPPINS_BOLD, POPPINS_MEDIUM} from '@/theme';
import {deviceWidth} from '@/constants/layout';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';

const WelcomeScreen = () => {
  const handleLogin = async () => {
    navigate(SCREENS.GETINFO);
  };

  return (
    <SafeAreaView style={styles.containerView}>
      <View
        style={{
          marginTop: '30%',
        }}>
        <Image
          source={LogoSeim}
          style={{height: 80, width: 80}}
          resizeMode={'contain'}
        />
        <Text style={styles.seimText}>SEIM</Text>
      </View>
      <Text style={styles.welcomeText}>Welcome!</Text>

      <Text style={styles.paraText}>
        Chúng tôi rất vui vì bạn đã quan tâm đến ứng dụng này. Chắc chắn bạn
        muốn nâng cấp sức khoẻ và tinh thần của mình. Hãy để chúng tôi giúp bạn,
        Seim sẽ là người bạn đồng hành và giúp bạn khoẻ hơn mỗi ngày.
      </Text>

      <View style={{width: '100%', marginHorizontal: 16}}>
        <Text style={styles.paraText}>Let's get started!</Text>
      </View>

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: '#1675D6',
          width: 120,
          height: 45,
          borderRadius: 15,
          marginTop: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white'}}>{`Bắt đầu >`}</Text>
      </TouchableOpacity>

      <Image
        style={styles.welcomeBottom}
        source={WelcomeBottom}
        resizeMode={'stretch'}
      />
    </SafeAreaView>
  );
};

export default WelcomeScreen;

export const styles = StyleSheet.create({
  containerView: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
  },
  logo: {width: 64, height: 64},
  seimText: {
    // marginTop: 10,
    fontSize: 20,
    letterSpacing: 5,
    fontWeight: '700',
    fontFamily: POPPINS_MEDIUM,
    color: COLORS.black,
    textAlign: 'center',
  },
  welcomeText: {
    marginTop: 40,
    fontSize: 30,
    fontWeight: '700',
    fontFamily: POPPINS_BOLD,
    color: COLORS.black,
    marginBottom: 10,
  },
  paraText: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: '400',
    marginHorizontal: 16,
    fontFamily: POPPINS_MEDIUM,
    color: COLORS.darkmode_3,
  },

  welcomeBottom: {
    position: 'absolute',
    width: '100%',
    zIndex: -1,
    height: '25%',
    bottom: 0,
  },
});
