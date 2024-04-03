import React, {useState} from 'react';
import {View, TextInput, StyleProp, ViewStyle} from 'react-native';
import {SearchIcon, Icon} from '@gluestack-ui/themed';
import {styles} from './SearchInput.styles';

interface Props {
  style?: StyleProp<ViewStyle>;
  label?: string;
  value?: string;
  onChange: (value: string) => void;
}
const Search = (props: Props) => {
  const {style, label = '', value = '', onChange} = props;
  const [text, changeText] = useState(value);

  const onChangeText = (text: string) => {
    onChange(text);
    changeText(text);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.horizontal}>
        <Icon as={SearchIcon} size="sm" />
        <TextInput
          style={styles.input}
          editable
          focusable
          textAlign="left"
          inputMode="text"
          value={text}
          onChangeText={onChangeText}
          placeholder={label}
        />
      </View>
    </View>
  );
};

export default Search;
