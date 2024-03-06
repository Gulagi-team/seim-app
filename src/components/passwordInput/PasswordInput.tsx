import React, {useCallback, useRef, useMemo, useState} from 'react';

import {View, StyleSheet, TextInput, Pressable} from 'react-native';
// import {COLORS, SPACING} from '@/theme/index';

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEyeOn from '@/assets/icons/icon_eye_on.svg';
import IconEyeOff from '@/assets/icons/icon_eye_off.svg';

export interface PasswordInputProps {
  placeholder: string;
  onChangeText?: (value: string) => void;
}

const PasswordInput = ({
  placeholder = 'Password',
  onChangeText,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => setShowPassword(!showPassword);
  return (
    <View style={[styles.container]}>
      <View style={styles.horizontal}>
        <TextInput
          secureTextEntry={!showPassword}
          placeholder={placeholder}
          onChangeText={onChangeText}
          placeholderTextColor={'#737373'}
        />
      </View>

      <Pressable onPress={handleTogglePassword}>
        {showPassword ? <IconEyeOn /> : <IconEyeOff />}
      </Pressable>
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    width: '100%',
    borderWidth: 0.5,
    // borderColor: COLORS.border_input,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  horizontal: {
    width: '80%',
  },
  icon: {
    fontSize: 25,
    top: 2,
  },
});
