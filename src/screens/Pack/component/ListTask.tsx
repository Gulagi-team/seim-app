import {LessionSelectedType} from '@/types/colection';
import React, {useState} from 'react';

import {
  Text,
  View,
  Button,
  TextInput,
  Pressable,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import IconCheck from '@/assets/icons/icon_checkmark.svg';
import {updateTaskStatus} from '@/store/lessions';

export interface props {
  lessionSelected: LessionSelectedType;
}
const ListTaskContent = ({lessionSelected}: props) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.question}>
        <Text style={styles.howOldAre1}>{lessionSelected.lession_title}</Text>
        {lessionSelected.items.map((item, index) => (
          <TouchableOpacity
            onPress={() =>
              dispatch(
                updateTaskStatus({
                  lession_key: lessionSelected.lession_key,
                  index: index,
                }),
              )
            }
            style={{
              width: '80%',
              height: 60,
              backgroundColor: '#F7F7F7',
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 5,
            }}
            key={item.item_trans_title}>
            <Text
              style={{
                width: '80%',
                marginLeft: 10,
                fontSize: 12,
                fontWeight: '500',
                fontFamily: 'Montserrat-Medium',
                color: '#000',
              }}>
              {item.item_trans_title}
            </Text>
            <View
              style={{
                borderColor: 'black',
                borderWidth: 1,
                width: 25,
                height: 25,
                borderRadius: 100,
                marginRight: 20,
                // marginVertical: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {item.isDone && <IconCheck />}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 16,
    // marginTop: 24,
    flex: 1,
  },
  question: {
    width: '100%',
    paddingBottom: 16,
  },
  howOldAre1: {
    marginLeft: 14,
    marginBottom: 20,
    fontSize: 16,
    letterSpacing: 0,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
    color: '#B00404',
    textAlign: 'left',
  },
});

export default ListTaskContent;
