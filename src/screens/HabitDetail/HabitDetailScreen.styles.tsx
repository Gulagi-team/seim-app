import {StyleSheet} from 'react-native';
import {COLORS, POPPINS_MEDIUM, POPPINS_REGULAR, POPPINS_BOLD} from '@/theme/index';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  habitContainer: {
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.text_A200,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  itemImg: {
    borderRadius: 5,
    width: 60,
    height: 60,
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
    lineHeight: 21,
    color: COLORS.text_A900,
  },
  secondTitle: {
    fontFamily: POPPINS_REGULAR,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    color: COLORS.text_A500,
  },
  statIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    fontFamily: POPPINS_MEDIUM,
    fontWeight: '500',
    lineHeight: 18,
    marginStart: 5,
  },
  totalDayContainer: {
    backgroundColor: COLORS.primary_A50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    height: 51,
  },
  totalDay: {
    marginLeft: 10,
    fontFamily: POPPINS_BOLD,
    fontWeight: '600',
    fontSize: 18,
    color: COLORS.text_A900,
  },
  scrollView: {
    marginTop: 10,
    width: '100%',
    height: '100%',
  },
});
