/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {showToast} from '@/helpers/toast';

import {updateProfile} from '@/api/auth';
import Header from '@/components/Header';
import {getStringLocal} from '@/helpers/localStorage';
import {generateArray} from '@/helpers/others';
import {reduxStorage, StoreState, useAppSelector} from '@/store';
import {getAuth} from '@/store/auth';
import {COLORS} from '@/theme';
import {UserProfileType} from '@/types/colection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import {styles} from './UpdateProfileScreen.style';

const UpdateProfileScreen = () => {
  const {t} = useTranslation();

  const getUserInfoLocal = getStringLocal('userInfo');
  const {weight, height, old, gender, name} = JSON.parse(
    getUserInfoLocal as string,
  );

  const [updateUser, setUpdateUser] = useState({
    name: '',
    weight: weight || 65,
    height: height || 165,
    old: old || 18,
    gender: gender || 'Male',
  });
  const [user, setUser] = useState<UserProfileType>();
  useEffect(() => {
    const getInfo = async () => {
      const userExist = await getAuth();
      if (userExist) {
        setUser(userExist);
        setUpdateUser({
          ...updateUser,
          name: name !== '' ? name : userExist.name,
        });
      }
    };
    getInfo();
  }, []);

  const handleChange = (key: string, value: string) => {
    setUpdateUser({...updateUser, [key]: value});
  };

  const handleUpdate = async () => {
    try {
      const resposne = await updateProfile(updateUser);
      if (resposne.status !== 204) {
        return;
      }
      showToast('success', t('setting:updateSuccess'));

      await AsyncStorage.setItem(
        'userInfo',
        JSON.stringify({
          ...user,
          name: updateUser.name,
        }),
      );

      reduxStorage.setItem(
        'userInfo',
        JSON.stringify({
          ...updateUser,
        }),
      );
    } catch (error) {
      console.log('error', error);
    }
  };
  const myArrayWeight: number[] = generateArray(0, 170);
  const myArrayHeight: number[] = generateArray(0, 210);

  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  const {textOutstandingColor, textColor, textContainerColor, textBorderColor} =
    useAppSelector((state: StoreState) => state.ThemeSlice);
  return (
    <SafeAreaView style={{...styles.container}}>
      <Header
        title={t('setting:updateProfile')}
        canGoBack={true}
        handleGoBack={goBack}
      />

      <ScrollView style={styles.scrollView}>
        <View
          style={{
            ...styles.nameContainer,
            backgroundColor: textContainerColor,
            borderColor: textBorderColor,
          }}>
          <Text style={{...styles.nameTitle, color: textOutstandingColor}}>
            {t('setting:name')}
          </Text>
          <TextInput
            style={{...styles.nameInput, color: textColor}}
            onChangeText={value => handleChange('name', value)}
            value={updateUser.name}
            placeholderTextColor={'#A3A3A3'}
            numberOfLines={1}
          />
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
          }}>
          <View
            style={{
              ...styles.nameContainer,
              backgroundColor: textContainerColor,
              borderColor: textBorderColor,
              width: '50%',
            }}>
            <Text style={{...styles.nameTitle, color: textOutstandingColor}}>
              {t('setting:gender')}
            </Text>
            <Picker
              selectedValue={updateUser.gender}
              onValueChange={itemValue => {
                setUpdateUser({...updateUser, gender: itemValue});
              }}
              style={{
                height: 50,
                width: '100%',
                color: textColor,
                backgroundColor: textContainerColor,
              }}>
              <Picker.Item label={t('welcome:male')} value="male" />
              <Picker.Item label={t('welcome:female')} value="female" />
              <Picker.Item label={t('welcome:nonBinary')} value="nonBinary" />
              <Picker.Item label={t('welcome:other')} value="other" />
            </Picker>
          </View>
          <View
            style={{
              ...styles.nameContainer,
              backgroundColor: textContainerColor,
              borderColor: textBorderColor,
              width: '50%',
            }}>
            <Text style={{...styles.nameTitle, color: textOutstandingColor}}>
              {t('setting:old')}
            </Text>
            <TextInput
              style={styles.oldInput}
              keyboardType={'numeric'}
              // textContentType={'birthdateYear'}
              value={updateUser.old.toString()}
              onChangeText={value => {
                setUpdateUser({...updateUser, old: +value});
              }}
              placeholderTextColor={COLORS.text_A400}
              numberOfLines={1}
              maxLength={2}
            />
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
          }}>
          <View
            style={{
              ...styles.nameContainer,
              backgroundColor: textContainerColor,
              borderColor: textBorderColor,
              width: '50%',
            }}>
            <Text style={{...styles.nameTitle, color: textOutstandingColor}}>
              {t('setting:weight')}
            </Text>
            <ScrollPicker
              dataSource={myArrayWeight}
              selectedIndex={updateUser.weight}
              onValueChange={data => {
                setUpdateUser({...updateUser, weight: +data});
              }}
              wrapperHeight={100}
              itemTextStyle={{fontSize: 20, fontWeight: '700', color: '#ddd'}}
              itemHeight={40}
              highlightColor="black"
              activeItemTextStyle={{
                fontSize: 20,
                fontWeight: '700',
                color: 'black',
              }}
              // highlightBorderWidth={2}
            />
          </View>
          <View
            style={{
              ...styles.nameContainer,
              backgroundColor: textContainerColor,
              borderColor: textBorderColor,
              width: '50%',
            }}>
            <Text style={{...styles.nameTitle, color: textOutstandingColor}}>
              {t('setting:height')}
            </Text>
            <ScrollPicker
              dataSource={myArrayHeight}
              selectedIndex={updateUser.height}
              onValueChange={data => {
                setUpdateUser({...updateUser, height: +data});
              }}
              wrapperHeight={100}
              itemTextStyle={{fontSize: 10, fontWeight: '700', color: '#ddd'}}
              itemHeight={40}
              highlightColor="black"
              activeItemTextStyle={{
                fontSize: 20,
                fontWeight: '700',
                color: 'black',
              }}
              // highlightBorderWidth={2}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateText}>{t('setting:save')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateProfileScreen;
