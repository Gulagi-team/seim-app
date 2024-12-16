import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
  containerView: {
    marginTop: '30%',
    // paddingHorizontal: 15,
    alignItems: 'center',
  },
  googleButton: {
    marginTop: 70,
    width: 250,
    height: 50,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    // padding: 10,

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
