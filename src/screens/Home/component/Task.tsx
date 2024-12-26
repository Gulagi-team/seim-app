import IconSleep from '@/assets/icons/sleep.svg';
import {iconMap} from '@/helpers/icon';
import {updateTaskStatus} from '@/store/habits/index';
import {HabitData, Task} from '@/types/colection';
import {
  CheckIcon,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
} from '@gluestack-ui/themed';
import {ThunkDispatch} from '@reduxjs/toolkit';
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './Task.styles';
import POINT_SEIM from '@/assets/images/point_seim.png';

import {completeTask} from '@/store/habits/action';

interface Props {
  task: Task;
  habit: HabitData;
}
const TaskContent = ({task, habit}: Props) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const ICON = iconMap[task.icon as keyof typeof iconMap];
  const [isChecked, setIsChecked] = useState(task.isFinished ?? false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    dispatch(
      completeTask({
        task_id: task.id,
        habit,
        isFinished: !isChecked,
      }),
    );
  };
  return (
    <TouchableOpacity
      onPress={handleCheckboxChange}
      accessible={true}
      style={styles.item}>
      {task.icon && <>{typeof ICON === 'function' ? <ICON /> : ICON}</>}
      {!task.icon && <IconSleep />}
      <View style={styles.itemText}>
        <Text style={styles.itemTextContent} numberOfLines={1}>
          {task.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={styles.itemTextSub}>
            + {Number(task.point).toFixed(1)}
          </Text>
          <Image
            source={POINT_SEIM}
            style={styles.imagePoint}
            resizeMode={'contain'}
          />
        </View>
      </View>
      <Checkbox
        aria-label={task.name}
        size="lg"
        value="12"
        onChange={handleCheckboxChange}
        isChecked={isChecked}>
        <CheckboxIndicator style={styles.itemCbxIndicator} mr="$2">
          <CheckboxIcon as={CheckIcon} />
        </CheckboxIndicator>
      </Checkbox>
    </TouchableOpacity>
  );
};
export default TaskContent;
