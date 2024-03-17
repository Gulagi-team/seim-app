import {StyleSheet} from 'react-native';
import {COLORS, POPPINS_MEDIUM, POPPINS_REGULAR} from '@/theme/index';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  viewBody: {
    width: '90%',
    height: '76%',
    backgroundColor: COLORS.background,
    borderRadius: 20,
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
  },
  textTitle: {
    fontFamily: POPPINS_MEDIUM,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text_A900,
    marginTop: 15,
  },
  ScrollView: {
    marginTop: 20,
    paddingStart: 20,
    paddingEnd: 20,
    width: '100%',
    height: '100%',
  },
  item: {
    height: 85,
    padding: 15,
    marginBottom: 10,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  itemImg: {
    borderRadius: 5,
    width: 80,
    height: 61,
  },
  itemTitle: {
    flex: 1,
    // width: '80%',
    marginStart: 10,
  },
  title: {
    fontFamily: POPPINS_MEDIUM,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text_A900,
  },
  secondTitle: {
    fontFamily: POPPINS_REGULAR,
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.text_A500,
  },
  thridTitle: {
    fontFamily: POPPINS_MEDIUM,
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.text_A700,
  },
  welcomeBottom: {
    position: 'absolute',
    width: '100%',
    zIndex: -1,
    height: '25%',
    bottom: 0,
  },
});
