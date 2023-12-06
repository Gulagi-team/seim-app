import { useEffect } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/theme";
import { Brand } from "@/components/molecules";
import { SafeScreen } from "@/components/template";

import type { ApplicationScreenProps } from "@/types/navigation";

import WelcomeBottom from "@/assets/images/welcomeBottom.png";

const HomeScreen = () => {
  const { layout, gutters, fonts } = useTheme();

  return (
    <SafeScreen>
      <View
        style={[
          layout.flex_1,
          layout.col,
          layout.itemsCenter,
          layout.justifyCenter,
        ]}
      >
        <Brand />

        <Text
          style={{
            position: "absolute",
            // width: '100%',
            bottom: 15,
          }}
        >
          Develop by Gulagi
        </Text>
      </View>
    </SafeScreen>
  );
};

export default HomeScreen;
