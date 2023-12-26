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

export interface HeaderProps {
  style?: StyleProp<ViewStyle>;
  title?: string | React.ReactNode;
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

  return (
    <View style={[styles.container, style]}>
      {canGoBack ? (
        <TouchableOpacity
          onPress={handleGoBack}
          style={[styles.back, backStyle]}>
          {/* <Text style={styles.title}>a</Text> */}
          <IconBack />
        </TouchableOpacity>
      ) : (
        <View style={{width: 24}} />
      )}
      <View style={{flexDirection: 'row'}}>
        {/* <Text style={styles.title}>{'title?.toString()'}</Text> */}

        {renderLogo && (
          <Image
            testID={'logo-header'}
            style={{
              // position: "absolute",
              width: 24,
              height: 24,
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
    width: '99%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom: 8,
    paddingHorizontal: 16,
    // backgroundColor: 'red',
  },
  back: {
    // position: 'absolute',
    // left: 0,
  },
  title: {
    color: '#FCFCFD',
    minHeight: 24,
  },
  rightContent: {
    // position: 'absolute',
    // right: 0,
  },
});
