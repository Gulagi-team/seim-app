import IconAdd from '@/assets/icons/icon_add.svg';
import IconSearch from '@/assets/icons/icon_search.svg';
import IconSetting from '@/assets/icons/icon_settings.svg';
import HomeBaner from '@/assets/images/home_banner.png';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import SCREENS from '@/constants/screen';
import {formatLongDate, getPartOfDay} from '@/helpers/conversion';
import {readFromFile} from '@/helpers/file';
import {navigate} from '@/helpers/navigation';
import {StoreState, useAppSelector} from '@/store';
import {getAuth} from '@/store/auth';
import {updateState} from '@/store/habits';
import {fetchHabits} from '@/store/habits/action';
import {Habit} from '@/types/colection';
import {ThunkDispatch} from '@reduxjs/toolkit';
import React, {useEffect, useRef, useState} from 'react';
import YOUTUBE from '@/assets/icons/tasks/Youtube.svg';

import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import ListTaskContent from './component/ListTask';
import {rightMenuStyles, styles, topicStyles} from './HomeScreen.styles';
import {iconMap} from '@/helpers/icon';

const HomeScreen = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const width = Dimensions.get('window').width;
  const habits = useAppSelector(
    (state: StoreState) => state.HabitsSlide.habits,
  );
  const getData = async () => {
    const user = await getAuth();

    if (user) {
      dispatch(fetchHabits());
    } else {
      const habitsFromFile = await readFromFile('habits.json');
      console.log('habitsFromFile:', habitsFromFile);

      dispatch(updateState(habitsFromFile));
    }
  };

  useEffect(() => {
    getData();
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
        <View style={styles.welcomeTop}>
          <Text style={styles.welcomeTitle}>Good {getPartOfDay()}</Text>
          <Text style={styles.currentDate}>
            Today is {formatLongDate(new Date())}
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
                    {/* <FastImage
                      style={styles.imgF}
                      source={{
                        uri: item.habit.icon,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                    /> */}
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
