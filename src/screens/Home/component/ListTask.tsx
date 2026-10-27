import React, {memo, useCallback} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {startHabit} from '@/store/habits/action';
import {navigate} from '@/helpers/navigation';
import SCREENS from '@/constants/screen';
import {styles} from './ListTask.styles';
import ListDate from './ListDate';
import Task, {TASK_ROW_HEIGHT} from './Task';
import DisableTask from './DisableTask';
import Enter from '@/components/motion/Enter';
import PressableScale from '@/components/motion/PressableScale';
import {Habit, Task as TaskItem} from '@/types/colection';
import ThreeDot from '@/assets/icons/icon_three_dots.svg';

interface Props {
  habitSelected: Habit;
}
const ListTaskContent = ({habitSelected}: Props) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const enable: boolean =
    habitSelected.startDate !== null && habitSelected.startDate !== undefined;
  const habitId = habitSelected.habit.id;
  const tasks = habitSelected.habit.tasks;

  const renderItem = useCallback(
    ({item, index}: {item: TaskItem; index: number}) =>
      enable ? (
        <Task task={item} habitId={habitId} index={index} />
      ) : (
        <DisableTask task={item} index={index} />
      ),
    [enable, habitId],
  );

  const keyExtractor = useCallback(
    (item: TaskItem) => item.id,
    [],
  );

  // Fixed row height, so the list never measures a row it is about to show.
  const getItemLayout = useCallback(
    (_data: ArrayLike<TaskItem> | null | undefined, index: number) => ({
      length: TASK_ROW_HEIGHT,
      offset: TASK_ROW_HEIGHT * index,
      index,
    }),
    [],
  );

  return (
    <View style={styles.container}>
      {/* The wrapper has to carry the flex, otherwise the card inside loses the
          height its percentage rows are measured against and the list collapses. */}
      <Enter
        delay={80}
        distance={14}
        scaleFrom={0.98}
        style={styles.motionLayer}>
        <View style={styles.question}>
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={() => navigate(SCREENS.HABIT_DETAIL, habitSelected)}>
            <Text style={styles.howOldAre1}>{habitSelected.habit.name}</Text>
            <ThreeDot />
          </TouchableOpacity>
          {habitSelected.startDate && (
            <>
              <ListDate habitSelected={habitSelected} />
              <View style={styles.breakLine} />
            </>
          )}
          {!habitSelected.startDate && (
            <PressableScale
              style={styles.startBtn}
              scaleTo={0.94}
              onPress={() => {
                dispatch(startHabit(habitSelected.habit.id));
              }}>
              <Text style={styles.startText}>Let's started &gt;</Text>
            </PressableScale>
          )}
          <View
            style={
              !habitSelected.startDate
                ? styles.itemContainerNotStart
                : styles.itemContainerStarted
            }>
            <FlatList
              data={tasks}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              getItemLayout={getItemLayout}
              initialNumToRender={6}
              maxToRenderPerBatch={6}
              windowSize={5}
              removeClippedSubviews={true}
            />
          </View>
        </View>
      </Enter>
    </View>
  );
};
export default memo(ListTaskContent);
