import ThreeDot from '@/assets/icons/icon_three_dots.svg';

import SCREENS from '@/constants/screen';
import {navigate} from '@/helpers/navigation';
import {StoreState} from '@/store';
import {deleteHabit, startHabit} from '@/store/habits/action';
import {Habit} from '@/types/colection';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {ThunkDispatch} from '@reduxjs/toolkit';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Modal, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import DisableTask from './DisableTask';
import ListDate from './ListDate';
import {styles} from './ListTask.styles';
import Task from './Task';

interface Props {
  habitSelected: Habit;
}
// onPress={() => navigate(SCREENS.HABIT_DETAIL, habitSelected)}

const ListTaskContent = ({habitSelected}: Props) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const {t} = useTranslation(['home']);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const habitStatus = useSelector(
    (state: StoreState) => state.HabitsSlide.status,
  );

  useEffect(() => {
    if (habitStatus === 'succeeded') {
      setModalVisible(false);
      bottomSheetRef.current?.close();
    }
  }, [habitStatus]);

  const handleConfirmDelete = () => {
    setModalVisible(true);
    setOpenModal(false);
  };

  const handleCancelDelete = () => {
    setModalVisible(false);
  };

  const enable: boolean =
    habitSelected.startDate !== null && habitSelected.startDate !== undefined;

  return (
    <SafeAreaView style={styles.container}>
      {openModal && (
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.iconOverlay}
            onPress={() => setOpenModal(false)}>
            <Text style={styles.show}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigate(SCREENS.HABIT_DETAIL, habitSelected);
              setOpenModal(false);
            }}
            style={styles.bottonBtn}>
            <Text style={styles.show}>{t('show')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleConfirmDelete}
            style={styles.bottonBtn}>
            <Text style={styles.deleteProcess}>{t('delete')}</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.question}>
        <View style={styles.titleContainer}>
          <Text style={styles.howOldAre1}>{habitSelected.habit.name}</Text>
          {enable && (
            <TouchableOpacity onPress={() => setOpenModal(true)}>
              <ThreeDot />
            </TouchableOpacity>
          )}
        </View>
        {habitSelected.startDate && (
          <>
            <ListDate habitSelected={habitSelected} />
            <View style={styles.breakLine} />
          </>
        )}
        {!habitSelected.startDate && (
          <TouchableOpacity
            style={styles.startBtn}
            onPress={() => {
              dispatch(startHabit(habitSelected.habit.id));
            }}>
            <Text style={styles.startText}>{t('started')} &gt;</Text>
          </TouchableOpacity>
        )}
        <View
          style={
            !habitSelected.startDate
              ? styles.itemContainerNotStart
              : styles.itemContainerStarted
          }>
          <FlatList
            data={habitSelected.habit.tasks}
            renderItem={({item}) => {
              if (enable) {
                return <Task task={item} habit={habitSelected.habit} />;
              } else {
                return <DisableTask task={item} />;
              }
            }}
          />
        </View>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={handleCancelDelete}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{t('confirmDelete')}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={handleCancelDelete}>
                <Text>{t('cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonDelete]}
                onPress={() => {
                  dispatch(deleteHabit(habitSelected.habit.id));
                }}>
                <Text>{t('delete_2')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default ListTaskContent;
