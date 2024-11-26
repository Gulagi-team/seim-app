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
import {styles} from './ImportWalletScreen.styles';
import LogoSeim from '@/assets/images/logoSeim.png';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import IconGoogle from '@/assets/icons/icon_google.svg';
import {ApplicationScreenProps} from '@/types/navigation';
import React, {useState} from 'react';
import {importWalletFromPK} from '@/blockchain/basic';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {navigate} from '@/helpers/navigation';
import SCREENS from '@/constants/screen';
import {addPassword, addPrivateKey, updateWalletState} from '@/store/wallet';
import {reduxStorage} from '@/store';
import {useTranslation} from 'react-i18next';

const ImportWalletScreen = ({
  route,
  navigation,
}: ApplicationScreenProps<'ImportWalletScreen'>) => {
  const {t} = useTranslation('wallet');
  const {password} = route.params;
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [privateKey, setPrivateKey] = useState<string>('');
  const disableSubmit = !!privateKey;
  // const handlePrivateKey = (txt: string) => {
  //   setPrivateKey(txt);
  // };
  const handleImportPrivateKey = async () => {
    console.log('privateKey', privateKey);
    const account = await importWalletFromPK(privateKey);
    console.log('account', account);
    if (account) {
      dispatch(updateWalletState({chainId: 97, account: account.address}));
      dispatch(addPrivateKey(account.privateKey));
      dispatch(addPassword(password));
      reduxStorage.setItem('address', account.address);
      reduxStorage.setItem('privateKey', account.privateKey);
      reduxStorage.setItem('passwordWallet', password);
      navigate(SCREENS.MAIN);
    } else {
      // showToast('error', "Can't get wallet from your private key");
    }
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
        <View
          style={{
            // marginTop: 20,
            alignSelf: 'center',
            // flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>{t('importTitle')}</Text>
        </View>
        <View
          style={{
            marginTop: 30,
            width: '80%',
            height: 80,
            // borderColor: COLORS.sub_text,
            borderWidth: 2,
          }}>
          <TextInput
            placeholder={t('pKey')}
            placeholderTextColor={'#808080'}
            multiline
            numberOfLines={4}
            onChangeText={value => setPrivateKey(value)}
          />
        </View>

        <TouchableOpacity
          onPress={handleImportPrivateKey}
          // disabled={disabled}
          style={{
            ...styles.continueButton,
            // opacity: disabled ? 0.25 : 1,
          }}>
          <Text style={styles.continueText}>{t('connect')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default ImportWalletScreen;
