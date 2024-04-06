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
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  scrollviewContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    // backgroundColor: COLORS.white,
    // paddingTop: 10,
  },
  profileContainer: {
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  avatar: {
    height: 56,
    width: 56,
    marginLeft: 10,
    borderRadius: 100,
  },
  nameContainer: {
    width: '100%',
    height: '100%',
    marginLeft: 10,
    justifyContent: 'center',
    flex: 1,
  },
  userName: {
    fontSize: FONT_SIZE.small0,
    fontFamily: POPPINS_BOLD,
    fontWeight: '600',
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
  },
  percentText: {
    fontSize: FONT_SIZE.small1,
    fontFamily: POPPINS_MEDIUM,
    fontWeight: '500',
  },
  activityContainer: {
    marginTop: 10,
    paddingBottom: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  activityTitleContainer: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekdayText: {
    fontSize: FONT_SIZE.tiny0,
    fontFamily: POPPINS_MEDIUM,
    fontWeight: '400',
  },
  infoContainer: {
    width: '100%',
    marginTop: 5,
  },
  infoContainer1: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },

  bmiContainer: {
    width: '48%',
    height: 60,
    // paddingLeft: 10,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
  },
  keyInfoText: {
    // fontSize: 14,
    // fontWeight: '400',
    // color: '#000',
    fontSize: FONT_SIZE.small1,
    fontFamily: POPPINS_REGULAR,
    fontWeight: '400',
  },
  valueInfoText: {
    fontSize: FONT_SIZE.small1,
    fontFamily: POPPINS_BOLD,
    fontWeight: '600',
  },
  recentContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recentText: {
    // marginLeft: 5,
    fontFamily: POPPINS_BOLD,
    fontSize: FONT_SIZE.small1,
    fontWeight: '600',
  },
  seeMoreText: {
    fontFamily: POPPINS_MEDIUM,
    fontSize: FONT_SIZE.small1,
    fontWeight: '500',
    color: COLORS.primary_A500,
  },
});
