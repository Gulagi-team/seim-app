import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningText: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'Montserrat-Medium',
    color: '#757575',
  },
  continueButton: {
    marginTop: 40,
    width: 200,
    height: 50,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#1B9CFC',
    borderRadius: 12,
    // padding: 10,

    // elevation: 5,
    // shadowColor: '#000',
  },
  continueText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Montserrat-Medium',
    color: '#fff',
    marginLeft: 20,
  },
  welcomeBottom: {
    position: 'absolute',
    width: '100%',
    // flex:1,
    // padding:-15,
    zIndex: -1,
    height: '25%',
    bottom: 0,
  },
});
