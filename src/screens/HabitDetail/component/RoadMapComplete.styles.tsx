import {StyleSheet} from 'react-native';
import {COLORS, POPPINS_MEDIUM} from '@/theme/index';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 15,
    flex: 1,
    width: '100%',
  },
  scrollView: {
    width: '100%',
  },
  roadContainer: {
    marginBottom: 20,
  },
  roadAlignRight: {
    position: 'absolute',
    top: '50%',
    right: 0,
    // width: '100%',
    backgroundColor: COLORS.primary_A50,
    borderWidth: 5,
    borderColor: COLORS.primary_A50,
    marginStart: 20,
    marginEnd: 20,
  },
  roadAlignLeft: {
    position: 'absolute',
    top: '50%',
    left: 0,
    // width: '100%',
    backgroundColor: COLORS.primary_A50,
    borderWidth: 5,
    borderColor: COLORS.primary_A50,
    marginStart: 20,
    marginEnd: 20,
  },
  roadRightImg: {
    position: 'absolute',
    top: '55%',
    right: -30,
    width: 134,
    height: 92,
  },
  roadLeftImg: {
    position: 'absolute',
    top: '55%',
    left: -30,
    width: 134,
    height: 92,
  },
  listDayLeft: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  listDayRight: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  dayContainerLeft: {
    width: 60,
    height: 60,
    position: 'relative',
    marginRight: '9.2%',
  },
  dayContainerRight: {
    width: 60,
    height: 60,
    position: 'relative',
    marginLeft: '9.2%',
  },
  dayContainerLast: {
    width: 60,
    height: 60,
    position: 'relative',
  },
  itemImg: {
    width: 60,
    height: 60,
  },
  dayText: {
    position: 'absolute',
    top: '35%',
    left: '40%',
    color: COLORS.white,
    fontSize: 14,
    fontFamily: POPPINS_MEDIUM,
    fontWeight: '500',
    lineHeight: 21,
  },
  // The play icon already fills today's circle, so the day number sits on a
  // small badge instead of disappearing into the white artwork. The badge stays
  // inside the 60x60 box because the animated wrapper clips what hangs out.
  todayBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    minWidth: 19,
    height: 19,
    borderRadius: 10,
    paddingHorizontal: 4,
    backgroundColor: COLORS.secondary_green1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayBadgeText: {
    color: COLORS.white,
    fontSize: 11,
    fontFamily: POPPINS_MEDIUM,
    fontWeight: '700',
  },
});
