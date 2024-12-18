import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  imageLogo: {height: 150, width: 150},
  welcomeBottom: {
    position: 'absolute',
    width: '100%',
    height: '30%',
    bottom: 0,
  },
  containerView: {
    height: '90%',
    padding: 15,
  },
  message: {
    fontSize: 14,
    fontWeight: '600',
    color: '#171717',
    marginVertical: 20,

    textAlign: 'center',
  },
  button: {
    width: 200,
    height: 50,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 40,
    elevation: 5,
    shadowColor: '#000',
  },

  quitButton: {
    backgroundColor: '#1B9CFC',
  },
  quitButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});
