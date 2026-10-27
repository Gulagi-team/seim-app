import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {StoreState, useAppSelector} from '@/store';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {fetchHabits} from '@/store/habits/action';
import {SafeAreaView} from 'react-native-safe-area-context';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import ListTaskContent from './component/ListTask';
import HeaderMain from '@/components/HeaderMain';
import HabitTile from './component/HabitTile';
import Enter from '@/components/motion/Enter';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import IconAdd from '@/assets/icons/icon_add.svg';
import IconSearch from '@/assets/icons/icon_search.svg';
import IconSetting from '@/assets/icons/icon_settings.svg';
import HomeBaner from '@/assets/images/home_banner.png';
import {styles, rightMenuStyles, topicStyles} from './HomeScreen.styles';
import {navigate} from '@/helpers/navigation';
import SCREENS from '@/constants/screen';
import {formatLongDate, getPartOfDay} from '@/helpers/conversion';
import {Habit} from '@/types/colection';

const HomeScreen = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const width = Dimensions.get('window').width;

  useEffect(() => {
    dispatch(fetchHabits());
  }, []);

  const habits = useAppSelector(
    (state: StoreState) => state.HabitsSlide.habits,
  );

  const [idxContent, setIdxContent] = useState<number>(0);
  const ref = useRef<ICarouselInstance>(null);

  const MAX_NUM_TOPICS = Number(process.env.MAX_NUM_TOPICS ?? 5);
  const addSlots = Math.max(MAX_NUM_TOPICS - habits.length, 0);
  const goToTopic = useCallback(() => navigate(SCREENS.TOPIC), []);

  // The placeholder slots only change when a habit is added or removed, not
  // when a task is ticked, so they must not be rebuilt on every tap.
  const addButtons = useMemo(
    () =>
      Array.from({length: addSlots}, (_, i) => (
        <TouchableOpacity
          key={i}
          onPress={goToTopic}
          style={topicStyles.itemAdd}>
          <IconAdd />
        </TouchableOpacity>
      )),
    [addSlots, goToTopic],
  );

  const handleSnapToItem = useCallback((index: number) => {
    setIdxContent(index);
  }, []);

  const renderHabitSlide = useCallback(
    ({item}: {item: Habit}) => <ListTaskContent habitSelected={item} />,
    [],
  );

  const handleChangeTask = (to: number) => {
    const dis = to - idxContent;
    setIdxContent(to);
    ref.current?.scrollTo({count: dis});
  };

  const rightIcon = (): React.ReactNode => (
    <View style={rightMenuStyles.container}>
      <TouchableOpacity style={rightMenuStyles.iconSearch}>
        <IconSearch />
      </TouchableOpacity>
      <TouchableOpacity style={rightMenuStyles.iconSetting}>
        <IconSetting />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.banner} source={HomeBaner} resizeMode={'contain'} />
      <View style={styles.containerView}>
        {/* <HeaderMain
          canGoBack={false}
          renderLogo={true}
          rightContent={rightIcon()}
          rightContentStyle={rightMenuStyles.rightContent}
        /> */}
        <Enter delay={40} distance={18}>
          <View style={styles.welcomeTop}>
            <Text style={styles.welcomeTitle}>Good {getPartOfDay()}</Text>
            <Text style={styles.currentDate}>
              Today is {formatLongDate(new Date())}
            </Text>
          </View>
        </Enter>
        <View style={styles.viewBody}>
          <Enter delay={120} distance={20} scaleFrom={0.95}>
            <ScrollView
              horizontal={true}
              // showsHorizontalScrollIndicator={false}
              style={styles.ScrollView}>
              {habits.map((item, index) => (
                <HabitTile
                  key={item.habit.id}
                  habit={item}
                  index={index}
                  selected={index === idxContent}
                  onSelect={handleChangeTask}
                  containerStyle={topicStyles.itemContainer}
                  imageStyle={styles.imgF}
                  lineStyle={topicStyles.selectedLine}
                />
              ))}

              {addButtons}
            </ScrollView>
          </Enter>

          {/* The carousel is left unwrapped on purpose: reanimated-carousel
              needs to be a direct child of the card to measure itself. */}
          <Carousel
            ref={ref}
            loop={false}
            width={width * 0.92}
            enabled={false}
            data={habits}
            onSnapToItem={handleSnapToItem}
            renderItem={renderHabitSlide}
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
