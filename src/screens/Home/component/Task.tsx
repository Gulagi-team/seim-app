import IconSleep from '@/assets/icons/sleep.svg';
import {iconMap} from '@/helpers/icon';
import {completeTask} from '@/store/habits/action';
import {updateTaskStatus} from '@/store/habits/index';
import {Task} from '@/types/colection';
import {
  CheckIcon,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
} from '@gluestack-ui/themed';
import {ThunkDispatch} from '@reduxjs/toolkit';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './Task.styles';

interface Props {
  task: Task;
  habitId: string;
}
const TaskContent = ({task, habitId}: Props) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const ICON = iconMap[task.icon as keyof typeof iconMap];

  return (
    <TouchableOpacity
      accessible={true}
      onPress={() => {
        dispatch(
          updateTaskStatus({
            task_id: task.id,
            habit_id: habitId,
          }),
        );

        const isFinish: boolean = !task.isFinished;
        dispatch(
          completeTask({
            taskId: task.id,
            userHabitId: habitId,
            isFinish,
          }),
        );
      }}
      style={styles.item}>
      {task.icon && (
        // <FastImage
        //   style={styles.itemImgF}
        //   source={{
        //     uri: task.icon,
        //   }}
        //   resizeMode={FastImage.resizeMode.contain}
        // />
        <>{typeof ICON === 'function' ? <ICON /> : ICON}</>
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
  );
};
export default TaskContent;
