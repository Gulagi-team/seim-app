import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLORS, POPPINS_MEDIUM} from '@/theme';
import Enter from '@/components/motion/Enter';
import PressableScale from '@/components/motion/PressableScale';

interface Props {
  label: string;
  selected: boolean;
  index: number;
  onPress: () => void;
}

// One answer button in the wizard. The rows arrive one after another and shrink
// under the finger, so picking an option feels like a real choice.
const OptionRow = ({label, selected, index, onPress}: Props) => (
  <Enter delay={110 + index * 55} distance={10} scaleFrom={0.97}>
    <PressableScale
      onPress={onPress}
      scaleTo={0.97}
      accessibilityRole="radio"
      accessibilityState={{selected}}
      style={[
        styles.option,
        {backgroundColor: selected ? COLORS.primary_A500 : '#ffffff'},
      ]}>
      <Text
        style={[
          styles.optionText,
          {color: selected ? '#fff' : 'black'},
        ]}>
        {label}
      </Text>
    </PressableScale>
  </Enter>
);

const styles = StyleSheet.create({
  option: {
    width: '100%',
    height: 64,
    borderRadius: 15,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
    letterSpacing: 0,
    fontWeight: '600',
    fontFamily: POPPINS_MEDIUM,
    textAlign: 'left',
  },
});

export default OptionRow;