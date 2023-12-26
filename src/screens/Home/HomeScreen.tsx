import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
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
} from '@/store/lessions';
import {navigate} from '@/helpers/navigation';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [lessions, setLessions] = useState<LessionType[]>([]);

  const {lessionsSelected, keyLessionSelected} = useAppSelector(
    (state: StoreState) => state.LessionSlice,
  );

  const getInfo = () => {
    const subscriber = firestore()
      .collection('lessions')
      .onSnapshot(
        querySnapshot => {
          const users1: any = [];

          querySnapshot.forEach(documentSnapshot => {
            users1.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.data().lession_key,
            });
          });

          setLessions(users1);
          setLoading(false);
        },
        err => console.log('err', err),
      );

    return () => subscriber();
  };

  useEffect(() => {
    getInfo();
  }, []);

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
    navigate('PackScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.chooseText}>Choose challenge</Text>
        <TouchableOpacity
          style={styles.finishContainer}
          onPress={handleFinishSelect}>
          <Text style={styles.finishText}>{`Finish >`}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.contentContainer}>
        {lessions.map(item => (
          <LessionItem
            lession={item}
            key={item.lession_key}
            onSelect={() => handleSelectLession(item.lession_key, item)}
            isSelect={keyLessionSelected.indexOf(item.lession_key) >= 0}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    flex: 1,
    marginTop: 14,
    paddingTop: 7,
    paddingHorizontal: 16,
  },
  textContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chooseText: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Montserrat-Bold',
    color: '#000',
    textAlign: 'left',
  },
  finishContainer: {
    paddingVertical: 5,
    paddingLeft: 18,
    paddingRight: 9,
    backgroundColor: '#1873D3',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  finishText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Montserrat-Medium',
    color: '#fff',
    textAlign: 'left',
  },
  contentContainer: {
    width: '100%',
    marginTop: 21,
  },
});
export default HomeScreen;
