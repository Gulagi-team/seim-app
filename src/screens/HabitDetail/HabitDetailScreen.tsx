import moment from 'moment';
import React from 'react';
import {Image, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '@/components/Header';
import HabitImage from '@/components/HabitImage';
import RoadMapComplete, {ItemState, Item} from './component/RoadMapComplete';
import {StoreState, useAppSelector} from '@/store';
import {useNavigation} from '@react-navigation/native';
import {styles} from './HabitDetailScreen.styles';
import StarIcon from '@/assets/icons/star.svg';
import StreakIcon from '@/assets/icons/icon_streak.svg';
import {Habit} from '@/types/colection';
import Enter from '@/components/motion/Enter';

const HabitDetailScreen = ({route}: any) => {
  const habit: Habit = route.params;
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  const today = useAppSelector((state: StoreState) => state.HabitsSlide.today);

  const getDateList = (): Item[] => {
    const listDate: Item[] = [];
    if (habit.startDate === null) {
      return listDate;
    }

    const partNum = moment(today).diff(moment(habit.startDate), 'days');
    for (let i = 1; i <= partNum; i++) {
      listDate.push({
        num: i,
        state: ItemState.DONE,
      });
    }

    // today
    listDate.push({
      num: partNum + 1,
      state: ItemState.TODAY,
    });

    for (let i = partNum + 2; i <= habit.habit.days; i++) {
      listDate.push({
        num: i,
        state: ItemState.TODO,
      });
    }

    return listDate;
  };

  const partNum = !habit.startDate
    ? 0
    : moment(today).diff(moment(habit.startDate), 'days') + 1;

  return (
    <SafeAreaView style={styles.container}>
      <Header renderLogo={false} canGoBack={true} handleGoBack={goBack} />
      <Enter delay={40} distance={14} scaleFrom={0.97}>
        <View style={styles.habitContainer}>
        <HabitImage style={styles.itemImg} name={habit.habit.name} />
        <View style={styles.itemTitle}>
          <Text style={styles.title}>{habit.habit.name}</Text>
          <Text style={styles.secondTitle}>{habit.habit.description}</Text>
          <View style={styles.statIcon}>
            <StarIcon />
            <Text style={styles.statText}>{habit.habit.rating}</Text>
          </View>
        </View>
        </View>
      </Enter>
      <Enter delay={120} distance={10}>
        <View style={styles.totalDayContainer}>
          <StreakIcon />
          <Text style={styles.totalDay}>
            Day {partNum}/{habit.habit.days}
          </Text>
        </View>
      </Enter>
      <RoadMapComplete items={getDateList()} />
    </SafeAreaView>
  );
};

export default HabitDetailScreen;
