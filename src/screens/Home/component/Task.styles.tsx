import {StyleSheet} from 'react-native';
import {
  COLORS,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_BOLD,
} from '@/theme/index';

export const styles = StyleSheet.create({
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
  itemTextContentDone: {
    color: COLORS.text_A300,
    textDecorationLine: 'line-through',
  },
  itemTextSub: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: POPPINS_REGULAR,
    color: COLORS.text_A400,
  },
});
