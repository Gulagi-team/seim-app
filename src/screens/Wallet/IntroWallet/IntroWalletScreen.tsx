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
import {styles} from './IntroWalletScreen.styles';
import Logo from '@/assets/images/logo.png';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import {navigate} from '@/helpers/navigation';
import SCREENS from '@/constants/screen';

const IntroWalletScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={Logo}
        style={{height: 120, width: 120}}
        resizeMode={'contain'}
      />
      <Text style={styles.wellcomeText}>WELCOME TO SEIM WALLET</Text>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() =>
          navigate(SCREENS.PASSWORD_WALLET, {to: 'CreateWalletScreen'})
        }>
        <Text style={styles.loginText}>Create wallet</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.importButton}
        onPress={() =>
          navigate(SCREENS.PASSWORD_WALLET, {to: 'ImportWalletScreen'})
        }>
        <Text style={styles.loginText}>Import wallet</Text>
      </TouchableOpacity>

      {/* <Image
        style={styles.welcomeBottom}
        source={WelcomeBottom}
        resizeMode={'stretch'}
      /> */}
    </SafeAreaView>
  );
};
export default IntroWalletScreen;
