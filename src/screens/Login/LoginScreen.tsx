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
import {styles} from './LoginScreen.styles';
import LogoSeim from '@/assets/images/logoSeim.png';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import IconGoogle from '@/assets/icons/icon_google.svg';
import {navigate} from '@/helpers/navigation';
import SCREENS from '@/constants/screen';
import {UserProfileType} from '@/types/colection';
import {useDispatch} from 'react-redux';
import {updateUserProfile} from '@/store/userInfo';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const onLoginViaGoogle = async () => {
    try {
      GoogleSignin.configure({
        webClientId:
          '474737740853-4iohtlair4u6bbp7b60k9hta9v00vuut.apps.googleusercontent.com',
        offlineAccess: true,
      });
      const a = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const result = await GoogleSignin.signIn();
      const userProfile: UserProfileType = {
        email: result.user.email,
        name: result.user.name || '',
        avatar: result.user.photo || '',
      };
      dispatch(updateUserProfile(userProfile));
      navigate(SCREENS.WELCOME);

      // if (token?.accessToken) {
      //   // loginViaGoogleMiddleware(token.accessToken, (res) =>
      //   //   handleLoginSuccessViaThirdParty(res, LoginThirdPartyType.GOOGLE),
      //   // );
      //   console.log('token.accessToken:', token.accessToken);
      // }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('SIGN_IN_CANCELLED');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('IN_PROGRESS', error);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        console.log('error', {error});
        // some other error happened
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={LogoSeim}
        style={{height: 120, width: 120}}
        resizeMode={'contain'}
      />
      <TouchableOpacity style={styles.googleButton} onPress={onLoginViaGoogle}>
        <IconGoogle />
        <Text style={styles.loginText}>Log in with Google</Text>
      </TouchableOpacity>

      <Image
        style={styles.welcomeBottom}
        source={WelcomeBottom}
        resizeMode={'stretch'}
      />
    </SafeAreaView>
  );
};
export default LoginScreen;
