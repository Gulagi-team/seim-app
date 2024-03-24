import {StyleSheet} from 'react-native';
import {
  COLORS,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_BOLD,
} from '@/theme/index';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 15,
    flex: 1,
    width: '100%',
  },
  question: {
    width: '100%',
  },
  howOldAre1: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: POPPINS_BOLD,
    color: COLORS.text_A700,
  },
  startBtn: {
    backgroundColor: COLORS.primary_A500,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 16,
    borderRadius: 12,
  },
  startText: {
    color: COLORS.white,
    fontFamily: POPPINS_MEDIUM,
    fontSize: 14,
    fontWeight: '500',
  },
  breakLine: {
    height: 1,
    backgroundColor: COLORS.text_A100,
    marginBottom: 10,
  },
  itemContainer: {
    height: '63%',
    marginTop: 15,
  },
  item: {
    width: '100%',
    height: 60,
    paddingStart: 10,
    paddingEnd: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.text_A50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.text_A200,
  },
  itemImgF: {
    height: 40,
    width: 40,
    borderRadius: 8,
  },
  itemText: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: 5,
    paddingEnd: 5,
  },
  itemTextContent: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: POPPINS_MEDIUM,
    color: COLORS.text_A800,
  },
  itemTextSub: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: POPPINS_REGULAR,
    color: COLORS.text_A400,
  },
  itemCbxIndicator: {
    borderWidth: 1.5,
    borderRadius: 5,
    width: 20,
    height: 20,
  },
});
