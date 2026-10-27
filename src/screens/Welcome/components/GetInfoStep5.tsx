import {useCallback} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {StoreState, useAppSelector} from '@/store';
import {updateWeight} from '@/store/userInfo';
import {POPPINS_BOLD, POPPINS_MEDIUM} from '@/theme';
import Enter from '@/components/motion/Enter';
import ValuePicker from './ValuePicker';

const WEIGHT_PRESETS = [
  40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
];

const GetInfoStep5Content = () => {
  const dispatch = useDispatch();
  const weight = useAppSelector((state: StoreState) => state.userInfo.weight);

  const handleChange = useCallback(
    (value: number) => {
      dispatch(updateWeight(value));
    },
    [dispatch],
  );

  return (
    <View style={styles.container}>
      <Enter delay={0} distance={14}>
        <View style={styles.question}>
          <Text style={styles.howOldAre1}>What's your weight?</Text>
          <Text style={styles.letUsKnow1}>
            Let us know more about you, so we can craft a personalized experience
            just for you.
          </Text>
        </View>
      </Enter>

      <Enter delay={120} distance={18}>
        <ValuePicker
          presets={WEIGHT_PRESETS}
          unit="KG"
          placeholder="60"
          value={weight}
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

export default GetInfoStep5Content;