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
import { Picker } from "@react-native-picker/picker";
import { generateArray } from "@/helper/others";

const GetInfoStep5Content = () => {
  const [selectedWeight, setSelectedWeight] = useState(50);
  const [selectedWeight1, setSelectedWeight1] = useState(5);
  const [selectedLanguage, setSelectedLanguage] = useState("cm");

  const myArray: number[] = generateArray(40, 90);
  const myArray1: number[] = generateArray(0, 9);

  return (
    <View style={styles.container}>
      <View style={styles.question}>
        <Text style={styles.howOldAre1}>What’s your weight?</Text>
        <Text style={styles.letUsKnow1}>
          Let us know more about you, so we can craft a personalized experience
          just for you.
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedWeight}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedWeight(itemValue)
            }
            mode="dialog"
            itemStyle={styles.textContainer}
          >
            {myArray.map((item) => (
              <Picker.Item label={item.toString()} value={item} key={item} />
            ))}
          </Picker>
        </View>
        <Text style={styles.question2}>.</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedWeight1}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedWeight1(itemValue)
            }
            itemStyle={styles.textContainer}
          >
            {myArray1.map((item) => (
              <Picker.Item label={item.toString()} value={item} key={item} />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }
            itemStyle={styles.textContainer}
          >
            <Picker.Item label="kg" value="kg" />
            <Picker.Item label="lbs" value="lbs" />
          </Picker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    Weight: "100%",
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
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pickerContainer: { width: "30%", Weight: 200 },
  textContainer: { fontSize: 32, fontWeight: "700", fontFamily: "Inter-Bold" },
  question2: {
    fontSize: 32,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
    color: "#000",
    textAlign: "left",
  },
});

export default GetInfoStep5Content;
