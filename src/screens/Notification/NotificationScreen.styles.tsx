import {deviceWidth} from '@/constants/layout';
import {
  COLORS,
  FONT_SIZE,
  POPPINS_BOLD,
  POPPINS_LIGHT,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
} from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerView: {
    // flex: 1,
    height: '90%',
    padding: 15,
    // backgroundColor: 'red',
  },
  titleText: {
    fontSize: FONT_SIZE.large2,
    fontWeight: '700',
    color: '#212121',
    // marginTop: 10,
    fontFamily: POPPINS_MEDIUM,
    alignSelf: 'center',
  },
  welcomeBottom: {
    position: 'absolute',
    width: '100%',
    zIndex: -1,
    height: '25%',
    bottom: 0,
  },
});
