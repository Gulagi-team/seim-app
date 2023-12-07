import { Brand } from "@/components/molecules";
import { StoreState, useAppSelector } from "@/store";
import { updateOld } from "@/store/userInfo";
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
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

const GetInfoStep3Content = () => {
  const dispatch = useDispatch();
  const old = useAppSelector((state: StoreState) => state.userInfo.old);

  return (
    <View style={styles.container}>
      <View style={styles.question}>
        <Text style={styles.howOldAre1}>How old are you?</Text>
        <Text style={styles.letUsKnow1}>
          Let us know more about you, so we can craft a personalized experience
          just for you.
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <TouchableOpacity
          onPress={() => dispatch(updateOld("under18"))}
          style={{
            ...styles.options,
            backgroundColor: old === "under18" ? "#1b9cfc" : "#ffffff",
          }}
        >
          <Text
            style={{
              ...styles.optionContent,
              color: old === "under18" ? "#fff" : "black",
            }}
          >
            Under 18
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(updateOld("18-23"))}
          style={{
            ...styles.options,
            backgroundColor: old === "18-23" ? "#1b9cfc" : "#ffffff",
          }}
        >
          <Text
            style={{
              ...styles.optionContent,
              color: old === "18-23" ? "#fff" : "black",
            }}
          >
            18 - 23
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(updateOld("24-29"))}
          style={{
            ...styles.options,
            backgroundColor: old === "24-29" ? "#1b9cfc" : "#ffffff",
          }}
        >
          <Text
            style={{
              ...styles.optionContent,
              color: old === "24-29" ? "#fff" : "black",
            }}
          >
            24 - 29
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(updateOld("30-39"))}
          style={{
            ...styles.options,
            backgroundColor: old === "30-39" ? "#1b9cfc" : "#ffffff",
          }}
        >
          <Text
            style={{
              ...styles.optionContent,
              color: old === "30-39" ? "#fff" : "black",
            }}
          >
            30 - 39
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(updateOld("40-49"))}
          style={{
            ...styles.options,
            backgroundColor: old === "40-49" ? "#1b9cfc" : "#ffffff",
          }}
        >
          <Text
            style={{
              ...styles.optionContent,
              color: old === "40-49" ? "#fff" : "black",
            }}
          >
            40 - 49
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(updateOld("50-59"))}
          style={{
            ...styles.options,
            backgroundColor: old === "50-59" ? "#1b9cfc" : "#ffffff",
          }}
        >
          <Text
            style={{
              ...styles.optionContent,
              color: old === "50-59" ? "#fff" : "black",
            }}
          >
            50 - 59
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(updateOld("60-69"))}
          style={{
            ...styles.options,
            backgroundColor: old === "60-69" ? "#1b9cfc" : "#ffffff",
          }}
        >
          <Text
            style={{
              ...styles.optionContent,
              color: old === "60-69" ? "#fff" : "black",
            }}
          >
            60 - 69
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
