import React from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import {styles} from './RoadMapComplete.styles';
import StateBlue from '@/assets/images/state_blue.png';
import StateGray from '@/assets/images/state_gray.png';
import StateDoing from '@/assets/images/state_doing.png';
import RoadRight from '@/assets/images/road_right.png';
import RoadLeft from '@/assets/images/road_left.png';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {useEffect} from 'react';
import Enter from '@/components/motion/Enter';

export enum ItemState {
  DONE,
  TODAY,
  TODO,
}
export interface Item {
  state: ItemState;
  num: number;
}
interface Props {
  items: Item[];
}
interface DayMarkerProps {
  num: number;
  containerStyle: any;
  children: React.ReactNode;
}

// Today's milestone is the one thing on the road worth looking at, so it keeps
// a slow glow instead of sitting still like the finished and future ones.
const DayMarker = ({num, containerStyle, children}: DayMarkerProps) => {
  const glow = useSharedValue(0);

  useEffect(() => {
    glow.value = withDelay(
      400,
      withRepeat(
        withSequence(
          withTiming(1, {duration: 1100, easing: Easing.inOut(Easing.ease)}),
          withTiming(0, {duration: 1100, easing: Easing.inOut(Easing.ease)}),
        ),
        -1,
        true,
      ),
    );
  }, [glow]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: 1 + glow.value * 0.08}],
  }));

  return (
    <Animated.View style={[containerStyle, animatedStyle]}>
      {children}
      <View style={styles.todayBadge}>
        <Text style={styles.todayBadgeText}>{num}</Text>
      </View>
    </Animated.View>
  );
};
const RoadMapComplete = ({items}: Props) => {
  const getSpliceList = (): Item[][] => {
    const result: Item[][] = [];
    let count = 0;
    for (let i = 0; i < items.length; i += 4) {
      if (count % 2 === 0) {
        result.push(items.slice(i, i + 4));
      } else {
        result.push(items.slice(i, i + 4).reverse());
      }
      count++;
    }
    return result;
  };
  const spliceList = getSpliceList();

  const renderDayItem = (item: Item, index: number, isRoadRight: boolean) => {
    const isLast: boolean = index === 4;
    if (item.state === ItemState.DONE) {
      return (
        <View
          key={item.num}
          style={
            isLast
              ? styles.dayContainerLast
              : isRoadRight
              ? styles.dayContainerLeft
              : styles.dayContainerRight
          }>
          <Image
            style={styles.itemImg}
            source={StateBlue}
            resizeMode={'contain'}
          />
          <Text style={styles.dayText}>{item.num}</Text>
        </View>
      );
    }

    if (item.state === ItemState.TODAY) {
      return (
        <DayMarker
          key={item.num}
          num={item.num}
          containerStyle={
            isLast
              ? styles.dayContainerLast
              : isRoadRight
              ? styles.dayContainerLeft
              : styles.dayContainerRight
          }>
          <Image
            style={styles.itemImg}
            source={StateDoing}
            resizeMode={'contain'}
          />
        </DayMarker>
      );
    }

    return (
      <View
        key={item.num}
        style={
          isLast
            ? styles.dayContainerLast
            : isRoadRight
            ? styles.dayContainerLeft
            : styles.dayContainerRight
        }>
        <Image
          style={styles.itemImg}
          source={StateGray}
          resizeMode={'contain'}
        />
        <Text style={styles.dayText}>{item.num}</Text>
      </View>
    );
  };

  const renderRoad = (_items: Item[], index: number) => {
    const isLast = index === spliceList.length - 1;
    const isRoadRight = index % 2 === 0;
    const roadWith = (_items.length - 1) * 25;

    return (
      <Enter key={index} delay={Math.min(index, 8) * 70} distance={12} scaleFrom={0.95}>
        <View style={styles.roadContainer}>
        <View
          style={[
            isRoadRight ? styles.roadAlignLeft : styles.roadAlignRight,
            {width: `${roadWith}%`},
          ]}
        />
        {!isLast && (
          <Image
            style={isRoadRight ? styles.roadRightImg : styles.roadLeftImg}
            source={isRoadRight ? RoadRight : RoadLeft}
            resizeMode={'contain'}
          />
        )}
        <View style={isRoadRight ? styles.listDayRight : styles.listDayLeft}>
          {_items.map((item, i) => renderDayItem(item, i, isRoadRight))}
        </View>
        </View>
      </Enter>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal={false}>
        {spliceList.map(renderRoad)}
      </ScrollView>
    </View>
  );
};
export default RoadMapComplete;
