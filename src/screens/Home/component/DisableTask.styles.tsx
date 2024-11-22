import {COLORS, POPPINS_MEDIUM, POPPINS_REGULAR} from '@/theme/index';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  item: {
    position: 'relative',
    width: '100%',
    height: 60,
    paddingStart: 10,
    paddingEnd: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fdfdfd',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.text_A200,
  },
  iconContainer: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(207, 207, 207, 0.5)', // Semi-transparent overlay
    borderRadius: 8,
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
    color: '#cccbcb',
  },
  itemTextSub: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: POPPINS_REGULAR,
    color: '#e8e8e8',
  },
  itemCbxIndicator: {
    borderWidth: 1.5,
    borderRadius: 5,
    width: 20,
    height: 20,
    borderColor: COLORS.text_A200,
  },
});
