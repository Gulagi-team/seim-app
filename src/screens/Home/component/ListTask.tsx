import React from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {startHabit} from '@/store/habits/action';
import {styles} from './ListTask.styles';
import ListDate from './ListDate';
import Point from './Point';
import Task from './Task';
import DisableTask from './DisableTask';
import {Habit} from '@/types/colection';

interface Props {
  habitSelected: Habit;
}
const ListTaskContent = ({habitSelected}: Props) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const enable: boolean =
    habitSelected.startDate !== null && habitSelected.startDate !== undefined;

  return (
    <View style={styles.container}>
      <View style={styles.question}>
        <Text style={styles.howOldAre1}>{habitSelected.habit.name}</Text>
        {habitSelected.startDate && (
          <>
            <ListDate habitSelected={habitSelected} />
            <View style={styles.breakLine} />
            <Point />
          </>
        )}
        {!habitSelected.startDate && (
          <TouchableOpacity
            style={styles.startBtn}
            onPress={() => {
              dispatch(startHabit(habitSelected.habit.id));
            }}>
            <Text style={styles.startText}>Let's started &gt;</Text>
          </TouchableOpacity>
        )}
        <View style={styles.itemContainer}>
          <FlatList
            data={habitSelected.habit.tasks}
            renderItem={({item}) => {
              if (enable) {
                return <Task task={item} habitId={habitSelected.habit.id} />;
              } else {
                return <DisableTask task={item} />;
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};
export default ListTaskContent;
