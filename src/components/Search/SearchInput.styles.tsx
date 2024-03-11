import {StyleSheet, Platform} from 'react-native';
import {COLORS, SPACING} from '@/theme/index';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.small,
    paddingVertical: Platform.OS === 'android' ? 0 : SPACING.small,
    width: '100%',
    backgroundColor: COLORS.gray_light,
    borderRadius: 10,
  },
  horizontal: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  input: {
    marginStart: 10,
    fontSize: 14,
  },
  icon: {
    fontSize: 25,
    top: 2,
  },
});
