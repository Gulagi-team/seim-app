import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import moment from 'moment';
import {StoreState, useAppSelector} from '@/store';
import {styles} from './ListDate.styles';
import {Habit} from '@/types/colection';

interface Props {
  habitSelected: Habit;
}
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
  const getDateList = (_habit: Habit): Date[] => {
    const listDate: Date[] = [];
    if (_habit.startDate === null) {
      return listDate;
    }

    const partNum = moment(today).diff(moment(habitSelected.startDate), 'days');
    for (let i = 1; i <= partNum; i++) {
      listDate.push({
        dayNum: i,
        state: DateState.DONE,
      });
    }

    // today
    listDate.push({
      dayNum: partNum + 1,
      state: DateState.TODAY,
    });

    for (let i = partNum + 2; i <= habitSelected.habit.days; i++) {
      listDate.push({
        dayNum: i,
        state: DateState.TODO,
      });
    }
    return listDate;
  };

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

  return (
    <View style={{marginBottom: 10}}>
      <ScrollView horizontal={true}>
        {getDateList(habitSelected).map(renderDayItem)}
      </ScrollView>
    </View>
  );
};

export default ListDateContent;
