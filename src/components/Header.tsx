import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import Logo from '@/assets/images/logo.png';
import IconBack from '@/assets/icons/icon_back.svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, POPPINS_BOLD} from '@/theme';
import {StoreState, useAppSelector} from '@/store';

export interface HeaderProps {
  style?: StyleProp<ViewStyle>;
  title?: string;
  renderLogo?: boolean;
  canGoBack?: boolean;
  handleGoBack?: () => void;
  backStyle?: StyleProp<ViewStyle>;
  rightContent?: React.ReactNode;
  rightContentStyle?: StyleProp<ViewStyle>;
}

const Header = ({
  style,
  title,
  renderLogo,
  canGoBack = true,
  handleGoBack,
  backStyle,
  rightContent,
  rightContentStyle,
}: HeaderProps) => {
  const navigation = useNavigation();

  const {
    isDarkMode,
    backgroundColor,
    containerColor,
    textColor,
    borderColor,
    borderSelectedColor,
  } = useAppSelector((state: StoreState) => state.ThemeSlice);

  return (
    <View style={[styles.container, style]}>
      {canGoBack ? (
        <TouchableOpacity
          onPress={handleGoBack}
          style={[styles.back, backStyle]}>
          <Icon name="arrow-back" style={{fontSize: 24, color: textColor}} />
        </TouchableOpacity>
      ) : null}
      <View style={{flexDirection: 'row'}}>
        {title && (
          <Text style={{...styles.title, color: textColor}}>{title}</Text>
        )}
        {renderLogo && (
          <Image
            testID={'logo-header'}
            style={{
              width: 34,
              height: 34,
            }}
            source={Logo}
            resizeMode={'contain'}
          />
        )}
      </View>

      <View style={[styles.rightContent, rightContentStyle]}>
        {rightContent}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    padding: 10,
    minHeight: 40,
  },
  back: {
    position: 'absolute',
    left: 14,
  },
  title: {
    fontFamily: POPPINS_BOLD,
    fontSize: 16,
    fontWeight: '600',
  },
  rightContent: {
    // position: 'absolute',
    // right: 0,
  },
});
