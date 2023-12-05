import { Brand } from "@/components/molecules";
import { useState } from "react";

import {
  Text,
  View,
  Button,
  TextInput,
  Pressable,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";

import LogoSeim from "@/assets/images/logoSeim.png";
import { navigate } from "@/helper/navigation";
import Header from "@/components/Header";
import { SafeScreen } from "@/components/template";

import WelcomeBottom from "@/assets/images/wel.svg";

const GetInfoStep2Content = () => {
  const [gender, setGender] = useState<string>("");

  return (
    <View
      style={{
        alignItems: "center",
        height: "100%",
        width: "100%",
        paddingHorizontal: 16,
        marginTop: 24,
      }}
    >
      <View style={styles.question}>
        <Text style={styles.howOldAre1}>What’s your gender?</Text>
        <Text style={styles.letUsKnow1}>
          Let us know more about you, so we can craft a personalized experience
          just for you.
        </Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => setGender("en")}
          style={{
            ...styles.options,
            backgroundColor: gender === "en" ? "#1b9cfc" : "#ffffff",
          }}
        >
          <Text
            style={{
              ...styles.optionContent,
              color: gender === "en" ? "#fff" : "black",
            }}
          >
            English
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGender("vn")}
          style={{
            ...styles.options,
            backgroundColor: gender === "vn" ? "#1b9cfc" : "#ffffff",
          }}
        >
          <Text
            style={{
              ...styles.optionContent,
              color: gender === "vn" ? "#fff" : "black",
            }}
          >
            Tiếng Việt
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGender("fr")}
          style={{
            ...styles.options,
            backgroundColor: gender === "fr" ? "#1b9cfc" : "#ffffff",
          }}
        >
          <Text
            style={{
              ...styles.optionContent,
              color: gender === "fr" ? "#fff" : "black",
            }}
          >
            France
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGender("por")}
          style={{
            ...styles.options,
            backgroundColor: gender === "por" ? "#1b9cfc" : "#ffffff",
          }}
        >
          <Text
            style={{
              ...styles.optionContent,
              color: gender === "por" ? "#fff" : "black",
            }}
          >
            Portugal
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  question: {
    width: "100%",
    paddingBottom: 16,
  },
  howOldAre1: {
    fontSize: 20,
    letterSpacing: 0,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
    color: "#171717",
    textAlign: "left",
  },
  letUsKnow1: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#525252",
    marginTop: 8,
    textAlign: "left",
    alignSelf: "stretch",
  },
  content: {
    width: "100%",
    height: 100,
    // flex: 1,
    marginTop: 22,
  },
  options: {
    // backgroundColor: "#1b9cfc",
    width: "100%",
    height: 64,
    borderRadius: 15,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  optionContent: {
    fontSize: 16,
    letterSpacing: 0,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    // color: "#fff",
    textAlign: "left",
    // backgroundColor: "red",
  },
});

export default GetInfoStep2Content;
