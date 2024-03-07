import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 150,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  wellcomeText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Montserrat-Medium',
    color: '#000',
    marginTop: 10,
  },
  createButton: {
    marginTop: 40,
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
    color: '#404040',
    marginLeft: 20,
  },
  importButton: {
    marginTop: 20,
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
