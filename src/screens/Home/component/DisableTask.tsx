import IconSleep from '@/assets/icons/sleep.svg';
import {iconMap} from '@/helpers/icon';
import {Task} from '@/types/colection';
import {
  CheckIcon,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
} from '@gluestack-ui/themed';
import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './DisableTask.styles';

interface Props {
  task: Task;
}
const DisableTaskContent = ({task}: Props) => {
  const ICON = iconMap[task.icon as keyof typeof iconMap];
  return (
    <View style={styles.item}>
      <View style={styles.iconContainer}>
        {task.icon && <>{typeof ICON === 'function' ? <ICON /> : ICON}</>}
        <View style={styles.overlay} />
      </View>
      <View style={styles.itemText}>
        <Text style={styles.itemTextContent} numberOfLines={1}>
          {task.name}
        </Text>
        <Text style={styles.itemTextSub}>{task.description}</Text>
      </View>
      <Checkbox
        disabled={true}
        aria-label={task.name}
        size="lg"
        value="12"
        isChecked={false}>
        <CheckboxIndicator style={styles.itemCbxIndicator} mr="$2">
          <CheckboxIcon as={CheckIcon} />
        </CheckboxIndicator>
      </Checkbox>
    </View>
  );
};
export default DisableTaskContent;
