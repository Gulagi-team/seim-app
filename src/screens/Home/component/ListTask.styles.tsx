import {StyleSheet} from 'react-native';

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
  item: {
    width: '100%',
    height: 60,
    backgroundColor: '#F7F7F7',
    marginBottom: 10,
    paddingStart: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  ItemText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Montserrat-Medium',
    color: '#000',
  },
  howOldAre1: {
    // marginLeft: 14,
    marginBottom: 15,
    fontSize: 16,
    letterSpacing: 0,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
    color: 'black',
    // textAlign: 'left',
  },

  itemDayContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'red',
    marginEnd: 12,
  },
  itemDayText: {
    color: 'red',
    fontSize: 16,
  },
  itemDoneDayContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'red',
    marginEnd: 12,
  },
  itemDoneDayText: {
    color: '#FFFFFF',
    fontSize: 16,
  },

});
