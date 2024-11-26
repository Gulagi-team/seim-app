import {StoreState, useAppSelector} from '@/store';
import {updateOld} from '@/store/userInfo';
import {COLORS, FONT_SIZE, POPPINS_BOLD, POPPINS_MEDIUM} from '@/theme';
import {useTranslation} from 'react-i18next';

import {
  Text,
  View,
  Button,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useDispatch} from 'react-redux';

const GetInfoStep3Content = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation(['welcome']);

  const old = useAppSelector((state: StoreState) => state.userInfo.old);

  return (
    <TouchableWithoutFeedback
      // style={styles.container}
      onPress={Keyboard.dismiss}
      accessible={false}>
      <View style={styles.container}>
        <Text style={styles.howOldAre1}>{t('titleStep3')}</Text>
        <Text style={styles.letUsKnow1}>{t('descStep3')}</Text>
        <View style={{width: '100%', marginTop: 50, alignItems: 'center'}}>
          <View style={styles.oldContainer}>
            <TextInput
              style={styles.oldInput}
              keyboardType={'numeric'}
              // textContentType={'birthdateYear'}
              onChangeText={value => dispatch(updateOld(+value))}
              placeholder="15"
              placeholderTextColor={COLORS.text_A400}
              numberOfLines={1}
              maxLength={2}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 24,
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
  oldContainer: {
    width: '40%',
    height: 55,

    borderColor: COLORS.text_A200,
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // paddingBottom: 0,
    // backgroundColor: 'red',
  },
  oldInput: {
    fontSize: FONT_SIZE.large2,
    fontWeight: '700',
    fontFamily: POPPINS_BOLD,
    color: COLORS.text_A900,
    // marginLeft: 8,
    // flex: 1,
    paddingBottom: 0,
    width: '50%',
    // backgroundColor: 'red',
    // alignItems: 'center',
    textAlign: 'center',
    // justifyContent: 'center',
  },
  content: {
    width: '100%',
    // height: 100,
    // flex: 1,
    marginTop: 22,
    // flexDirection: "row",
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
    fontFamily: 'Inter-SemiBold',
    // color: "#fff",
    textAlign: 'left',
    // backgroundColor: "red",
  },
});

export default GetInfoStep3Content;
