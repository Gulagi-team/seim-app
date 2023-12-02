import { Brand } from "@/components/molecules";
import { useState } from "react";

import { Text, View, Button, TextInput } from "react-native";

import FacebookIcon from "@/assets/images/facebook.svg";
import GoogleIcon from "@/assets/images/google.svg";

const SignInScreen = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUserName = (txt: string) => {
    setUserName(txt);
  };

  const handlePassword = (txt: string) => {
    setPassword(txt);
  };
  const handleLogin = async () => {
    // console.log(data.payload);
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
          fontSize: 25,
          fontWeight: "400",
        }}
      >
        Login
      </Text>
      <View
        style={{
          backgroundColor: "#E6E6E6",
          width: 260,
          height: 40,
          borderRadius: 20,
          marginTop: 30,
        }}
      >
        <TextInput
          style={{ marginVertical: 10, marginLeft: 10 }}
          onChangeText={handleUserName}
          placeholder="Email or Username"
        />
      </View>

      <View
        style={{
          backgroundColor: "#E6E6E6",
          width: 260,
          height: 40,
          borderRadius: 20,
          marginTop: 15,
        }}
      >
        <TextInput
          style={{ marginVertical: 10, marginLeft: 10 }}
          secureTextEntry
          onChangeText={handlePassword}
          placeholder="Password"
        />
      </View>

      <View
        style={{
          backgroundColor: "#009ADA",
          width: 120,
          height: 40,
          borderRadius: 20,
          marginTop: 25,
        }}
      >
        <Button onPress={handleLogin} title="Login" color="white" />
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 17,
          flexWrap: "wrap",
          marginBottom: 32,
        }}
      >
        <FacebookIcon
          style={{ marginRight: 15, marginBottom: 15 }}
          onPress={handleLogin}
        />

        <GoogleIcon
          style={{ marginRight: 15, marginBottom: 15 }}
          // onPress={callActionWithNetworkConnection(onLoginViaGoogle)}
        />
      </View>
    </View>
  );
};

export default SignInScreen;
