import {StoreState, useAppSelector} from '@/store';
import {InfoState, updateLanguage} from '@/store/userInfo';
import {POPPINS_BOLD, POPPINS_MEDIUM} from '@/theme';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';

import {
  Text,
  View,
  Button,
  TextInput,
  Pressable,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
const GetInfoStep1Content = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation(['welcome']);
  const language = useAppSelector(
    (state: StoreState) => state.userInfo.language,
  );
  return (
    <View style={styles.container}>
      <View style={styles.question}>
        <Text style={styles.howOldAre1}>{t('titleStep1')}</Text>
        <Text style={styles.letUsKnow1}>{t('descStep1')}</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => dispatch(updateLanguage('en'))}
          style={{
            ...styles.options,
            backgroundColor: language === 'en' ? '#1b9cfc' : '#ffffff',
          }}>
          <Text
            style={{
              ...styles.optionContent,
              color: language === 'en' ? '#fff' : 'black',
            }}>
            English
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(updateLanguage('vi'))}
          style={{
            ...styles.options,
            backgroundColor: language === 'vi' ? '#1b9cfc' : '#ffffff',
          }}>
          <Text
            style={{
              ...styles.optionContent,
              color: language === 'vi' ? '#fff' : 'black',
            }}>
            Tiếng Việt
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(updateLanguage('kr'))}
          style={{
            ...styles.options,
            backgroundColor: language === 'kr' ? '#1b9cfc' : '#ffffff',
          }}>
          <Text
            style={{
              ...styles.optionContent,
              color: language === 'kr' ? '#fff' : 'black',
            }}>
            Korea
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(updateLanguage('cn'))}
          style={{
            ...styles.options,
            backgroundColor: language === 'cn' ? '#1b9cfc' : '#ffffff',
          }}>
          <Text
            style={{
              ...styles.optionContent,
              color: language === 'cn' ? '#fff' : 'black',
            }}>
            Chinese
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 24,
    flex: 1,
    backgroundColor: 'white',
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
    // height: 100,
    // flex: 1,
    marginTop: 22,
  },
  options: {
    // backgroundColor: "#1b9cfc",
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

export default GetInfoStep1Content;
