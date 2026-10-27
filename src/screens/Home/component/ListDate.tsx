import React, {memo, useMemo} from 'react';
import {Text, View, ScrollView} from 'react-native';
import moment from 'moment';
import {StoreState, useAppSelector} from '@/store';
import {styles} from './ListDate.styles';
import {Habit} from '@/types/colection';

interface Props {
  habitSelected: Habit;
}

// 36px circle + 12px gap, matches the day styles.
const DAY_ITEM_WIDTH = 48;
const DAY_WINDOW_BEFORE = 6;
const DAY_WINDOW_AFTER = 13;

const dayIndexOf = (today: string, startDate: string | null) =>
  moment(today).diff(moment(startDate), 'days') + 1;
enum DateState {
  DONE,
  TODAY,
  TODO,
}
interface Date {
  dayNum: number;
  state: DateState;
}
const ListDateContent = ({habitSelected}: Props) => {
  const today = useAppSelector((state: StoreState) => state.HabitsSlide.today);

  const getDateList = useMemo(
    () => (_today: string, _habit: Habit): Date[] => {
    const listDate: Date[] = [];
    if (_habit.startDate === null) {
      return listDate;
    }

    const total = habitSelected.habit.days;
    const todayIndex = dayIndexOf(today, habitSelected.startDate);

    // A long program can run for weeks, and drawing every circle mounts a view
    // per day. Only the days around today are mounted, the rest is reachable by
    // scrolling a plan that already fits on screen.
    const first = Math.max(1, todayIndex - DAY_WINDOW_BEFORE);
    const last = Math.max(todayIndex, Math.min(total, todayIndex + DAY_WINDOW_AFTER));

    for (let i = first; i < todayIndex; i++) {
      listDate.push({
        dayNum: i,
        state: DateState.DONE,
      });
    }

    listDate.push({
      dayNum: todayIndex,
      state: DateState.TODAY,
    });

    for (let i = todayIndex + 1; i <= last; i++) {
      listDate.push({
        dayNum: i,
        state: DateState.TODO,
      });
    }

    return listDate;
    },
    [habitSelected.startDate, habitSelected.habit.days, today],
  );

  const renderDayItem = (item: Date) => {
    if (item.state === DateState.DONE) {
      return (
        <View key={item.dayNum} style={styles.doneDayContainer}>
          <Text style={styles.doneDayText}>{item.dayNum}</Text>
        </View>
      );
    }

    if (item.state === DateState.TODAY) {
      return (
        <View key={item.dayNum} style={styles.toDayContainer}>
          <Text style={styles.toDayText}>{item.dayNum}</Text>
        </View>
      );
    }

    return (
      <View key={item.dayNum} style={styles.failedDayContainer}>
        <Text style={styles.failedDayText}>{item.dayNum}</Text>
      </View>
    );
  };

  // The strip only mounts the days around today, so it has to start scrolled
  // there instead of at day one.
  const firstDay = habitSelected.startDate
    ? Math.max(1, dayIndexOf(today, habitSelected.startDate) - DAY_WINDOW_BEFORE)
    : 1;

  return (
    <View style={{marginBottom: 10}}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={true}
        contentOffset={{
          x: (firstDay - 1) * DAY_ITEM_WIDTH,
          y: 0,
        }}>
        {getDateList(today, habitSelected).map(renderDayItem)}
      </ScrollView>
    </View>
  );
};

export default memo(ListDateContent);
