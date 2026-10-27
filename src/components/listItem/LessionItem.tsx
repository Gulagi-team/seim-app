import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LessionType} from '@/types/colection';
import PackIconFire from '@/assets/icons/pack/pack_icon_fire.svg';
import PackIconWater from '@/assets/icons/pack/pack_icon_water.svg';
import PackIconHeart from '@/assets/icons/pack/pack_icon_heart.svg';
import HabitImage from '@/components/HabitImage';
import TaskCheckbox from '@/components/TaskCheckbox';
import PressableScale from '@/components/motion/PressableScale';
import Enter from '@/components/motion/Enter';

interface Props {
  lession: LessionType;
  key: string;
  onSelect?: () => void;
  isSelect: boolean;
  index?: number;
}

const LessionItem = ({lession, onSelect, isSelect, index = 0}: Props) => {
  return (
    <Enter delay={Math.min(index, 10) * 60} distance={14} scaleFrom={0.96}>
      <PressableScale
        onPress={onSelect}
        scaleTo={0.97}
        accessibilityRole="button"
        accessibilityState={{selected: isSelect}}
        style={styles.container}>
        <View style={styles.row}>
          <View style={styles.cover}>
            <HabitImage name={lession.lession_title} style={styles.coverImage} />
          </View>
          <View style={styles.body}>
            <Text style={styles.titleText} numberOfLines={2}>
              {lession.lession_title}
            </Text>
            <View style={styles.badges}>
              <PackIconFire width={25} height={25} style={styles.badge} />
              <PackIconWater width={25} height={25} style={styles.badge} />
              <PackIconHeart width={25} height={25} style={styles.badge} />
            </View>
          </View>
        </View>

        <View style={styles.checkbox}>
          <TaskCheckbox isChecked={isSelect} size={25} />
        </View>
      </PressableScale>
    </Enter>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 85,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },
  row: {flex: 1, flexDirection: 'row'},
  cover: {
    height: 60,
    width: 60,
    marginTop: 13,
    marginBottom: 12,
    marginLeft: 10,
  },
  coverImage: {flex: 1, borderRadius: 12},
  body: {marginTop: 12, marginLeft: 12, flexShrink: 1},
  badges: {marginTop: 13, flexDirection: 'row'},
  badge: {marginRight: 5},
  checkbox: {marginRight: 20},
  titleText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
});

export default memo(LessionItem);