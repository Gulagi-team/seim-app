import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    
    // width: '100%',
    flex: 1,
    // backgroundColor: 'red'
  },
  containerView:{
    padding: 15,
    // flex: 1,
    alignItems: 'center',
  },
  carousel: {
  },
  imgF: {
    height: 46,
    width: 46,
    marginBottom: 10,
  },
  ScrollView: {
    paddingTop: 13,
    paddingBottom: 12,
    paddingHorizontal: 15,
  },
  viewBody: {
    width: '100%',
    height: '70%',
    borderRadius: 10,
    marginTop: 14,
    // backgroundColor: '#',
    // borderWidth:1
  },
  // backgroundImg: {
  //   position: 'absolute',
  //   width: '100%',
  //   // flex: 1,
  //   // backgroundColor: 'black',
  //   // height: '30%',
  //   // zIndex: -1,
  //   bottom: 0,
  // },
  welcomeBottom:{
    position: 'absolute',
    width: '100%',
    // flex:1,
    // padding:-15,
    zIndex:-1,
    height: '25%',
    bottom: 0,
  }
});