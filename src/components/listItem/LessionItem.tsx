import IconCheck from '@/assets/icons/icon_checkmark.svg';
import {Habit} from '@/types/colection';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {iconMap} from '@/helpers/icon';
import React from 'react';
interface Props {
  lession: Habit;
  key: string;
  onSelect?: () => void;
  isSelect: boolean;
}

const LessionItem = (props: Props) => {
  const {lession, onSelect, isSelect} = props;

  const ICON = iconMap[lession.habit.icon as keyof typeof iconMap];
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={{
        ...styles.container,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 10,
        }}>
        {typeof ICON === 'function' ? <ICON /> : ICON}

        <View style={{marginLeft: 12}}>
          <Text style={styles.titleText}>{lession.habit.name}</Text>
        </View>
      </View>

      <View
        style={{
          borderColor: 'black',
          borderWidth: 1,
          width: 25,
          height: 25,
          borderRadius: 5,
          marginRight: 20,
          marginVertical: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {isSelect && <IconCheck />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 85,
    flex: 1,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  textContainer: {width: '100%'},
  titleText: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'Montserrat-Medium',
    color: '#000',
    textAlign: 'left',
  },
});
export default LessionItem;
