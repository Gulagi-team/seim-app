import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import StarIcon from '@/assets/icons/star.svg';
import WelcomeBottom from '@/assets/images/welcomeBottom.png';
import Header from '@/components/Header';
import Search from '@/components/Search/SearchInput';
import SCREENS from '@/constants/screen';
import {iconMap} from '@/helpers/icon';
import {navigateReset} from '@/helpers/navigation';
import {StoreState, useAppSelector} from '@/store';
import {saveHabit} from '@/store/habits/action';
import {HabitData, Topic} from '@/types/colection';
import {AddIcon, Icon} from '@gluestack-ui/themed';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {styles} from './LessionScreen.styles';

const LessionScreen = ({route}: any) => {
  const topic: Topic = route.params;
  const navigation = useNavigation();
  const goBack = () => navigation.pop();
  const {t} = useTranslation(['home']);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const habits = useAppSelector(
    (state: StoreState) => state.HabitsSlide.habits,
  );

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['60%', '60%'], []);
  const [habitSelected, setHabitSelected] = useState<HabitData | null>(null);
  const [searchText, onChangeSearch] = useState<string>('');
  const [filteredData, setFilteredData] = useState<HabitData[]>([]);

  useEffect(() => {
    const filtered = topic.habits.filter(habit =>
      habit.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    if (searchText === '') {
      return setFilteredData(topic.habits);
    }

    setFilteredData(filtered);
  }, [searchText, topic]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    [],
  );

  const handleOpenModal = (habit: HabitData) => {
    setHabitSelected(habit);
    bottomSheetRef.current?.collapse();
  };

  const handleCloseModel = () => {
    bottomSheetRef.current?.close();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Search
        style={styles.searchBar}
        label="Search"
        onChange={onChangeSearch}
      />
      <Header
        renderLogo={false}
        canGoBack={true}
        handleGoBack={goBack}
        rightContent={<Text style={styles.textTitle}>{topic.name}</Text>}
      />
      <ScrollView style={styles.ScrollView}>
        {filteredData.map(habit => {
          const ICON = iconMap[habit.icon as keyof typeof iconMap];
          return (
            <TouchableOpacity
              key={habit.id}
              style={styles.item}
              onPress={() => {
                if (!habits.some(item => item.habit.id === habit.id)) {
                  handleOpenModal(habit);
                }
              }}>
              {/* <LessionIcon style={styles.itemImg} /> */}
              {/* <Image
                style={styles.itemImg}
                source={{uri: habit.icon}}
                resizeMode={'stretch'}
              /> */}
              <ICON />
              <View style={styles.itemTitle}>
                <Text style={styles.title}>{habit.name}</Text>
                <Text style={styles.secondTitle}>{habit.description}</Text>
                <View style={styles.statIcon}>
                  <StarIcon />
                  <Text style={styles.statText}>{habit.rating}</Text>
                </View>
              </View>
              {!habits.some(item => item.habit.id === habit.id) && (
                <View style={styles.addStyle}>
                  <Icon as={AddIcon} color="#FFFFFF" size="sm" />
                  <Text style={styles.addText}>{t('save')}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <Image
        style={styles.welcomeBottom}
        source={WelcomeBottom}
        resizeMode={'stretch'}
      />
      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}>
        <BottomSheetView style={styles.bottomContainer}>
          <View>
            {/* <LessionIcon /> */}
            {/* <Image
              style={styles.itemImg}
              source={{uri: habitSelected?.icon}}
              resizeMode={'stretch'}
            /> */}

            {habitSelected?.icon && (
              <Icon as={iconMap[habitSelected.icon as keyof typeof iconMap]} />
            )}
          </View>
          <Text style={styles.bottomTitle}>{habitSelected?.name}</Text>
          <ScrollView style={styles.bottomScroll}>
            <Text>{habitSelected?.description}</Text>
          </ScrollView>
          <View style={styles.bottomAction}>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={() => {
                dispatch(
                  saveHabit({habitId: habitSelected?.id || '', isStart: false}),
                );
                handleCloseModel();
              }}>
              <Text style={styles.saveTxt}>{t('save')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.startBtn}
              onPress={() => {
                dispatch(
                  saveHabit({habitId: habitSelected?.id || '', isStart: true}),
                );
                navigateReset(SCREENS.MAIN);
              }}>
              <Text style={styles.startTxt}>{t('start')}</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default LessionScreen;
