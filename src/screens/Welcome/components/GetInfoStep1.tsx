import { Brand } from "@/components/molecules";
import { StoreState, useAppSelector } from "@/store";
import { InfoState, updateLanguage } from "@/store/userInfo";
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
import { useDispatch } from "react-redux";
const GetInfoStep1Content = () => {
  const dispatch = useDispatch();
  const language = useAppSelector(
    (state: StoreState) => state.userInfo.language
  );
  return (
    <View style={styles.container}>
      <View style={styles.question}>
        <Text style={styles.howOldAre1}>What’s your language?</Text>
        <Text style={styles.letUsKnow1}>
          Let us know more about you, so we can craft a personalized experience
          just for you.
        </Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => dispatch(updateLanguage("en"))}
          style={{
            ...styles.options,
            backgroundColor: language === "en" ? "#1b9cfc" : "#ffffff",
          }}
        >
          <Text
            style={{
              ...styles.optionContent,
              color: language === "en" ? "#fff" : "black",
            }}
          >
            English
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(updateLanguage("vn"))}
          style={{
            ...styles.options,
            backgroundColor: language === "vn" ? "#1b9cfc" : "#ffffff",
          }}
        >
          <Text
            style={{
              ...styles.optionContent,
              color: language === "vn" ? "#fff" : "black",
            }}
          >
            Tiếng Việt
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(updateLanguage("fr"))}
          style={{
            ...styles.options,
            backgroundColor: language === "fr" ? "#1b9cfc" : "#ffffff",
          }}
        >
          <Text
            style={{
              ...styles.optionContent,
              color: language === "fr" ? "#fff" : "black",
            }}
          >
            France
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(updateLanguage("por"))}
          style={{
            ...styles.options,
            backgroundColor: language === "por" ? "#1b9cfc" : "#ffffff",
          }}
        >
          <Text
            style={{
              ...styles.optionContent,
              color: language === "por" ? "#fff" : "black",
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
  container: {
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 24,
    flex: 1,
  },
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
    // height: 100,
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

export default GetInfoStep1Content;
