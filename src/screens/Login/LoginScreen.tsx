/* eslint-disable react-native/no-inline-styles */
import {setToken} from '@/api';
import {login, updateProfile} from '@/api/auth';
import {uploadHabit} from '@/api/habit';
import {addReferral} from '@/api/referral';
import {uploadTaskHistories} from '@/api/task';
import IconGoogle from '@/assets/icons/icon_google.svg';
import LogoSeim from '@/assets/images/logoSeim.png';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import SCREENS from '@/constants/screen';
import {readFromFile, removeFile} from '@/helpers/file';
import {navigate, navigateReset} from '@/helpers/navigation';
import {showToast} from '@/helpers/toast';
import {reduxStorage, StoreState, useAppSelector} from '@/store';
import {updateUserProfile} from '@/store/userInfo';
import {COLORS} from '@/theme';
import {UserProfileType} from '@/types/colection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import Loading from '../Loading/Loading';
import {styles} from './LoginScreen.styles';

const LoginScreen = () => {
  const {t} = useTranslation(['other', 'referral']);
  const dispatch = useDispatch();
  const userInfo = useAppSelector((state: StoreState) => state.userInfo);
  const [refCode, setRefCode] = useState('');

  const {textOutstandingColor, textContainerColor, textBorderColor} =
    useAppSelector((state: StoreState) => state.ThemeSlice);

  const [loading, setLoading] = useState(false);
  const [isAddReferral, setIsAddReferral] = useState(false);
  const {referralCode, referralLink} = useAppSelector(
    (state: StoreState) => state.userInfo,
  );
  const [email, setEmail] = useState('');

  const onLoginViaGoogle = async () => {
    try {
      GoogleSignin.configure({
        webClientId:
          '474737740853-4iohtlair4u6bbp7b60k9hta9v00vuut.apps.googleusercontent.com',
        offlineAccess: true,
      });
      setLoading(true);
      await GoogleSignin.signOut();
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

        setEmail(result.user.email);
        const lastLogin = await AsyncStorage.getItem('lastLogin');

        if (lastLogin !== userProfile.email) {
          await AsyncStorage.removeItem('mining');
          await removeFile('habits.json');
          reduxStorage.removeItem('userInfo');
          await removeFile('task_histories.json');
          //reset userInfo
          const initUserInfo = {
            access_token: '',
            email: '',
            name: '',
            avatar: '',
            language: 'en',
            gender: 'other',
            old: 15,
            height: 165,
            weight: 65,
            referralCode: '',
            referralLink: 'get.seim.io/ref=FDFAA',
            miningEarned: 0,
            wallet: '',
          };
          reduxStorage.setItem('userInfo', JSON.stringify(initUserInfo));
        }

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

        await AsyncStorage.removeItem('userInfo');

        // createdAt, isFinished, point, taskId

        await updateProfile(profile);
        await uploadHabit(dataUpdateHabit);
        await uploadTaskHistories(dataUpdateTask);
        await AsyncStorage.setItem('userInfo', JSON.stringify(userProfile));
        await AsyncStorage.setItem('lastLogin', userProfile.email);
        dispatch(updateUserProfile(userProfile));
        setLoading(false);

        const addReferralEmails = await AsyncStorage.getItem('addReferral');
        const convertToArr = addReferralEmails
          ? JSON.parse(addReferralEmails)
          : [];
        const addReferralEmail = convertToArr.find(
          (item: string) => item === userProfile.email,
        );
        if (addReferralEmail === userProfile.email) {
          navigateReset(SCREENS.MAIN);
        } else {
          setIsAddReferral(true);
        }
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('SIGN_IN_CANCELLED');
        navigate(SCREENS.MAIN);

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

  const handlePasteCode = async () => {
    const code = await Clipboard.getString();
    if (code === referralCode) {
      showToast('error', t('sameCode'));
      return;
    }
    setRefCode(code);
  };
  const handleAddCode = async () => {
    if (refCode === '') {
      showToast('error', t('referral:empty'));
      return;
    }

    if (refCode === referralCode) {
      showToast('error', t('referral:sameCode'));
      return;
    }
    setLoading(true);
    const response = await addReferral(refCode);
    setLoading(false);

    if (!response.error) {
      showToast('success', t('referral:success'));
      setRefCode('');
      //push email to addReferral
      const addReferralEmails = await AsyncStorage.getItem('addReferral');
      const convertToArr = addReferralEmails
        ? JSON.parse(addReferralEmails)
        : [];
      convertToArr.push(email);
      await AsyncStorage.setItem('addReferral', JSON.stringify(convertToArr));
      navigateReset(SCREENS.MAIN);
    } else {
      showToast('error', t('referral:error'));
    }
  };

  const handleSkip = async () => {
    setRefCode('');
    //push email to addReferral
    const addReferralEmails = await AsyncStorage.getItem('addReferral');
    const convertToArr = addReferralEmails ? JSON.parse(addReferralEmails) : [];
    convertToArr.push(email);
    await AsyncStorage.setItem('addReferral', JSON.stringify(convertToArr));
    navigateReset(SCREENS.MAIN);
  };
  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loading />}
      <View style={styles.containerView}>
        <Image
          source={LogoSeim}
          style={{height: 120, width: 120}}
          resizeMode={'contain'}
        />
        {!isAddReferral && (
          <>
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
          </>
        )}
      </View>
      {isAddReferral && (
        <>
          <View
            style={{
              ...styles.codeContainer,
              backgroundColor: textContainerColor,
              borderColor: textBorderColor,
            }}>
            <TextInput
              style={{...styles.codeInput, color: textOutstandingColor}}
              onChangeText={value => {
                if (value !== '' || value !== refCode) {
                  setRefCode(value);
                }
              }}
              placeholder={t('referral:enterCode')}
              placeholderTextColor={COLORS.text_A400}
              numberOfLines={1}
              value={refCode}
            />

            <TouchableOpacity
              style={styles.pasteContainer}
              onPress={handlePasteCode}>
              <Text style={styles.codeTitle}>{t('referral:paste')}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleAddCode}
            style={{
              ...styles.addCodeContainer,
              backgroundColor: refCode === '' ? '#96d2ff' : COLORS.primary_A500,
            }}>
            <Text style={styles.addCodeText}>{t('referral:add')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSkip}
            style={{
              ...styles.addCodeContainer,
              backgroundColor: COLORS.alert_serious,
              width: '40%',
            }}>
            <Text style={styles.addCodeText}>{t('referral:skip')}</Text>
          </TouchableOpacity>
        </>
      )}

      <Image
        style={styles.welcomeBottom}
        source={WelcomeBottom}
        resizeMode={'stretch'}
      />
    </SafeAreaView>
  );
};
export default LoginScreen;
