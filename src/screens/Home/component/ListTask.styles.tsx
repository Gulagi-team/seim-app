import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      // paddingHorizontal: 16,
      // marginTop: 24,
      padding: 15,
      flex: 1,
      width: '100%',
      // backgroundColor: 'blue',
  
    },
    question: {
      width: '100%',
      paddingBottom: 16,
      // backgroundColor: 'red',
    },
    item: {
      width: '100%',
      height: 60,
      backgroundColor: '#F7F7F7',
      marginBottom: 10,
      paddingStart:10,
      flexDirection: 'row',
      justifyContent:'space-between',
      alignItems: 'center',
      borderRadius: 10,
  
    },
    ItemText: {
      fontSize: 14,
      fontWeight: '500',
      fontFamily: 'Montserrat-Medium',
      color: '#000',
    },
    howOldAre1: {
      // marginLeft: 14,
      marginBottom: 15,
      fontSize: 16,
      letterSpacing: 0,
      fontWeight: '700',
      fontFamily: 'Inter-Bold',
      color: 'black',
      // textAlign: 'left',
    },
  });
  