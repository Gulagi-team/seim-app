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

const GetInfoStep3Content = () => {
  const [gender, setGender] = useState<string>("");

  return (
    <View style={styles.container}>
      <View style={styles.question}>
        <Text style={styles.howOldAre1}>How old are you?</Text>
        <Text style={styles.letUsKnow1}>
          Let us know more about you, so we can craft a personalized experience
          just for you.
        </Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => setGender("under18")}
          style={{
            ...styles.options,
            backgroundColor: gender === "under18" ? "#1b9cfc" : "#ffffff",
          }}
        >
          <Text
            style={{
              ...styles.optionContent,
              color: gender === "under18" ? "#fff" : "black",
            }}
          >
            Under 18
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGender("18-23")}
          style={{
            ...styles.options,
            backgroundColor: gender === "18-23" ? "#1b9cfc" : "#ffffff",
          }}
        >
          <Text
            style={{
              ...styles.optionContent,
              color: gender === "18-23" ? "#fff" : "black",
            }}
          >
            18 - 23
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGender("24-29")}
          style={{
            ...styles.options,
            backgroundColor: gender === "24-29" ? "#1b9cfc" : "#ffffff",
          }}
        >
          <Text
            style={{
              ...styles.optionContent,
              color: gender === "24-29" ? "#fff" : "black",
            }}
          >
            24 - 29
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGender("30-39")}
          style={{
            ...styles.options,
            backgroundColor: gender === "30-39" ? "#1b9cfc" : "#ffffff",
          }}
        >
          <Text
            style={{
              ...styles.optionContent,
              color: gender === "30-39" ? "#fff" : "black",
            }}
          >
            30 - 39
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGender("40-49")}
          style={{
            ...styles.options,
            backgroundColor: gender === "40-49" ? "#1b9cfc" : "#ffffff",
          }}
        >
          <Text
            style={{
              ...styles.optionContent,
              color: gender === "40-49" ? "#fff" : "black",
            }}
          >
            40 - 49
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGender("50-59")}
          style={{
            ...styles.options,
            backgroundColor: gender === "50-59" ? "#1b9cfc" : "#ffffff",
          }}
        >
          <Text
            style={{
              ...styles.optionContent,
              color: gender === "50-59" ? "#fff" : "black",
            }}
          >
            50 - 59
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGender("60-69")}
          style={{
            ...styles.options,
            backgroundColor: gender === "60-69" ? "#1b9cfc" : "#ffffff",
          }}
        >
          <Text
            style={{
              ...styles.optionContent,
              color: gender === "60-69" ? "#fff" : "black",
            }}
          >
            60 - 69
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 24,
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
    // flexDirection: "row",
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

export default GetInfoStep3Content;
