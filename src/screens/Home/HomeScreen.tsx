import IconAdd from '@/assets/icons/icon_add.svg';
import HomeBaner from '@/assets/images/home_banner.png';
import HomeBanerDark from '@/assets/images/home_banner_dark.png';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import SCREENS from '@/constants/screen';
import {formatLongDate, getPartOfDay} from '@/helpers/conversion';
import {readFromFile, removeFile, writeToFile} from '@/helpers/file';
import {navigate} from '@/helpers/navigation';
import {StoreState} from '@/store';
import {getAuth} from '@/store/auth';
import {updateState} from '@/store/habits';
import {checkProgressOfHabit, fetchHabits} from '@/store/habits/action';
import {Habit, Version} from '@/types/colection';
import {ThunkDispatch} from '@reduxjs/toolkit';
import React, {useEffect, useRef, useState} from 'react';

import {iconMap} from '@/helpers/icon';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import ListTaskContent from './component/ListTask';
import {styles, topicStyles} from './HomeScreen.styles';
import DeviceInfo from 'react-native-device-info';
import {getLatestVersion} from '@/api/version';
import Loading from '../Loading/Loading';
import {useFocusEffect} from '@react-navigation/native';
import {getInfoUser} from '@/store/userInfo/action';
import {getMiningInfo} from '@/store/mining/action';

const HomeScreen = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const width = Dimensions.get('window').width;
  const {habits, status} = useSelector(
    (state: StoreState) => state.HabitsSlide,
  );

  const {t} = useTranslation(['home']);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [version, setVersion] = useState<Version>();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getMiningInfo());
      dispatch(getInfoUser());
    }, [dispatch]),
  );

  useEffect(() => {
    const getData = async () => {
      dispatch(checkProgressOfHabit());

      const user = await getAuth();
      console.log('user', user);
      if (user) {
        dispatch(fetchHabits());
      } else {
        const habitsFromFile = await readFromFile('habits.json');
        dispatch(updateState(habitsFromFile));
      }
    };

    getData();
  }, [dispatch]);
  useEffect(() => {
    const checkVersion = async () => {
      const versionLocal = DeviceInfo.getVersion();
      try {
        const response = await getLatestVersion();
        if (response.data) {
          setVersion(response.data);
          if (response.data.version !== versionLocal) {
            setIsUpdate(true);
            return;
          }
        }
      } catch (error) {}
    };
    checkVersion();
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
        dispatch(checkProgressOfHabit());
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
  useEffect(() => {
    if (habits.length === 0) {
      setIdxContent(0);
    } else if (idxContent >= habits.length) {
      const newIndex = habits.length - 1;
      setIdxContent(newIndex);
      setTimeout(() => {
        ref.current?.scrollTo({count: newIndex});
      }, 0);
    }
  }, [habits, idxContent]);

  return (
    <SafeAreaView style={styles.container}>
      {isUpdate && (
        <View style={styles.modal_container}>
          <Modal transparent={true} visible={true} animationType="fade">
            <View style={styles.modal_overlay}>
              <View style={styles.modal_modalContainer}>
                <Text style={styles.modal_title}>{t('updateRequired')}</Text>
                <Text style={styles.modal_message}>{t('warning')}</Text>
                <View style={styles.modal_buttonContainer}>
                  <Pressable
                    style={[styles.modal_button, styles.modal_quitButton]}
                    onPress={() => {
                      Linking.openURL(version?.url!);
                    }}>
                    <Text style={styles.modal_quitButtonText}>
                      {t('updateVersion')}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
      {status === 'loadingData' && <Loading />}

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
                    <Text
                      style={{
                        height: 50,
                        width: 50,
                      }}>
                      {typeof ICON === 'function' ? <ICON /> : ICON}
                    </Text>

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
            key={habits.length}
            loop={false}
            width={width * 0.92}
            enabled={false}
            data={habits}
            onSnapToItem={index => {
              setIdxContent(index);
            }}
            renderItem={({item}: {item: Habit}) => {
              return <ListTaskContent habitSelected={item} />;
            }}
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
