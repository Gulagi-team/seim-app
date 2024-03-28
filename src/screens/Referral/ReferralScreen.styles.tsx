import {deviceWidth} from '@/constants/layout';
import {
  COLORS,
  FONT_SIZE,
  POPPINS_BOLD,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
} from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerView: {
    height: '90%',
    paddingHorizontal: 15,
  },
  bannerContainer: {
    width: '100%',
    height: 66,
    borderRadius: 12,
    justifyContent: 'center',
  },
  bannerText: {
    fontFamily: POPPINS_MEDIUM,
    fontSize: FONT_SIZE.small1,
    fontWeight: '400',
    color: COLORS.white,
  },
  seimText: {
    fontFamily: POPPINS_BOLD,
    fontSize: FONT_SIZE.small1,
    fontWeight: '600',
    color: COLORS.white,
    marginLeft: 5,
  },
  imageBackgroundGift: {
    width: '40%',
    height: 50,
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  imageBackgroundFirework: {
    width: '15%',
    height: 50,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  bodyContainer: {
    width: '100%',
    height: '40%',
    marginTop: 10,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderColor: COLORS.text_A200,
    borderWidth: 1,
    padding: 10,
    // justifyContent: 'center',
  },
  titleText: {
    fontFamily: POPPINS_MEDIUM,
    fontSize: FONT_SIZE.tiny0,
    fontWeight: '500',
    color: COLORS.text_A600,
  },
  referralCodeContainer: {
    width: '100%',
    height: 48,
    padding: 10,
    backgroundColor: COLORS.text_A100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
  },
});
