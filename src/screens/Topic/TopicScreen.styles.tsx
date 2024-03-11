import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  viewBody: {
    width: '90%',
    height: '76%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
  },
  textTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    fontWeight: '600',
    color: '#171717',
    marginTop: 15,
  },
  ScrollView: {
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
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  itemImg: {
    borderRadius: 5,
    width: 80,
    height: 61,
  },
  itemTitle: {
    flex: 1,
    // width: '80%',
    marginStart: 10,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    fontWeight: '500',
    color: '#171717',
  },
  secondTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    fontWeight: '400',
    color: '#737373',
  },
  thridTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    fontWeight: '500',
    color: '#404040',
  },
  welcomeBottom: {
    position: 'absolute',
    width: '100%',
    zIndex: -1,
    height: '25%',
    bottom: 0,
  },
});
