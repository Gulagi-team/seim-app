import {StoreState, useAppSelector} from '@/store';
import {updateGender} from '@/store/userInfo';
import {POPPINS_BOLD, POPPINS_MEDIUM} from '@/theme';

import {Text, View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import Enter from '@/components/motion/Enter';
import OptionRow from './OptionRow';

const GENDERS = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Non-binary', value: 'non-binary'},
  {label: 'Other', value: 'other'},
];

const GetInfoStep2Content = () => {
  const dispatch = useDispatch();
  const gender = useAppSelector((state: StoreState) => state.userInfo.gender);

  return (
    <View style={styles.container}>
      <Enter delay={0} distance={14}>
        <View style={styles.question}>
          <Text style={styles.howOldAre1}>What's your gender?</Text>
          <Text style={styles.letUsKnow1}>
            Let us know more about you, so we can craft a personalized experience
            just for you.
          </Text>
        </View>
      </Enter>

      <View style={styles.content}>
        {GENDERS.map((item, index) => (
          <OptionRow
            key={item.value}
            index={index}
            label={item.label}
            selected={gender === item.value}
            onPress={() => dispatch(updateGender(item.value))}
          />
        ))}
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
});

export default GetInfoStep2Content;