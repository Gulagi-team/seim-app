import { useEffect } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/theme";
import { Brand } from "@/components/molecules";
import { SafeScreen } from "@/components/template";

import type { ApplicationScreenProps } from "@/types/navigation";

import WelcomeBottom from "@/assets/images/welcomeBottom.png";

function Startup({ navigation }: ApplicationScreenProps) {
  const { layout, gutters, fonts } = useTheme();
  const { t } = useTranslation(["startup"]);

  const init = async () => {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(true);
      }, 2000)
    );
    navigation.reset({
      index: 0,
      routes: [{ name: "SignIn" }],
    });
  };

  useEffect(() => {
    init();
  }, []);

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
        <ActivityIndicator size="large" style={[gutters.marginVertical_24]} />
        <Image
          testID={"welcome-bottom"}
          style={{
            position: "absolute",
            width: "100%",
            height: "30%",
            bottom: 0,
          }}
          source={WelcomeBottom}
          resizeMode={"stretch"}
        />
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
}

export default Startup;
