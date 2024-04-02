import {StyleSheet} from 'react-native';
import {
  COLORS,
  POPPINS_MEDIUM,
  POPPINS_REGULAR,
  POPPINS_BOLD,
} from '@/theme/index';

export const styles = StyleSheet.create({
  pointContainer: {
    width: '100%',
    height: 66,
    flexDirection: 'row',
    flex: 1,
  },
  rectangleLineargradient: {
    height: 66,
    width: 56,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    fontFamily: POPPINS_REGULAR,
    marginTop: 5,
  },
  pointInfoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    height: 66,
    backgroundColor: '#FAFAFA',
    marginLeft: 10,
    flexDirection: 'row',
    elevation: 5,
    shadowColor: '#000',
    borderRadius: 8,
    borderColor: '#E5E5E5',
    alignItems: 'center',
  },
  pointInfoLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagePoint: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  pointText: {
    marginLeft: 10,
  },
  totalPointText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text_A800,
    fontFamily: POPPINS_MEDIUM,
  },
  addPointText: {
    fontSize: 12,
    fontFamily: POPPINS_MEDIUM,
    fontWeight: '500',
    color: COLORS.secondary_green1,
  },
});
