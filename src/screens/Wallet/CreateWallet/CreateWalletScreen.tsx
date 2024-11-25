import {createAccount} from '@/blockchain/basic';
import SCREENS from '@/constants/screen';
import {navigate} from '@/helpers/navigation';
import {showToast} from '@/helpers/toast';
import {reduxStorage} from '@/store';
import {addPassword, addPrivateKey, updateWalletState} from '@/store/wallet';
import {ApplicationScreenProps} from '@/types/navigation';
import Clipboard from '@react-native-clipboard/clipboard';
import {ThunkDispatch} from '@reduxjs/toolkit';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {styles} from './CreateWalletScreen.styles';
import {useTranslation} from 'react-i18next';

const CreateWalletScreen = ({
  route,
  navigation,
}: ApplicationScreenProps<'CreateWalletScreen'>) => {
  const {t} = useTranslation('wallet');
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
    showToast('info', t('copy'));
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
            {t('saveKey')}
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
            {t('desc')}
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
          <Text style={styles.continueText}>{t('connect')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default CreateWalletScreen;
