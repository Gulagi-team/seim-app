import {StyleSheet, Platform} from 'react-native';
import {COLORS, SPACING} from '@/theme/index';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.small,
    paddingVertical: Platform.OS === 'android' ? 0 : SPACING.small,
    width: '100%',
    backgroundColor: COLORS.text_A50,
    borderRadius: 10,
  },
  horizontal: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    marginStart: 10,
    fontSize: 14,
    color: COLORS.text_A700,
  },
  icon: {
    fontSize: 25,
    top: 2,
  },
});
