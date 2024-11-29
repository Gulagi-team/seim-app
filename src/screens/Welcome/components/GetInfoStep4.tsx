import React, {useState} from 'react';

import {generateArray} from '@/helpers/others';
import {StoreState, useAppSelector} from '@/store';
import {updateHeight} from '@/store/userInfo';
import {POPPINS_BOLD, POPPINS_MEDIUM} from '@/theme';
import {StyleSheet, Text, View} from 'react-native';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

const GetInfoStep4Content = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation(['welcome']);
  const height = useAppSelector((state: StoreState) => state.userInfo.height);

  const [selectedHeight, setSelectedHeight] = useState(150);
  const [selectedLanguage, setSelectedLanguage] = useState('cm');

  const myArray: number[] = generateArray(100, 210);

  return (
    <View style={styles.container}>
      <View style={styles.question}>
        <Text style={styles.howOldAre1}>{t('titleStep4')}</Text>
        <Text style={styles.letUsKnow1}>{t('descStep4')}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.pickerContainer1}>
          <ScrollPicker
            dataSource={myArray}
            selectedIndex={1}
            onValueChange={(data, selectedIndex) => {
              dispatch(updateHeight(selectedHeight));
              setSelectedHeight(+data);
            }}
            wrapperHeight={300}
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
          <Text style={styles.textContainer}>CM</Text>
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
    display: 'flex',
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
    fontFamily: POPPINS_BOLD,
    marginStart: 10,
  },
  question2: {
    fontSize: 32,
    fontWeight: '700',
    fontFamily: POPPINS_BOLD,
    color: '#000',
    textAlign: 'left',
  },
});

export default GetInfoStep4Content;
