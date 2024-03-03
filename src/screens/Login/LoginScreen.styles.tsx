import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 150,
    alignItems: 'center',
  },
  googleButton: {
    marginTop: 40,
    width: 220,
    height: 50,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,

    elevation: 5,
    shadowColor: '#000',
  },
  loginText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Montserrat-Medium',
    color: '#757575',
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
