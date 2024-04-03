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

import {formatPricing, getShortAddress} from '@/helpers/conversion';
import {StoreState, reduxStorage, useAppSelector} from '@/store';
import {
  disconnectWallet,
  updateWalletBalance,
  updateWalletTokenBalance,
} from '@/store/wallet';
import {navigate} from '@/helpers/navigation';
import {getWalletBalance} from '@/blockchain/basic';
import {COLORS, FONT_SIZE, POPPINS_MEDIUM} from '@/theme';
import POINT_SEIM from '@/assets/images/point_seim.png';
import BACKGROUND_REWARD from '@/assets/images/background_reward.png';
import SCREENS from '@/constants/screen';

export const WalletBalance = () => {
  const currentAccount = useAppSelector(
    state => state.walletSlice.currentAccount,
  );
  const {
    backgroundColor,
    containerColor,
    textColor,
    borderColor,
    borderSelectedColor,
    cardWalletBackgroundColor,
    cardWalletBorderColor,
    cardWalletTitleColor,
  } = useAppSelector((state: StoreState) => state.ThemeSlice);
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text
        style={{
          fontFamily: POPPINS_MEDIUM,
          fontSize: FONT_SIZE.small1,
          fontWeight: '500',
          color: textColor,
          paddingRight: 5,
        }}>
        {getShortAddress(currentAccount)}
      </Text>
      <Icon
        name="content-copy"
        style={{fontSize: FONT_SIZE.small1, color: cardWalletTitleColor}}
      />
    </View>
  );
};

const WalletCard = () => {
  const dispatch = useDispatch();
  const {currentAccount, balance, tokenBalance} = useAppSelector(
    (state: StoreState) => state.walletSlice,
  );
  const {
    backgroundColor,
    containerColor,
    textColor,
    borderColor,
    borderSelectedColor,
    cardWalletBackgroundColor,
    cardWalletBorderColor,
    cardWalletTitleColor,
  } = useAppSelector((state: StoreState) => state.ThemeSlice);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (currentAccount) {
      handleGetBalanceWallet();
    }
  }, [currentAccount]);

  const handleGetBalanceWallet = async () => {
    const balance = await getWalletBalance(currentAccount);
    dispatch(updateWalletBalance(balance.toString()));
  };

  const handleDisconnect = async () => {
    dispatch(disconnectWallet());
    reduxStorage.setItem('address', '');
    reduxStorage.setItem('privateKey', '');
    reduxStorage.setItem('passwordWallet', '');
  };

  return (
    <View
      style={{
        ...styles.cardContainer,
        backgroundColor: cardWalletBackgroundColor,
        borderColor: cardWalletBorderColor,
      }}>
      <Image
        source={BACKGROUND_REWARD}
        style={styles.imageBackgroundReward}
        resizeMode={'contain'}
      />
      {currentAccount ? (
        <View style={{padding: 15}}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            delayLongPress={0}>
            <WalletBalance />
          </TouchableOpacity>
          <View style={{marginTop: 20}}>
            <Text style={{...styles.balanceText, color: cardWalletTitleColor}}>
              Your balance
            </Text>
            <View style={styles.balanceContainer}>
              <Image
                source={POINT_SEIM}
                style={styles.imagePoint}
                resizeMode={'contain'}
              />
              <Text style={{...styles.balanceTokenText, color: textColor}}>
                {formatPricing(balance)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleDisconnect}
            delayLongPress={0}
            style={{
              backgroundColor: backgroundColor,
              padding: 7,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: cardWalletBorderColor,
              alignItems: 'center',
              position: 'absolute',
              top: '50%',
              right: '5%',
              flexDirection: 'row',
              zIndex: 2,
            }}>
            <Text
              style={{
                fontSize: FONT_SIZE.small1,
                fontWeight: '500',
                color: textColor,
              }}>
              Disconnect
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigate(SCREENS.INTRO_WALLET_SCREEN)}
            delayLongPress={0}>
            <View
              style={{
                backgroundColor: backgroundColor,
                padding: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: cardWalletBorderColor,
                width: 200,
              }}>
              <Text
                style={{
                  fontSize: FONT_SIZE.small0,
                  fontWeight: '600',
                  color: textColor,
                  // marginTop: 10,
                  fontFamily: POPPINS_MEDIUM,
                  alignSelf: 'center',
                }}>
                Connect wallet
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default WalletCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 150,
    position: 'relative',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 12,
    borderRadius: 10,
  },
  imageBackgroundReward: {
    width: '70%',
    height: 150,
    position: 'absolute',
    right: 0,
  },
  balanceText: {
    fontFamily: POPPINS_MEDIUM,
    fontSize: FONT_SIZE.tiny0,
    fontWeight: '500',
  },
  balanceContainer: {
    flexDirection: 'row',
    // marginTop: 5,
    alignItems: 'center',
  },
  imagePoint: {
    width: 20,
    height: 20,
  },
  balanceTokenText: {
    marginLeft: 5,
    fontFamily: POPPINS_MEDIUM,
    fontSize: FONT_SIZE.medium0,
    fontWeight: '600',
  },
});
