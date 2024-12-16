import {COLORS, FONT_SIZE, POPPINS_BOLD} from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    fontFamily: POPPINS_BOLD,
    flex: 1,
  },
  scrollView: {
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
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagePoint: {
    width: 20,
    height: 20,
  },
  pointText: {
    fontSize: FONT_SIZE.medium0,
    fontWeight: '700',
    marginLeft: 5,
  },
  timeText: {
    fontSize: FONT_SIZE.tiny0,
    fontWeight: '500',
    marginTop: 3,
    marginLeft: 5,

    color: '#525252',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
