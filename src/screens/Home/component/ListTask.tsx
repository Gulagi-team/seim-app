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
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
import {updateTaskStatus} from '@/store/habits/index';
import IconSleep from '@/assets/icons/sleep.svg';
import {styles, dayStyles} from './ListTask.styles';
import {
  CheckIcon,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
} from '@gluestack-ui/themed';
import {Habit} from '@/types/colection';

export interface Props {
  habitSelected: Habit;
}
const ListTaskContent = ({habitSelected}: Props) => {
  const dispatch = useDispatch();

  const listDay = [];
  for (let i = 1; i <= habitSelected.habit.days; i++) {
    listDay.push(i);
  }

  const renderDayItem = (item: number) => {
    return (
      <View key={item} style={dayStyles.failedDayContainer}>
        <Text style={dayStyles.failedDayText}>{item}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.question}>
        <Text style={styles.howOldAre1}>{habitSelected.habit.name}</Text>
        <ScrollView horizontal={true}>{listDay.map(renderDayItem)}</ScrollView>
        <ScrollView style={{height: '70%'}}>
          {habitSelected.habit.tasks.map((task, index) => (
            <TouchableOpacity
              accessible={true}
              onPress={() =>
                dispatch(
                  updateTaskStatus({
                    task_id: task.id,
                    habit_id: habitSelected.habit.id,
                  }),
                )
              }
              style={styles.item}
              key={index}>
              {task.icon && (
                <FastImage
                  style={styles.itemImgF}
                  source={{
                    uri: task.icon,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              )}
              {!task.icon && <IconSleep />}
              <View style={styles.itemText}>
                <Text style={styles.itemTextContent} numberOfLines={1}>
                  {task.name}
                </Text>
                <Text style={styles.itemTextSub}>{task.description}</Text>
              </View>
              <Checkbox
                aria-label={task.name}
                size="lg"
                value="12"
                isChecked={task.isFinished}>
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
