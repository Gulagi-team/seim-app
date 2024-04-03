import {POPPINS_MEDIUM} from '@/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  itemContainer: {
    // borderColor: '#404040',
    borderWidth: 1,
    height: 48,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 0,
    width: '100%',
    borderStyle: 'solid',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    letterSpacing: 0,
    fontWeight: '600',
    fontFamily: POPPINS_MEDIUM,
    textAlign: 'center',
    marginLeft: 8,
  },
  checkBox: {
    height: 24,
    width: 24,
    top: '0%',
    right: '0%',
    bottom: '0%',
    left: '0%',
    borderWidth: 1.5,
    // position: 'absolute',
    borderStyle: 'solid',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkDot: {
    height: '66.67%',
    width: '66.67%',
    borderRadius: 12,
  },
  welcomeBottom: {
    position: 'absolute',
    width: '100%',
    zIndex: -1,
    height: '25%',
    bottom: 0,
  },
});
