import { ScrollView, Text, TouchableOpacity, View, } from 'react-native';
 import { SafeAreaView } from 'react-native-safe-area-context';
 import { useEffect, useState } from 'react';
 import { LessionType } from '@/types/colection';
 import LessionItem from '@/components/listItem/LessionItem';
 import { StoreState, reduxStorage, useAppSelector } from '@/store';
 import { useDispatch } from 'react-redux';
 import { addKeyLession, removeKeyLession, addLessionSelected,updateLessionSelected, fetchLessions,} from '@/store/lessions';
 import { navigate } from '@/helpers/navigation';
 import { ThunkDispatch } from '@reduxjs/toolkit';
 import { Spinner } from '@gluestack-ui/themed';
import { styles } from './LessionTypeScreen.styles';
 const LessionTypeScreen = () => {
   const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
 
   const [loading, setLoading] = useState(true);
 
   const { lessions, lessionsSelected, status, keyLessionSelected } = useAppSelector(
     (state: StoreState) => state.LessionSlice,
   );
 
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
     navigate('HomeScreen');
   };
 
   return (
     <SafeAreaView style={styles.container}>
       <View style={styles.textContainer}>
         <Text style={styles.chooseText}>Choose challenge</Text>
         {/* <TouchableOpacity
           style={styles.finishContainer}
           onPress={handleFinishSelect}>
           <Text style={styles.finishText}>{`Finish >`}</Text>
         </TouchableOpacity> */}
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
         {lessions.length == 0 ? (<View><Spinner size="large" /></View>) : ''}
       </ScrollView>
     </SafeAreaView>
   );
 };
 
 export default LessionTypeScreen;
 