import {Image, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './LoginScreen.styles';
import LogoSeim from '@/assets/images/logoSeim.png';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import IconGoogle from '@/assets/icons/icon_google.svg';
import {navigate, navigateReset} from '@/helpers/navigation';
import SCREENS from '@/constants/screen';
import {UserProfileType} from '@/types/colection';
import {useDispatch} from 'react-redux';
import {updateUserProfile} from '@/store/userInfo';
import {getUserProfileMiddleware, login} from '@/api/auth';
import auth from '@react-native-firebase/auth';
import {showToast} from '@/helpers/toast';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const onLoginViaGoogle = async () => {
    try {
      GoogleSignin.configure({
        webClientId:
          '474737740853-4iohtlair4u6bbp7b60k9hta9v00vuut.apps.googleusercontent.com',
        offlineAccess: true,
      });
      const result = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        result.idToken,
      );
      const firebaseAuth = await auth().signInWithCredential(googleCredential);
      const idtoken = await firebaseAuth.user.getIdTokenResult();
      if (result) {
        const respone = await login(idtoken.token);
        const userProfile: UserProfileType = {
          access_token: respone.data.accessToken,
          email: result.user.email,
          name: result.user.name || '',
          avatar: result.user.photo || '',
        };
        dispatch(updateUserProfile(userProfile));
        if (respone.data?.isNewUser) {
          navigate(SCREENS.WELCOME);
        } else {
          await getUserProfileMiddleware();

          navigateReset(SCREENS.MAIN);
        }
      }
    } catch (error: any) {
      console.log('onLoginViaGoogle error', {error});
      error.code !== statusCodes.SIGN_IN_CANCELLED &&
        showToast('error', 'Fail to login via Google. Please try again!');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerView}>
        <Image
          source={LogoSeim}
          style={{height: 120, width: 120}}
          resizeMode={'contain'}
        />
        <TouchableOpacity
          style={styles.googleButton}
          onPress={onLoginViaGoogle}>
          <IconGoogle />
          <Text style={styles.loginText}>Log in with Google</Text>
        </TouchableOpacity>
      </View>

      <Image
        style={styles.welcomeBottom}
        source={WelcomeBottom}
        resizeMode={'stretch'}
      />
    </SafeAreaView>
  );
};
export default LoginScreen;
