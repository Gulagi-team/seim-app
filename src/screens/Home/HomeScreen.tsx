import IconAdd from '@/assets/icons/icon_add.svg';
import HomeBaner from '@/assets/images/home_banner.png';
import HomeBanerDark from '@/assets/images/home_banner_dark.png';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import SCREENS from '@/constants/screen';
import {formatLongDate, getPartOfDay} from '@/helpers/conversion';
import {readFromFile, removeFile, writeToFile} from '@/helpers/file';
import {navigate} from '@/helpers/navigation';
import {StoreState, useAppSelector} from '@/store';
import {getAuth} from '@/store/auth';
import {updateState} from '@/store/habits';
import {fetchHabits} from '@/store/habits/action';
import {Habit} from '@/types/colection';
import {ThunkDispatch} from '@reduxjs/toolkit';
import React, {useEffect, useRef, useState} from 'react';

import {iconMap} from '@/helpers/icon';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import ListTaskContent from './component/ListTask';
import {styles, topicStyles} from './HomeScreen.styles';
import {useTranslation} from 'react-i18next';

const HomeScreen = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const width = Dimensions.get('window').width;
  const habits = useAppSelector(
    (state: StoreState) => state.HabitsSlide.habits,
  );

  const {t} = useTranslation(['home']);

  useEffect(() => {
    const getData = async () => {
      const user = await getAuth();
      console.log('user', user);
      if (user) {
        dispatch(fetchHabits());
      } else {
        const habitsFromFile = await readFromFile('habits.json');
        console.log('habitsFromFile', habitsFromFile);
        dispatch(updateState(habitsFromFile));
      }
    };

    getData();
  }, []);

  useEffect(() => {
    let resetTimeout: any;

    const handleResetStatusHabit = async () => {
      try {
        const data = await readFromFile('habits.json');

        const updatedHabits = data.map(habit => ({
          ...habit,
          habit: {
            ...habit.habit,
            tasks: habit.habit.tasks.map(task => ({
              ...task,
              isFinished: false,
            })),
          },
        }));

        await removeFile('habits.json');
        await writeToFile('habits.json', updatedHabits);

        console.log('Habits reset successfully!');
      } catch (error) {
        console.error('Error resetting habits:', error);
      }
    };

    const scheduleNextReset = () => {
      const now = new Date();
      const nextReset = new Date();
      nextReset.setHours(1, 0, 0, 0); // 1h sáng
      if (now >= nextReset) {
        nextReset.setDate(nextReset.getDate() + 1); // Lùi sang ngày hôm sau nếu đã qua 1h
      }

      const timeUntilNextReset = nextReset.getTime() - now.getTime();

      console.log(`Next reset scheduled at: ${nextReset}`);

      resetTimeout = setTimeout(async () => {
        await handleResetStatusHabit();
        scheduleNextReset(); // Tiếp tục đặt lịch cho lần reset tiếp theo
      }, timeUntilNextReset);
    };

    scheduleNextReset();

    return () => {
      if (resetTimeout) {
        clearTimeout(resetTimeout);
      }
    };
  }, []);

  const [idxContent, setIdxContent] = useState<number>(0);
  const ref = useRef<ICarouselInstance>(null);

  const renderAddTopicButton = (): React.ReactNode[] => {
    const items = [];
    const MAX_NUM_TOPICS = Number(process.env.MAX_NUM_TOPICS ?? 5);
    for (let i = 0; i < MAX_NUM_TOPICS - habits.length; i++) {
      items.push(
        <TouchableOpacity
          key={i}
          onPress={() => navigate(SCREENS.TOPIC)}
          style={topicStyles.itemAdd}>
          <IconAdd />
        </TouchableOpacity>,
      );
    }
    return items;
  };

  const handleChangeTask = (to: number) => {
    const dis = to - idxContent;
    setIdxContent(to);
    ref.current?.scrollTo({count: dis});
  };
  const [bannerSource, setBannerSource] = useState(HomeBaner);

  useEffect(() => {
    const updateBanner = () => {
      const currentHour = new Date().getHours();
      const isNightTime = currentHour >= 18 || currentHour < 5;
      setBannerSource(isNightTime ? HomeBanerDark : HomeBaner);
    };

    const scheduleNextCheck = () => {
      const now = new Date();
      const nextCheck = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes() + 1,
        0,
        0,
      );
      const timeUntilNextCheck = nextCheck.getTime() - now.getTime();

      const timeoutId = setTimeout(() => {
        updateBanner();
        scheduleNextCheck();
      }, timeUntilNextCheck);

      return timeoutId;
    };

    const timeoutId = scheduleNextCheck();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.banner}
        source={bannerSource}
        resizeMode={'contain'}
      />
      <View style={styles.containerView}>
        <View style={styles.welcomeTop}>
          <Text style={styles.welcomeTitle}>{t(getPartOfDay())}</Text>
          <Text style={styles.currentDate}>
            {t('today')} {formatLongDate(new Date())}
          </Text>
        </View>
        <View style={styles.viewBody}>
          <View>
            <ScrollView
              horizontal={true}
              // showsHorizontalScrollIndicator={false}
              style={styles.ScrollView}>
              {habits.map((item, index) => {
                const ICON = iconMap[item.habit.icon as keyof typeof iconMap];
                return (
                  <TouchableOpacity
                    style={topicStyles.itemContainer}
                    onPress={() => handleChangeTask(index)}
                    key={item.habit.id}>
                    {typeof ICON === 'function' ? <ICON /> : ICON}

                    {index === idxContent && (
                      <View style={topicStyles.selectedLine} />
                    )}
                  </TouchableOpacity>
                );
              })}

              {renderAddTopicButton()}
            </ScrollView>
          </View>

          <Carousel
            ref={ref}
            loop={false}
            width={width * 0.92}
            enabled={false}
            data={habits}
            onSnapToItem={index => {
              setIdxContent(index);
            }}
            renderItem={({item}: {item: Habit}) => (
              <ListTaskContent habitSelected={item} />
            )}
          />
        </View>
      </View>

      <Image
        style={styles.welcomeBottom}
        source={WelcomeBottom}
        resizeMode={'stretch'}
      />
    </SafeAreaView>
  );
};
export default HomeScreen;
