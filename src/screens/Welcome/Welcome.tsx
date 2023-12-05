import { Brand } from "@/components/molecules";
import { useState } from "react";

import { Text, View, Button, TextInput } from "react-native";

import { navigate } from "@/helper/navigation";

const WelcomeScreen = () => {
  const handleLogin = async () => {
    navigate("GetInfoScreen");
  };

  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          marginTop: 100,
        }}
      >
        <Brand height={80} width={80} />
      </View>
      <Text
        style={{
          marginTop: 50,
          fontSize: 30,
          fontWeight: "700",
        }}
      >
        Welcome!
      </Text>

      <Text
        style={{
          marginTop: 50,
          fontSize: 15,
          fontWeight: "400",
          marginHorizontal: 16,
        }}
      >
        Chúng tôi rất vui vì bạn đã quan tâm đến ứng dụng này. Chắc chắn bạn
        muốn nâng cấp sức khoẻ và tinh thần của mình. Hãy để chúng tôi giúp bạn,
        Seim sẽ là người bạn đồng hành và giúp bạn khoẻ hơn mỗi ngày.
      </Text>

      <View style={{ width: "100%", marginHorizontal: 16 }}>
        <Text
          style={{
            marginTop: 20,
            fontSize: 15,
            fontWeight: "400",
            marginHorizontal: 16,
          }}
        >
          Let's get started!
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#1675D6",
          width: 120,
          height: 45,
          borderRadius: 15,
          marginTop: 50,
          justifyContent: "center",
        }}
      >
        <Button onPress={handleLogin} title="Bắt đầu  >" color="white" />
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 17,
          flexWrap: "wrap",
          marginBottom: 32,
        }}
      ></View>
    </View>
  );
};

export default WelcomeScreen;
