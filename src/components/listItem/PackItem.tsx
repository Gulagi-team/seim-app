import {iconMap} from '@/helpers/icon';
import {StoreState, useAppSelector} from '@/store';
import {FONT_SIZE, POPPINS_MEDIUM} from '@/theme';
import {Habit} from '@/types/colection';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
interface Props {
  lession: Habit;
  key: string;
  isCompleted?: boolean;
}

const PackItem = (props: Props) => {
  const {
    lession: {habit},
  } = props;
  console.log('props.isCompleted', props.isCompleted);
  const {containerColor, textColor, textOutstandingColor} = useAppSelector(
    (state: StoreState) => state.ThemeSlice,
  );

  const ICON = iconMap[habit.icon as keyof typeof iconMap];

  return (
    <View
      // onPress={onSelect}
      style={{
        ...styles.container,
        backgroundColor: containerColor,
        shadowColor: textOutstandingColor,
      }}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.iconHabit}>
          {typeof ICON === 'function' ? <ICON /> : ICON}
        </View>

        <View style={{marginTop: 12, marginLeft: 12}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{...styles.titleText, color: textColor}}>
              {habit.name}
            </Text>
            {props.isCompleted && (
              <Text style={{color: 'green', fontSize: 12, marginLeft: 10}}>
                Completed
              </Text>
            )}
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 5,
            }}>
            {habit &&
              habit.tasks &&
              habit.tasks.map((task, index) => {
                const ICONTask = iconMap[task.icon as keyof typeof iconMap];

                return (
                  <View key={index} style={styles.iconTask}>
                    {typeof ICONTask === 'function' ? <ICONTask /> : ICONTask}
                  </View>
                );
              })}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 85,
    flex: 1,
    marginBottom: 10,
    borderRadius: 10,

    elevation: 5,
  },
  textContainer: {width: '100%'},
  titleText: {
    fontSize: FONT_SIZE.small1,
    fontWeight: '500',
    fontFamily: POPPINS_MEDIUM,
    textAlign: 'left',
  },
  iconTask: {
    transform: [{scale: 0.8}],
  },
  iconHabit: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    transform: [{scale: 1.2}],
  },
});
export default PackItem;
