import React from 'react';
import {ImageBackground, StyleProp, Text, View, ViewStyle} from 'react-native';
import Toast, {ToastConfig} from 'react-native-toast-message';

import CheckIcon from '@/assets/icons/icon_success.svg';
import ErrorIcon from '@/assets/icons/icon_error.svg';
import {deviceWidth} from '@/constants/layout';

interface Option {
  props: {
    message: string;
    width?: number;
    onPress?: () => void;
  };
}

export const getToastConfig = (style?: StyleProp<ViewStyle>) => {
  return {
    success: (option: Option) => (
      <ToastComponent
        isSuccess={true}
        icon={<CheckIcon />}
        message={
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              fontFamily: 'Inter-Medium',
              color: '#fff',
              textAlign: 'left',
              width: '85%',
            }}>
            {option.props.message?.trim() || ''}
          </Text>
        }
        style={style}
        width={option.props.width}
      />
    ),
    error: (option: Option) => (
      <ToastComponent
        isSuccess={false}
        icon={<ErrorIcon />}
        message={
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              fontFamily: 'Inter-Medium',
              color: '#fff',
              textAlign: 'left',
              width: '85%',
            }}>
            {option.props.message?.trim() || ''}
          </Text>
        }
        style={style}
        width={option.props.width}
      />
    ),
    info: (option: Option) => (
      <ToastComponent
        isSuccess={true}
        message={
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              fontFamily: 'Inter-Medium',
              color: '#fff',
              textAlign: 'left',
              width: '85%',
            }}>
            {option.props.message?.trim() || ''}
          </Text>
        }
        style={style}
        width={option.props.width}
      />
    ),
  };
};
interface Props {
  isSuccess: boolean;
  icon?: React.ReactNode;
  message: React.ReactNode;
  style: StyleProp<ViewStyle>;
  width?: number;
}

const ToastComponent = (props: Props) => {
  const {isSuccess, icon, message, style, width} = props;

  return (
    <View
      style={[
        {
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 12,
          width: width || deviceWidth * 0.8,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: isSuccess ? '#4CAF50' : '#EF4444',
          // borderColor: '#0d9488',
          // borderWidth: 1,
          // height: 'auto',
        },
        style,
      ]}>
      {icon && <View style={{marginRight: 12}}>{icon}</View>}
      {message}
    </View>
  );
};

const ToastContainer = ({config}: {config: ToastConfig}) => {
  return <Toast config={config} />;
};

export default ToastContainer;
