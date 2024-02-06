import {StoreState, useAppSelector} from '@/store';
import {updateGender} from '@/store/userInfo';
import {useState} from 'react';

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

const GetInfoStep2Content = () => {
  const dispatch = useDispatch();
  const gender = useAppSelector((state: StoreState) => state.userInfo.gender);

  return (
    <View style={styles.container}>
      <View style={styles.question}>
        <Text style={styles.howOldAre1}>What’s your gender?</Text>
        <Text style={styles.letUsKnow1}>
          Let us know more about you, so we can craft a personalized experience
          just for you.
        </Text>
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
            Male
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
            Female
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
            Non-binary
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
            Other
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
    fontFamily: 'Inter-Bold',
    color: '#171717',
    textAlign: 'left',
  },
  letUsKnow1: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
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
    borderWidth:1,
    borderColor:'#ddd'
  },
  optionContent: {
    fontSize: 16,
    letterSpacing: 0,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    // color: "#fff",
    textAlign: 'left',
    // backgroundColor: "red",
  },
});

export default GetInfoStep2Content;
