import React, {useMemo} from 'react';
import {View} from 'react-native';
import {getHabitIcon} from '@/helpers/habitIcon';

interface Props {
  name?: string | null;
  style?: any;
}

// The legacy Firebase bucket (seim-gulagi) is shut down and answers 402, so the
// remote habit/topic icons could never load. The cover is now drawn from the
// bundled vectors, chosen by the habit name, with no image request at all.
const HabitImage = ({name, style}: Props) => {
  const {Icon, background, scale} = useMemo(() => getHabitIcon(name), [name]);

  return (
    <View
      style={[
        style,
        {backgroundColor: background, alignItems: 'center', justifyContent: 'center'},
      ]}>
      <Icon width={`${scale * 100}%`} height={`${scale * 100}%`} />
    </View>
  );
};

export default HabitImage;
