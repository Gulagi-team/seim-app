import {
  ActivityIndicator,
  Button,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './CreateWalletScreen.styles';
import LogoSeim from '@/assets/images/logoSeim.png';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import IconGoogle from '@/assets/icons/icon_google.svg';
import {ApplicationScreenProps} from '@/types/navigation';
import React, {useEffect, useState} from 'react';
import {createAccount, importWalletFromPK} from '@/blockchain/basic';
import Clipboard from '@react-native-clipboard/clipboard';
import {showToast} from '@/helpers/toast';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {addPassword, addPrivateKey, updateWalletState} from '@/store/wallet';
import {reduxStorage} from '@/store';
import {navigate} from '@/helpers/navigation';
import SCREENS from '@/constants/screen';

const CreateWalletScreen = ({
  route,
  navigation,
}: ApplicationScreenProps<'CreateWalletScreen'>) => {
  const {password} = route.params;
  const [privateKey, setPrivateKey] = useState<string>('');
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [address, setAddress] = useState<string>('');
  useEffect(() => {
    handleCreateWallet();
  }, []);

  const handleCreateWallet = async () => {
    const account = await createAccount();

    if (account) {
      setPrivateKey(account.privateKey);
      setAddress(account.address);
    }
  };
  const handlePressCopy = () => {
    Clipboard.setString(privateKey.slice(2));
    showToast('info', 'Private key is saved to Clipboard');
  };

  const handlePressFinish = () => {
    dispatch(updateWalletState({chainId: 97, account: address}));
    dispatch(addPrivateKey(privateKey));
    dispatch(addPassword(password));
    reduxStorage.setItem('address', address);
    reduxStorage.setItem('privateKey', privateKey);
    reduxStorage.setItem('passwordWallet', password);
    // setAsyncStorage('address', account.address);
    // setAsyncStorage('privateKey', account.privateKey);
    // setAsyncStorage('passwordWallet', password);
    // showToast('success', 'Import wallet successfully');
    navigate(SCREENS.MAIN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          // flex: 1,
        }}>
        <View style={{marginTop: 40}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              fontWeight: '500',
              // color: COLORS.secondary3,
            }}>
            Save the private key !!!
          </Text>
          <Text
            // variant="body2Bold"
            style={{
              textAlign: 'center',
              fontSize: 14,
              fontWeight: '500',
              // color: COLORS.secondary3,
              marginTop: 5,
              // marginRight: 5,
            }}>
            If you lose it you won't be able to recover your wallet.
          </Text>
          <View
            style={{
              marginTop: 20,
              alignSelf: 'center',
              flexDirection: 'row',
              // backgroundColor: COLORS.neutral1,
              paddingVertical: 20,
              paddingHorizontal: 25,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              borderWidth: 1,
              // borderColor: COLORS.primary4,
            }}>
            <TouchableOpacity
              onPress={handlePressCopy}
              delayLongPress={0}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  width: 250,
                  textAlign: 'center',
                  color: '#343D48',
                  fontSize: 16,
                  fontWeight: '500',
                  marginRight: 5,
                }}>
                {privateKey.slice(2)}
              </Text>

              <Icon name={'content-copy'} size={28} color={'#343D48'} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handlePressFinish}
          style={styles.continueButton}>
          <Text style={styles.continueText}>Kết nối ví</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default CreateWalletScreen;
