import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  // TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Logo from '@/assets/images/logo.png';
// import IconBack from '@/assets/icons/icon_back.svg';
// import { ArrowLeftIcon, Icon } from '@gluestack-ui/themed';
// import { useNavigation } from '@react-navigation/core';

export interface HeaderProps {
  style?: StyleProp<ViewStyle>;
  // title?: string | React.ReactNode;
  renderLogo?: boolean;
  canGoBack?: boolean;
  handleGoBack?: () => void;
  backStyle?: StyleProp<ViewStyle>;
  rightContent?: React.ReactNode;
  rightContentStyle?: StyleProp<ViewStyle>;
}

const HeaderMain = ({
  style,
  renderLogo,
  // canGoBack = true,
  // handleGoBack,
  // backStyle,
  rightContent,
  rightContentStyle,
}: HeaderProps) => {
  // const navigation = useNavigation();

  return (
    <View style={[styles.container, style]}>
      <View style={{flexDirection: 'row'}}>
        {renderLogo && (
          <Image
            testID={'logo-header'}
            style={styles.logo}
            source={Logo}
            resizeMode={'contain'}
          />
        )}
      </View>
      <Text style={styles.title}>Seim</Text>
      <View style={[styles.rightContent, rightContentStyle]}>
        {rightContent}
      </View>
    </View>
  );
};

export default HeaderMain;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 'auto',
    padding: 14,
    minHeight: 40,
  },
  back: {
    position: 'absolute',
    left: 10,
  },
  title: {
    marginStart: 5,
    letterSpacing: 2,
    fontSize: 22,
    color: 'black',
    fontWeight: '500',
  },
  logo: {
    width: 34,
    height: 34,
  },
  rightContent: {
    position: 'absolute',
    right: 10,
  },
});
