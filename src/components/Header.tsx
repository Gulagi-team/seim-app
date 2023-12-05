import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { useTheme } from "@/theme";

import Logo from "@/assets/images/self.png";
import IconBack from "@/assets/icons/icon-back.svg";

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
  // const playSound = usePlaySound();
  const navigation = useNavigation();
  const { variant } = useTheme();

  const renderTitle = () => {
    if (typeof title === "string") {
      return <Text style={styles.title}>{title}</Text>;
    }

    return title;
  };

  return (
    <View style={[styles.container, style]}>
      {canGoBack ? (
        <TouchableOpacity
          onPress={handleGoBack}
          style={[styles.back, backStyle]}
        >
          <IconBack />
        </TouchableOpacity>
      ) : null}

      {renderTitle()}

      {renderLogo && (
        <Image
          testID={"logo-header"}
          style={{
            // position: "absolute",
            width: 24,
            height: 24,
            // bottom: 0,
          }}
          source={Logo}
          resizeMode={"stretch"}
        />
      )}

      <View style={[styles.rightContent, rightContentStyle]}>
        {rightContent}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    // marginBottom: 8,
    marginHorizontal: 16,
    // backgroundColor: "red",
  },
  back: {
    position: "absolute",
    left: 0,
  },
  title: {
    color: "#FCFCFD",
    minHeight: 24,
  },
  rightContent: {
    position: "absolute",
    right: 0,
  },
});
