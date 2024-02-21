import {LessionType} from '@/types/colection';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import IconCheck from '@/assets/icons/icon_checkmark.svg';

interface Props {
  lession: LessionType;
  key: string;
  onSelect?: () => void;
  isSelect: boolean;
}

const LessionItem = (props: Props) => {
  const {lession, onSelect, isSelect} = props;
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={{
        ...styles.container,
      }}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <FastImage
          style={{
            height: 60,
            width: 60,
            marginTop: 13,
            marginBottom: 12,
            marginLeft: 10,
          }}
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/seim-gulagi.appspot.com/o/lesssions%2F20210528144843-2021-05-28su_lession144842.png?alt=media&token=24b73dcb-271b-4d0b-ab7a-5cdd5970dd0f',
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={{marginTop: 12, marginLeft: 12}}>
          <Text style={styles.titleText}>{lession.lession_title}</Text>
          <View style={{marginTop: 13, flexDirection: 'row'}}>
            {/* <FastImage
              style={{width: 25, height: 25, marginRight: 5}}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/seim-gulagi.appspot.com/o/lesssions%2F20210528144824-2021-05-28su_lession144823.png?alt=media&token=2a298870-f62b-43b4-a4c7-3ff7e4a652ee',
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <FastImage
              style={{width: 25, height: 25, marginRight: 5}}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/seim-gulagi.appspot.com/o/lesssions%2F20210606131148-2021-06-06su_lession131146.png?alt=media&token=b77660a7-8cb1-480a-b4a3-e899e9361ac3',
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <FastImage
              style={{width: 25, height: 25, marginRight: 5}}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/seim-gulagi.appspot.com/o/lesssions%2F20210528144804-2021-05-28su_lession144803.png?alt=media&token=5bef52d4-a505-434b-ba15-e9ab0f79d14f',
              }}
              resizeMode={FastImage.resizeMode.contain}
            /> */}
          </View>
        </View>
      </View>

      <View
        style={{
          borderColor: 'black',
          borderWidth: 1,
          width: 25,
          height: 25,
          borderRadius: 5,
          marginRight: 20,
          marginVertical: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {isSelect && <IconCheck />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 85,
    flex: 1,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  textContainer: {width: '100%'},
  titleText: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'Montserrat-Medium',
    color: '#000',
    textAlign: 'left',
  },
});
export default LessionItem;
