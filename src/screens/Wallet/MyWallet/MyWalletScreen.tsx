import WalletCard from '@/components/WalletCard/WalletCard';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './MyWalletScreen.styles';

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
