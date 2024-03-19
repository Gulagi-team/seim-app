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
import {Input, InputField} from '@gluestack-ui/themed';
import ScrollPicker from 'react-native-wheel-scrollview-picker';

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
        {/* <View style={styles.pickerContainer}>
          <Input
            variant="underlined"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputField placeholder="50" keyboardType="numeric" onChangeText={(value) => {
              dispatch(updateWeight(`${selectedWeight} CM`));
              setSelectedWeight(+value);
            }}
            />
          </Input>
        </View> */}
        <View style={styles.pickerContainer1}>
          <ScrollPicker
            dataSource={myArray}
            selectedIndex={1}
            // renderItem={(data, index) => {

            //   console.log('====================================');
            //   console.log('data',data);
            //   console.log('====================================');
            // }}
            onValueChange={(data, selectedIndex) => {
              //
              console.log('data', data);
              dispatch(updateWeight(`${selectedWeight} KG`));
              setSelectedWeight(+data);
            }}
            wrapperHeight={300}
            // wrapperWidth={150}
            // wrapperColor='red'
            itemTextStyle={{fontSize: 40, fontWeight: '700', color: '#ddd'}}
            itemHeight={100}
            highlightColor="black"
            activeItemTextStyle={{
              fontSize: 40,
              fontWeight: '700',
              color: 'black',
            }}
            // highlightBorderWidth={2}
          />
        </View>
        <View style={styles.pickerContainer2}>
          <Text style={styles.textContainer}>KG</Text>
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
  pickerContainer1: {width: '40%', height: 300},
  pickerContainer2: {width: '40%'},
  textContainer: {
    fontSize: 40,
    fontWeight: '700',
    color: 'black',
    fontFamily: 'Inter-Bold',
    marginStart: 10,
  },
  question2: {
    fontSize: 32,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
    color: '#000',
    textAlign: 'left',
  },
});

export default GetInfoStep5Content;
