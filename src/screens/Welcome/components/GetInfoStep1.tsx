import {StoreState, useAppSelector} from '@/store';
import {updateLanguage} from '@/store/userInfo';
import {LanguageType} from '@/types/colection';
import {POPPINS_BOLD, POPPINS_MEDIUM} from '@/theme';

import {Text, View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import Enter from '@/components/motion/Enter';
import OptionRow from './OptionRow';

const LANGUAGES: {label: string; value: LanguageType}[] = [
  {label: 'English', value: 'en'},
  {label: 'Tiếng Việt', value: 'vi'},
  {label: 'Korea', value: 'kr'},
  {label: 'Chinese', value: 'cn'},
];

const GetInfoStep1Content = () => {
  const dispatch = useDispatch();
  const language = useAppSelector(
    (state: StoreState) => state.userInfo.language,
  );

  return (
    <View style={styles.container}>
      <Enter delay={0} distance={14}>
        <View style={styles.question}>
          <Text style={styles.howOldAre1}>What's your language?</Text>
          <Text style={styles.letUsKnow1}>
            Let us know more about you, so we can craft a personalized experience
            just for you.
          </Text>
        </View>
      </Enter>

      <View style={styles.content}>
        {LANGUAGES.map((item, index) => (
          <OptionRow
            key={item.value}
            index={index}
            label={item.label}
            selected={language === item.value}
            onPress={() => dispatch(updateLanguage(item.value))}
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

export default GetInfoStep1Content;