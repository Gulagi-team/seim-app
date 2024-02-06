// import { Brand } from "components/molecules";
import {useState} from 'react';

import {
  Text,
  View,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

import {navigate} from '@/helpers/navigation';

import LogoSeim from '@/assets/images/logoSeim.png';
import {SafeAreaView} from 'react-native-safe-area-context';

const WelcomeScreen = () => {
  const handleLogin = async () => {
    navigate('GetInfoScreen');
  };

  return (
    <SafeAreaView style={{alignItems: 'center', backgroundColor:'white', height:'100%'}}>
      <View
        style={{
          marginTop: 100,
        }}>
        <Image
          source={LogoSeim}
          style={{height: 80, width: 80}}
          resizeMode={'contain'}
        />
      </View>
      <Text
        style={{
          marginTop: 50,
          fontSize: 30,
          fontWeight: '700',
        }}>
        Welcome!
      </Text>

      <Text
        style={{
          marginTop: 50,
          fontSize: 15,
          fontWeight: '400',
          marginHorizontal: 16,
        }}>
        Chúng tôi rất vui vì bạn đã quan tâm đến ứng dụng này. Chắc chắn bạn
        muốn nâng cấp sức khoẻ và tinh thần của mình. Hãy để chúng tôi giúp bạn,
        Seim sẽ là người bạn đồng hành và giúp bạn khoẻ hơn mỗi ngày.
      </Text>

      <View style={{width: '100%', marginHorizontal: 16}}>
        <Text
          style={{
            marginTop: 20,
            fontSize: 15,
            fontWeight: '400',
            marginHorizontal: 16,
          }}>
          Let's get started!
        </Text>
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

      <View
        style={{
          flexDirection: 'row',
          marginTop: 17,
          flexWrap: 'wrap',
          marginBottom: 32,
        }}></View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
