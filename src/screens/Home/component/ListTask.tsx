import ThreeDot from '@/assets/icons/icon_three_dots.svg';
import SCREENS from '@/constants/screen';
import {navigate} from '@/helpers/navigation';
import {StoreState} from '@/store';
import {deleteHabit, startHabit} from '@/store/habits/action';
import {Habit} from '@/types/colection';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {ThunkDispatch} from '@reduxjs/toolkit';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
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

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['60%', '60%'], []);

  const habitStatus = useSelector(
    (state: StoreState) => state.HabitsSlide.status,
  );

  useEffect(() => {
    if (habitStatus === 'succeeded') {
      setModalVisible(false);
      bottomSheetRef.current?.close();
    }
  }, [habitStatus]);

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

  const handleOpenModal = () => {
    bottomSheetRef.current?.collapse();
  };

  const handleConfirmDelete = () => {
    setModalVisible(true);
  };

  const handleCancelDelete = () => {
    setModalVisible(false);
  };

  const enable: boolean =
    habitSelected.startDate !== null && habitSelected.startDate !== undefined;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.question}>
        <View style={styles.titleContainer}>
          <Text style={styles.howOldAre1}>{habitSelected.habit.name}</Text>
          {enable && (
            <TouchableOpacity onPress={handleOpenModal}>
              <ThreeDot />
            </TouchableOpacity>
          )}
        </View>
        {habitSelected.startDate && (
          <>
            <ListDate habitSelected={habitSelected} />
            <View style={styles.breakLine} />
            {/* <Point habit={habitSelected.habit} /> */}
          </>
        )}
        {!habitSelected.startDate && (
          <TouchableOpacity
            style={styles.startBtn}
            onPress={() => {
              dispatch(startHabit(habitSelected.habit.id));
            }}>
            <Text style={styles.startText}>Let's started &gt;</Text>
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
      <BottomSheet
        index={-1}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        style={{
          marginTop: 230,
        }}
        backdropComponent={renderBackdrop}>
        <BottomSheetView style={styles.bottomAction}>
          <TouchableOpacity
            onPress={() => navigate(SCREENS.HABIT_DETAIL, habitSelected)}
            style={styles.bottonBtn}>
            <Text style={styles.show}>Show history</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleConfirmDelete}
            style={styles.bottonBtn}>
            <Text style={styles.deleteProcess}>Delete process</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={handleCancelDelete}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to delete this process?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={handleCancelDelete}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonDelete]}
                onPress={() => {
                  dispatch(deleteHabit(habitSelected.habit.id));
                }}>
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default ListTaskContent;
