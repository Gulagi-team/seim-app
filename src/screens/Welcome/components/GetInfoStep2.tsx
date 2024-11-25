import {StoreState, useAppSelector} from '@/store';
import {updateGender} from '@/store/userInfo';
import {POPPINS_BOLD, POPPINS_MEDIUM} from '@/theme';
import React from 'react';
import {useTranslation} from 'react-i18next';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';

const GetInfoStep2Content = () => {
  const {t} = useTranslation(['welcome']);
  const dispatch = useDispatch();
  const gender = useAppSelector((state: StoreState) => state.userInfo.gender);

  return (
    <View style={styles.container}>
      <View style={styles.question}>
        <Text style={styles.howOldAre1}>{t('titleStep2')}</Text>
        <Text style={styles.letUsKnow1}>{t('descStep2')}</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => dispatch(updateGender('male'))}
          style={{
            ...styles.options,
            backgroundColor: gender === 'male' ? '#1b9cfc' : '#ffffff',
          }}>
          <Text
            style={{
              ...styles.optionContent,
              color: gender === 'male' ? '#fff' : 'black',
            }}>
            {t('male')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(updateGender('female'))}
          style={{
            ...styles.options,
            backgroundColor: gender === 'female' ? '#1b9cfc' : '#ffffff',
          }}>
          <Text
            style={{
              ...styles.optionContent,
              color: gender === 'female' ? '#fff' : 'black',
            }}>
            {t('female')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(updateGender('nonBinary'))}
          style={{
            ...styles.options,
            backgroundColor: gender === 'nonBinary' ? '#1b9cfc' : '#ffffff',
          }}>
          <Text
            style={{
              ...styles.optionContent,
              color: gender === 'nonBinary' ? '#fff' : 'black',
            }}>
            {t('nonBinary')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(updateGender('other'))}
          style={{
            ...styles.options,
            backgroundColor: gender === 'other' ? '#1b9cfc' : '#ffffff',
          }}>
          <Text
            style={{
              ...styles.optionContent,
              color: gender === 'other' ? '#fff' : 'black',
            }}>
            {t('other')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 24,
  },
  question: {
    width: '100%',
    paddingBottom: 16,
  },
  howOldAre1: {
    fontSize: 20,
    letterSpacing: 0,
    fontWeight: '700',
    fontFamily: POPPINS_BOLD,
    color: '#171717',
    textAlign: 'left',
  },
  letUsKnow1: {
    fontSize: 14,
    fontFamily: POPPINS_MEDIUM,
    color: '#525252',
    marginTop: 8,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  content: {
    width: '100%',
    marginTop: 22,
  },
  options: {
    width: '100%',
    height: 64,
    borderRadius: 15,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  optionContent: {
    fontSize: 16,
    letterSpacing: 0,
    fontWeight: '600',
    fontFamily: POPPINS_MEDIUM,
    // color: "#fff",
    textAlign: 'left',
    // backgroundColor: "red",
  },
});

export default GetInfoStep2Content;
