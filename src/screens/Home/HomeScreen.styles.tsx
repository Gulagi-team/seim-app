import {StyleSheet} from 'react-native';
import {COLORS, POPPINS_MEDIUM} from '@/theme/index';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerView: {
    padding: 15,
  },
  banner: {
    position: 'absolute',
    top: -200,
    left: 0,
    right: 0,
    width: '100%',
  },
  welcomeTop: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  welcomeTitle: {
    fontSize: 16,
    color: COLORS.secondary_green1,
    fontWeight: '600',
    fontFamily: POPPINS_MEDIUM,
  },
  currentDate: {
    fontSize: 14,
    color: COLORS.text_A600,
    fontWeight: '500',
    fontFamily: POPPINS_MEDIUM,
  },
  imgF: {
    height: 50,
    width: 50,
    marginBottom: 10,
  },
  ScrollView: {
    marginTop: 23,
    marginHorizontal: 25,
  },
  viewBody: {
    height: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginTop: 15,
  },
  welcomeBottom: {
    position: 'absolute',
    width: '100%',
    zIndex: -1,
    height: '25%',
    bottom: 0,
  },

  modal_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modal_overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  modal_closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  modal_closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  modal_title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modal_message: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  modal_buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  modal_button: {
    paddingHorizontal: 20,
    marginHorizontal: 5,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderBlockColor: '#333',
  },
  modal_quitButton: {
    backgroundColor: '#00a8ea',
  },
  modal_quitButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});

export const rightMenuStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  rightContent: {
    top: 5,
    width: '20%',
  },
  iconSearch: {
    width: 20,
    height: 20,
    padding: 12,
  },
  iconSetting: {
    width: 20,
    height: 20,
    padding: 12,
    marginLeft: 15,
  },
});

export const topicStyles = StyleSheet.create({
  itemContainer: {
    marginRight: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedLine: {
    marginTop: 4,
    width: '100%',
    height: 4,
    backgroundColor: 'black',
    borderRadius: 50,
  },
  itemAdd: {
    height: 50,
    width: 50,
    marginRight: 15,
    backgroundColor: '#FAFAFA',
    borderRadius: 5,
    borderColor: COLORS.text_A200,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
