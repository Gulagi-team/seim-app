import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LessionType} from '@/types/colection';
import PackIconFire from '@/assets/icons/pack/pack_icon_fire.svg';
import PackIconWater from '@/assets/icons/pack/pack_icon_water.svg';
import PackIconHeart from '@/assets/icons/pack/pack_icon_heart.svg';
import HabitImage from '@/components/HabitImage';
import Enter from '@/components/motion/Enter';
import {StoreState, useAppSelector} from '@/store';
import {FONT_SIZE, POPPINS_MEDIUM} from '@/theme';

interface Props {
  lession: LessionType;
  key: string;
  index?: number;
}

const PackItem = ({lession, index = 0}: Props) => {
  const {containerColor, textColor, textOutstandingColor} = useAppSelector(
    (state: StoreState) => state.ThemeSlice,
  );

  return (
    <Enter delay={Math.min(index, 10) * 60} distance={14} scaleFrom={0.96}>
      <View
        style={{
          ...styles.container,
          backgroundColor: containerColor,
          shadowColor: textOutstandingColor,
        }}>
        <View style={styles.row}>
          <View style={styles.cover}>
            <HabitImage name={lession.lession_title} style={styles.coverImage} />
          </View>
          <View style={styles.body}>
            <Text
              style={[styles.titleText, {color: textColor}]}
              numberOfLines={2}>
              {lession.lession_title}
            </Text>
            <View style={styles.badges}>
              <PackIconFire width={25} height={25} style={styles.badge} />
              <PackIconWater width={25} height={25} style={styles.badge} />
              <PackIconHeart width={25} height={25} style={styles.badge} />
            </View>
          </View>
        </View>
      </View>
    </Enter>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 85,
    flex: 1,
    marginBottom: 10,
    borderRadius: 10,
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
  badges: {marginTop: 10, flexDirection: 'row'},
  badge: {marginRight: 5},
  titleText: {
    fontSize: FONT_SIZE.small1,
    fontWeight: '500',
    fontFamily: POPPINS_MEDIUM,
  },
});

export default memo(PackItem);