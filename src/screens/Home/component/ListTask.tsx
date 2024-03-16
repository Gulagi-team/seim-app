import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  Pressable,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {updateTaskStatus} from '@/store/lessions';
import {styled} from '@gluestack-style/react';
import IconSleep from '@/assets/icons/sleep.svg';
import {styles, dayStyles} from './ListTask.styles';
import {
  CheckIcon,
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '@gluestack-ui/themed';
import {LessionSelectedType} from '@/types/colection';

export interface props {
  lessionSelected: LessionSelectedType;
}
const ListTaskContent = ({lessionSelected}: props) => {
  const dispatch = useDispatch();

  const listDay = [];
  for (let i = 1; i <= lessionSelected.lession_day_total; i++) {
    listDay.push(i);
  }

  const renderDayItem = (item: any) => {
    return (
      <View key={item} style={dayStyles.failedDayContainer}>
        <Text style={dayStyles.failedDayText}>{item}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.question}>
        <Text style={styles.howOldAre1}>{lessionSelected.lession_title}</Text>
        <ScrollView horizontal={true}>{listDay.map(renderDayItem)}</ScrollView>
        <ScrollView style={{height: '70%'}}>
          {lessionSelected.items.map((item, index) => (
            <TouchableOpacity
              accessible={true}
              onPress={() =>
                dispatch(
                  updateTaskStatus({
                    lession_key: lessionSelected.lession_key,
                    index: index,
                  }),
                )
              }
              style={styles.item}
              key={item.item_trans_title}>
              <IconSleep />
              <View style={styles.itemText}>
                <Text style={styles.itemTextContent} numberOfLines={1}>
                  {item.item_trans_title}
                </Text>
                <Text style={styles.itemTextSub}>6-8 hours</Text>
              </View>
              {/* <View
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  width: 25,
                  height: 25,
                  borderRadius: 100,
                  marginRight: 20,
                  marginVertical: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {item.isDone && <IconCheck  />}
              </View> */}

              <Checkbox
                aria-label={item.item_trans_title}
                size="lg"
                value="12"
                isChecked={item.isDone}>
                <CheckboxIndicator style={styles.itemCbxIndicator} mr="$2">
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
              </Checkbox>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
export default ListTaskContent;
