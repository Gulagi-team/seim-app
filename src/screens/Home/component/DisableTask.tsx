import React from 'react';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import IconSleep from '@/assets/icons/sleep.svg';
import {styles} from './DisableTask.styles';
import {
  CheckIcon,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
} from '@gluestack-ui/themed';
import {Task} from '@/types/colection';

interface Props {
  task: Task;
}
const DisableTaskContent = ({task}: Props) => {
  return (
    <View style={styles.item}>
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
