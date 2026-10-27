import React, {memo, useCallback} from 'react';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {updateTaskStatus} from '@/store/habits/index';
import {getTaskIcon} from '@/helpers/taskIcon';
import {styles} from './Task.styles';
import TaskCheckbox from '@/components/TaskCheckbox';
import Enter from '@/components/motion/Enter';
import PressableScale from '@/components/motion/PressableScale';
import {Task} from '@/types/colection';

interface Props {
  task: Task;
  habitId: string;
  index?: number;
}
const TaskContent = ({task, habitId, index = 0}: Props) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const TaskIcon = getTaskIcon(task.name);

  // Stable across renders so a tap only re-renders this row, not the list.
  const handlePress = useCallback(() => {
    dispatch(
      updateTaskStatus({
        task_id: task.id,
        habit_id: habitId,
      }),
    );
  }, [dispatch, task.id, habitId]);

  return (
    // Rows arrive one after the other the first time the day is opened, and
    // shrink under the finger while they are being tapped.
    <Enter delay={Math.min(index, 8) * 45} distance={10} scaleFrom={0.97}>
      <PressableScale
        accessible={true}
        accessibilityRole="checkbox"
        accessibilityState={{checked: task.isFinished}}
        onPress={handlePress}
        scaleTo={0.96}
        style={styles.item}>
        {/* The remote task icons live on the dead Firebase bucket, so the
            bundled vector keyed by the task name is the only source. */}
        <TaskIcon />
        <View style={styles.itemText}>
          <Text
            style={[
              styles.itemTextContent,
              task.isFinished && styles.itemTextContentDone,
            ]}
            numberOfLines={1}>
            {task.name}
          </Text>
          <Text style={styles.itemTextSub}>{task.description}</Text>
        </View>
        <TaskCheckbox isChecked={task.isFinished} />
      </PressableScale>
    </Enter>
  );
};

// Row height is fixed (60 + 10 margin), so the list can skip measuring rows.
export const TASK_ROW_HEIGHT = 70;

export default memo(TaskContent);
