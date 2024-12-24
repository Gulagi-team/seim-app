import {importWalletFromPK} from '@/blockchain/basic';
import SCREENS from '@/constants/screen';
import {navigate} from '@/helpers/navigation';
import {reduxStorage} from '@/store';
import {addPassword, addPrivateKey, updateWalletState} from '@/store/wallet';
import {ApplicationScreenProps} from '@/types/navigation';
import {ThunkDispatch} from '@reduxjs/toolkit';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {styles} from './ImportWalletScreen.styles';

const ImportWalletScreen = ({
  route,
  navigation,
}: ApplicationScreenProps<'ImportWalletScreen'>) => {
  const {t} = useTranslation('wallet');
  // const {password} = route.params;
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [privateKey, setPrivateKey] = useState<string>('');
  const disableSubmit = !!privateKey;
  // const handlePrivateKey = (txt: string) => {
  //   setPrivateKey(txt);
  // };
  const handleImportPrivateKey = async () => {
    const account = await importWalletFromPK(privateKey);
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
