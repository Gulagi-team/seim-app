import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useEffect, useState} from 'react';
import {LessionType} from '@/types/colection';
import LessionItem from '@/components/listItem/LessionItem';
import {StoreState, reduxStorage, useAppSelector} from '@/store';
import {useDispatch} from 'react-redux';
import {
  addKeyLession,
  removeKeyLession,
  addLessionSelected,
  updateLessionSelected,
  fetchLessions,
} from '@/store/lessions';
import {navigate} from '@/helpers/navigation';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {Spinner} from '@gluestack-ui/themed';
import {styles} from './LessionTypeScreen.styles';
import SCREENS from '@/constants/screen';
import Enter from '@/components/motion/Enter';
import PressableScale from '@/components/motion/PressableScale';

const LessionTypeScreen = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const [loading, setLoading] = useState(true);

  const {lessions, lessionsSelected, status, keyLessionSelected} = useAppSelector((state: StoreState) => state.LessionSlice);

  useEffect(() => {
    dispatch(fetchLessions());
  }, []);

  //------
  const handleSelectLession = (key: string, lesson: LessionType) => {
    if (keyLessionSelected.indexOf(key) >= 0) {
      dispatch(removeKeyLession(key));
    } else {
      dispatch(addKeyLession(key));
      dispatch(addLessionSelected(lesson));
    }
  };

  const handleFinishSelect = () => {
    dispatch(updateLessionSelected());
    reduxStorage.setItem('lessionsSelected', JSON.stringify(lessionsSelected));
    reduxStorage.setItem(
      'keyLessionsSelected',
      JSON.stringify(keyLessionSelected),
    );
    navigate(SCREENS.MAIN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Enter delay={0} distance={12}>
          <Text style={styles.chooseText}>Choose challenge</Text>
        </Enter>
        <PressableScale
          style={styles.finishContainer}
          scaleTo={0.92}
          onPress={handleFinishSelect}>
          <Text style={styles.finishText}>{`Finish >`}</Text>
        </PressableScale>
      </View>
      <ScrollView style={styles.contentContainer}>
        {lessions.map((item, index) => (
          <LessionItem
            lession={item}
            key={item.lession_key}
            index={index}
            onSelect={() => handleSelectLession(item.lession_key, item)}
            isSelect={keyLessionSelected.indexOf(item.lession_key) >= 0}
          />
        ))}
        {lessions.length == 0 ? (<View><Spinner size="large" /></View>) : ''}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LessionTypeScreen;
