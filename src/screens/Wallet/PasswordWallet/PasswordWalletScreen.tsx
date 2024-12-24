import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './PasswordWalletScreen.styles';

import Header from '@/components/Header';
import PasswordInput from '@/components/passwordInput/PasswordInput';
import SCREENS from '@/constants/screen';
import {navigate} from '@/helpers/navigation';
import {ApplicationScreenProps} from '@/types/navigation';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';

const PasswordWalletScreen = ({
  route,
  navigation,
}: ApplicationScreenProps<'PasswordWalletScreen'>) => {
  const {to} = route.params;

  const {t} = useTranslation(['wallet']);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const disabled = password.length < 6 || password !== confirmPassword;

  const handleSubmit = () => {
    if (to === 'CreateWalletScreen') {
      navigate(SCREENS.CREATE_WALLET, {password});
    } else {
      navigate(SCREENS.IMPORT_WALLET, {password});
    }
  };

  return (
    <SafeAreaView>
      <Header
        renderLogo
        // canGoBack={!(idxContent === 0)}
        // handleGoBack={() => ref.current?.prev()}
      />
      <View style={styles.container}>
        <View
          style={{
            width: '80%',
          }}>
          <PasswordInput
            placeholder={t('password')}
            onChangeText={value => setPassword(value)}
          />
          <Text style={styles.warningText}>{t('minPassword')}</Text>
        </View>
        <View style={{width: '80%', marginTop: 15}}>
          <PasswordInput
            placeholder={t('confirmPassword')}
            onChangeText={value => setConfirmPassword(value)}
          />
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={disabled}
          style={{
            ...styles.continueButton,
            opacity: disabled ? 0.25 : 1,
          }}>
          <Text style={styles.continueText}>{t('confirm<')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default PasswordWalletScreen;
