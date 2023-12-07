import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";

import Header from "@/components/Header";

const HomeScreen = () => {
  const { layout, gutters, fonts } = useTheme();

  return (
    <SafeScreen>
      <Header renderLogo={true} canGoBack={false} />
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.choseText}>Choose challenge</Text>
        </View>
      </View>
    </SafeScreen>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    flex: 1,
    marginTop: 24,
    marginHorizontal: 16,
  },
  textContainer: { width: "100%" },
  choseText: {
    fontSize: 23,
    fontWeight: "700",
    fontFamily: "Montserrat-Bold",
    color: "#000",
    textAlign: "left",
  },
});
export default HomeScreen;
