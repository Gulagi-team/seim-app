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
  bodyContainer: {
    width: '100%',
    height: 390,
    borderRadius: 12,
    borderWidth: 1,
  },
  profileContainer: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 56,
    width: 56,
    // marginTop: 10,
    // marginBottom: 12,
    marginLeft: 10,
    borderRadius: 100,
  },
  nameContainer: {
    width: '100%',
    height: '100%',
    marginLeft: 10,
    // alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: 10,
    // backgroundColor: '#fff',
    flex: 1,
  },
  userName: {
    fontSize: FONT_SIZE.small0,
    fontFamily: POPPINS_MEDIUM,
    fontWeight: '600',
    color: COLORS.black,
  },
  levelContainer: {
    width: deviceWidth - 121,
    // height: '100%',
    // marginTop: 15,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',

    // backgroundColor: '#fff',
  },
  levelText: {
    fontSize: FONT_SIZE.small1,
    fontFamily: POPPINS_MEDIUM,
    fontWeight: '500',
    color: COLORS.text_A500,
  },
  percentText: {
    fontSize: FONT_SIZE.small1,
    fontFamily: POPPINS_MEDIUM,
    fontWeight: '500',
    color: COLORS.black,
  },
  itemContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    paddingLeft: 20,
    borderTopWidth: 1,
    borderColor: COLORS.text_A200,
    alignItems: 'center',
  },
  itemText: {
    fontSize: FONT_SIZE.small1,
    fontFamily: POPPINS_MEDIUM,
    fontWeight: '500',
    color: COLORS.black,
    marginLeft: 10,
  },
  welcomeBottom: {
    position: 'absolute',
    width: '100%',
    zIndex: -1,
    height: '25%',
    bottom: 0,
  },
});
