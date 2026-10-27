import {useCallback, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {StoreState, useAppSelector} from '@/store';
import {updateHeight} from '@/store/userInfo';
import {generateArray} from '@/helpers/others';
import {POPPINS_BOLD, POPPINS_MEDIUM} from '@/theme';
import Enter from '@/components/motion/Enter';
import ValuePicker from './ValuePicker';

const HEIGHT_PRESETS = [
  140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200,
];

const GetInfoStep4Content = () => {
  const dispatch = useDispatch();
  const height = useAppSelector((state: StoreState) => state.userInfo.height);

  const handleChange = useCallback(
    (value: number) => {
      dispatch(updateHeight(value));
    },
    [dispatch],
  );

  return (
    <View style={styles.container}>
      <Enter delay={0} distance={14}>
        <View style={styles.question}>
          <Text style={styles.howOldAre1}>What's your height?</Text>
          <Text style={styles.letUsKnow1}>
            Let us know more about you, so we can craft a personalized experience
            just for you.
          </Text>
        </View>
      </Enter>

      <Enter delay={120} distance={18}>
        <ValuePicker
          presets={HEIGHT_PRESETS}
          unit="CM"
          placeholder="170"
          value={height}
          onChange={handleChange}
        />
      </Enter>
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
});

export default GetInfoStep4Content;