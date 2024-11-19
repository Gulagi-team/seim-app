import React, {useEffect, useRef, useState} from 'react';
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
import FastImage from 'react-native-fast-image';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import ListTaskContent from './component/ListTask';
import HeaderMain from '@/components/HeaderMain';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import IconAdd from '@/assets/icons/icon_add.svg';
import IconSearch from '@/assets/icons/icon_search.svg';
import IconSetting from '@/assets/icons/icon_settings.svg';
import HomeBaner from '@/assets/images/home_banner.png';
import {styles, rightMenuStyles, topicStyles} from './HomeScreen.styles';
import {navigate} from '@/helpers/navigation';
import SCREENS from '@/constants/screen';
import {formatLongDate, getPartOfDay} from '@/helpers/conversion';
import {getStringLocal} from '@/helpers/localStorage';
import {Habit} from '@/types/colection';

const HomeScreen = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const width = Dimensions.get('window').width;

  useEffect(() => {
    dispatch(fetchHabits());
  }, []);

  const getLessionsSelectedLocal = getStringLocal('lessionsSelected');

  const habits = getLessionsSelectedLocal
    ? JSON.parse(getLessionsSelectedLocal)
    : [];

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
              {habits.map((item, index) => (
                <TouchableOpacity
                  style={topicStyles.itemContainer}
                  onPress={() => handleChangeTask(index)}
                  key={item.habit.id}>
                  <FastImage
                    style={styles.imgF}
                    source={{
                      uri: item.habit.icon,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  {index === idxContent && (
                    <View style={topicStyles.selectedLine} />
                  )}
                </TouchableOpacity>
              ))}

              {renderAddTopicButton()}
            </ScrollView>
          </View>

          <Carousel
            ref={ref}
            loop={false}
            width={width * 0.92}
            enabled={true} // Enable the carousel
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
