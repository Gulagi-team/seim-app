import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {getTaskIcon} from '@/helpers/taskIcon';
import {styles} from './DisableTask.styles';
import TaskCheckbox from '@/components/TaskCheckbox';
import Enter from '@/components/motion/Enter';
import {Task} from '@/types/colection';

interface Props {
  task: Task;
  index?: number;
}
const DisableTaskContent = ({task, index = 0}: Props) => {
  const TaskIcon = getTaskIcon(task.name);
  return (
    <Enter delay={Math.min(index, 8) * 45} distance={10} scaleFrom={0.97}>
      <View style={styles.item}>
      {/* The remote task icons live on the dead Firebase bucket, so the
          bundled vector keyed by the task name is the only source. */}
      <TaskIcon />
      <View style={styles.itemText}>
        <Text style={styles.itemTextContent} numberOfLines={1}>
          {task.name}
        </Text>
        <Text style={styles.itemTextSub}>{task.description}</Text>
      </View>
        <TaskCheckbox isChecked={false} />
      </View>
    </Enter>
  );
};
export default memo(DisableTaskContent);
