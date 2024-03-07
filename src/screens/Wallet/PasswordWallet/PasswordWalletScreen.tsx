import {
  ActivityIndicator,
  Button,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './PasswordWalletScreen.styles';
import LogoSeim from '@/assets/images/logoSeim.png';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {useState} from 'react';
import PasswordInput from '@/components/passwordInput/PasswordInput';
import Header from '@/components/Header';
import {ApplicationScreenProps} from '@/types/navigation';
import {navigate} from '@/helpers/navigation';
import SCREENS from '@/constants/screen';

const PasswordWalletScreen = ({
  route,
  navigation,
}: ApplicationScreenProps<'PasswordWalletScreen'>) => {
  const {to} = route.params;
  console.log('to', to);

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
            placeholder={'Mật khẩu'}
            onChangeText={value => setPassword(value)}
          />
          <Text style={styles.warningText}>Nhập ít nhất 6 kí tự</Text>
        </View>
        <View style={{width: '80%', marginTop: 15}}>
          <PasswordInput
            placeholder="Nhập lại mật khẩu"
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
          <Text style={styles.continueText}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default PasswordWalletScreen;
