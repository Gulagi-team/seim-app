import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
import {updateTaskStatus} from '@/store/habits/index';
import IconSleep from '@/assets/icons/sleep.svg';
import {styles} from './Task.styles';
import {
  CheckIcon,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
} from '@gluestack-ui/themed';
import {Task} from '@/types/colection';

interface Props {
  task: Task;
  habitId: string;
}
const TaskContent = ({task, habitId}: Props) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      accessible={true}
      onPress={() =>
        dispatch(
          updateTaskStatus({
            task_id: task.id,
            habit_id: habitId,
          }),
        )
      }
      style={styles.item}>
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
  );
};
export default TaskContent;
