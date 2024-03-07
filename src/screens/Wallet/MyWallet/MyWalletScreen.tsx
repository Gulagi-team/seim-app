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
import {styles} from './MyWalletScreen.styles';
import Logo from '@/assets/images/logo.png';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import {navigate} from '@/helpers/navigation';
import SCREENS from '@/constants/screen';
import WalletCard from '@/components/WalletCard/WalletCard';

const MyWalletScreen = () => {
  const onLoginViaGoogle = async () => {};
  return (
    <SafeAreaView style={styles.container}>
      <WalletCard />
      {/* <Image
        style={styles.welcomeBottom}
        source={WelcomeBottom}
        resizeMode={'stretch'}
      /> */}
    </SafeAreaView>
  );
};
export default MyWalletScreen;
