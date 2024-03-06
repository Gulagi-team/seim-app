import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerView: {
    padding: 15,
    // flex: 1,
    alignItems: 'center',
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
    width: '90%',
    height: '76%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginTop: 10,
  },
  welcomeBottom: {
    position: 'absolute',
    width: '100%',
    zIndex: -1,
    height: '25%',
    bottom: 0,
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
    marginRight: 25,
  },
  selectedLine: {
    width: '100%',
    height: 4,
    backgroundColor: 'black',
    borderRadius: 50,
  },
  itemAdd: {
    height: 50,
    width: 50,
    backgroundColor: '#E6E6E6',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
