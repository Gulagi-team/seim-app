import React from 'react';

import LessionItem from '@/components/listItem/LessionItem';
import SCREENS from '@/constants/screen';
import {navigate} from '@/helpers/navigation';
import {StoreState, reduxStorage, useAppSelector} from '@/store';
import {
  addKeyLession,
  addLessionSelected,
  removeKeyLession,
  updateLessionSelected,
} from '@/store/lessions';
import {fetchTopics} from '@/store/topics/action';
import {Habit, LessionType} from '@/types/colection';
import {Spinner} from '@gluestack-ui/themed';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {styles} from './PackScreen.styles';
import {writeToFile} from '@/helpers/file';
import {showToast} from '@/helpers/toast';
import {useTranslation} from 'react-i18next';

const PackScreen = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {t} = useTranslation(['other']);
  const [loading, setLoading] = useState(true);
  // const [lessions, setLessions] = useState<LessionType[]>([]);

  const {lessions, lessionsSelected, status, keyLessionSelected} =
    useAppSelector((state: StoreState) => state.LessionSlice);

  useEffect(() => {
    dispatch(fetchTopics());
  }, []);

  //------

  const handleSelectLession = (key: string, lesson: Habit) => {
    if (keyLessionSelected.indexOf(key) >= 0) {
      dispatch(removeKeyLession(key));
    } else {
      dispatch(addKeyLession(key));
      dispatch(addLessionSelected(lesson));
    }
  };

  const handleFinishSelect = () => {
    if (keyLessionSelected.length > 5) {
      showToast('error', t('maxChallenge'));
      return;
    }
    dispatch(updateLessionSelected());
    reduxStorage.setItem('lessionsSelected', JSON.stringify(lessionsSelected));
    reduxStorage.setItem(
      'keyLessionsSelected',
      JSON.stringify(keyLessionSelected),
    );

    //update to file
    writeToFile(lessionsSelected, 'habits.json');

    navigate(SCREENS.MAIN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.chooseText}>{t('chooseChallenge')}</Text>
        <TouchableOpacity
          style={styles.finishContainer}
          onPress={handleFinishSelect}>
          <Text style={styles.finishText}>{t('finish')} &gt;</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.contentContainer}>
        {lessions.map(item => (
          <LessionItem
            lession={item}
            key={item.habit.id}
            onSelect={() => handleSelectLession(item.habit.id, item)}
            isSelect={keyLessionSelected.indexOf(item.habit.id) >= 0}
          />
        ))}
        {lessions.length === 0 ? (
          <View>
            <Spinner size="large" />
          </View>
        ) : (
          ''
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PackScreen;
