import {setToken} from '@/api';
import {login, updateProfile} from '@/api/auth';
import IconGoogle from '@/assets/icons/icon_google.svg';
import LogoSeim from '@/assets/images/logoSeim.png';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import {StoreState, useAppSelector} from '@/store';
import {updateUserProfile} from '@/store/userInfo';
import {UserProfileType} from '@/types/colection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {styles} from './LoginScreen.styles';
import {readFromFile} from '@/helpers/file';
import {uploadHabit} from '@/api/habit';
import {navigate, navigateReset} from '@/helpers/navigation';
import SCREENS from '@/constants/screen';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {uploadTaskHistories} from '@/api/task';

const LoginScreen = () => {
  const {t} = useTranslation(['other']);
  const dispatch = useDispatch();
  const userInfo = useAppSelector((state: StoreState) => state.userInfo);

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
      const aaa = await auth().signInWithCredential(googleCredential);
      const idtoken = await aaa.user.getIdTokenResult();
      if (result) {
        const response = await login(idtoken);
        setToken(response.data.accessToken);

        const userProfile: UserProfileType = {
          access_token: response.data.accessToken,
          name: result.user.name || '',
          avatar: result.user.photo || '',
          email: result.user.email,
        };

        const profile = {
          gender: userInfo.gender,
          old: userInfo.old,
          height: userInfo.height,
          weight: userInfo.weight,
        };

        const habitsFromFile = await readFromFile('habits.json');

        const dataUpdateHabit: {
          habitId: string;
          startDate: string;
          endDate: string;
        }[] = [];

        habitsFromFile.forEach(item => {
          dataUpdateHabit.push({
            habitId: item.habit.id,
            startDate: item.startDate,
            endDate: item.endDate,
          });
        });

        const dataUpdateTask: {
          createdAt: string;
          isFinished: boolean;
          point: number;
          taskId: string;
        }[] = [];

        const taskHistories = await readFromFile('task_histories.json');
        taskHistories.forEach(item => {
          dataUpdateTask.push({
            createdAt: item.createdAt,
            isFinished: item.isFinished,
            point: item.point,
            taskId: item.taskId,
          });
        });

        // createdAt, isFinished, point, taskId

        await updateProfile(profile);
        await uploadHabit(dataUpdateHabit);
        await uploadTaskHistories(dataUpdateTask);
        await AsyncStorage.setItem('userInfo', JSON.stringify(userProfile));
        dispatch(updateUserProfile(userProfile));
        navigate(SCREENS.MAIN);
      }
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
          <Text style={styles.loginText}>{t('login')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.googleButton, marginTop: 10}}
          onPress={() => {
            navigateReset(SCREENS.MAIN);
          }}>
          <Text style={{...styles.loginText, marginLeft: 0}}>
            {t('goHome')}
          </Text>
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
