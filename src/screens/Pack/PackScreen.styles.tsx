import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    flex: 1,
    marginTop: 14,
    paddingTop: 7,
    paddingHorizontal: 16,
  },
  textContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
  },
  chooseText: {
    fontSize: 20,
    fontWeight: '700',
    height: 30,
    fontFamily: 'Montserrat-Bold',
    color: '#000',
    textAlign: 'left',
  },
  finishContainer: {
    paddingVertical: 5,
    paddingLeft: 18,
    paddingRight: 9,
    backgroundColor: '#1873D3',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  finishText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Montserrat-Medium',
    color: '#fff',
    textAlign: 'left',
  },
  contentContainer: {
    width: '100%',
    marginTop: 21,
  },
});
