import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

import SCREEN from '@/constants/screen';

import {formatPricing, getShortAddress} from '@/helpers/conversion';
import {StoreState, reduxStorage, useAppSelector} from '@/store';
import {
  disconnectWallet,
  updateWalletBalance,
  updateWalletTokenBalance,
} from '@/store/wallet';
import {navigate} from '@/helpers/navigation';
import {getWalletBalance} from '@/blockchain/basic';
import {useTranslation} from 'react-i18next';

// import MyWalletModal from '@/components/Modal/MyWalletModal.js';
// import LoadingModal from '@/components/Modal/LoadingModal.js';

export const WalletBalance = () => {
  const currentAccount = useAppSelector(
    state => state.walletSlice.currentAccount,
  );
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Icon
        name="account-balance-wallet"
        style={{fontSize: 30, color: 'black'}}
      />
      <Text
        style={{
          // fontFamily: MONT_BOLD,
          fontSize: 14,
          color: 'black',
          fontWeight: '700',
          // marginTop: 5,
          marginLeft: 7,
        }}>
        {getShortAddress(currentAccount)}
      </Text>
    </View>
  );
};

const MiningCard = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation(['mining']);
  const {currentAccount, balance, tokenBalance} = useAppSelector(
    (state: StoreState) => state.walletSlice,
  );
  // const isLoading = useSelector(state => state.transactionReducer.isLoading);
  const [modalVisible, setModalVisible] = useState(false);
  // const [modalLoadingVisible, setModalLoadingVisible] = useState(isLoading);
  useEffect(() => {
    if (currentAccount) {
      handleGetBalanceWallet();
    }
  }, [currentAccount]);

  const handleGetBalanceWallet = async () => {
    const balance = await getWalletBalance(currentAccount);
    dispatch(updateWalletBalance(balance.toString()));
  };

  const handleTopUp = async () => {
    // dispatch(disconnectWallet());
    // reduxStorage.setItem('address', '');
    // reduxStorage.setItem('privateKey', '');
    // reduxStorage.setItem('passwordWallet', '');
  };

  return (
    <View
      style={{
        width: '100%',
        height: 200,
        backgroundColor: 'black',
        position: 'relative',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 10,
      }}>
      {currentAccount ? (
        <View>
          <View
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 10,
              // marginLeft: 80,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#fff',
                marginLeft: 7,
              }}>
              BSC Testnet
            </Text>
          </View>

          <View style={{marginLeft: 10, marginTop: 20}}>
            <Text
              style={{
                // fontFamily: MONT_BOLD,
                fontSize: 14,
                color: '#fff',
              }}>
              {t('balance')}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: '#EDEEF0',
                marginTop: 2,
              }}>
              TBNB: {formatPricing(balance)}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#f2f2f2',
              width: '80%',
              padding: 5,
              marginLeft: 35,
              marginTop: 15,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              delayLongPress={0}>
              <WalletBalance />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleTopUp}
            delayLongPress={0}
            style={{
              backgroundColor: '#fff',
              padding: 7,
              borderRadius: 10,
              alignItems: 'center',
              position: 'absolute',
              top: '40%',
              right: '5%',
              flexDirection: 'row',
              zIndex: 2,
            }}>
            <Text
              style={{
                // fontFamily: MONT_BOLD,
                fontSize: 14,
                fontWeight: '600',
              }}>
              {t('disconnect')}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            marginTop: 80,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigate(SCREEN.INTRO_WALLET_SCREEN)}
            delayLongPress={0}>
            <View
              style={{
                backgroundColor: '#fafafa',
                padding: 10,
                borderRadius: 10,
                width: 200,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  // fontFamily: MONT_BOLD,
                  fontSize: 14,
                  color: 'black',
                  paddingVertical: 5,
                }}>
                {t('connectWallet')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MiningCard;

const styles = StyleSheet.create({});
