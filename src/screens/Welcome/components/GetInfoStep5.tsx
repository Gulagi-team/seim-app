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
import {Picker} from '@react-native-picker/picker';
import {generateArray} from '@/helpers/others';
import {useDispatch} from 'react-redux';
import {StoreState, useAppSelector} from '@/store';
import {updateWeight} from '@/store/userInfo';

const GetInfoStep5Content = () => {
  const dispatch = useDispatch();
  const height = useAppSelector((state: StoreState) => state.userInfo.height);

  const [selectedWeight, setSelectedWeight] = useState(50);
  const [selectedLanguage, setSelectedLanguage] = useState('cm');

  const myArray: number[] = generateArray(40, 120);

  return (
    <View style={styles.container}>
      <View style={styles.question}>
        <Text style={styles.howOldAre1}>What’s your weight?</Text>
        <Text style={styles.letUsKnow1}>
          Let us know more about you, so we can craft a personalized experience
          just for you.
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedWeight}
            onValueChange={(itemValue, itemIndex) => {
              dispatch(updateWeight(`${selectedWeight} ${selectedLanguage}`));
              setSelectedWeight(itemValue);
            }}
            mode="dialog"
            itemStyle={styles.textContainer}>
            {myArray.map(item => (
              <Picker.Item label={item.toString()} value={item} key={item} />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) => {
              dispatch(updateWeight(`${selectedWeight} ${selectedLanguage}`));
              setSelectedLanguage(itemValue);
            }}
            itemStyle={styles.textContainer}>
            <Picker.Item label="kg" value="kg" />
            <Picker.Item label="lbs" value="lbs" />
          </Picker>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerContainer: {width: '40%', height: 200},
  textContainer: {fontSize: 26, fontWeight: '500', fontFamily: 'Inter-Bold'},
  question2: {
    fontSize: 32,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
    color: '#000',
    textAlign: 'left',
  },
});

export default GetInfoStep5Content;
