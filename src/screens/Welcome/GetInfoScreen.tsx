import { Brand } from "@/components/molecules";
import { useRef, useState } from "react";

import {
  Text,
  View,
  Button,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Header from "@/components/Header";
import { SafeScreen } from "@/components/template";

import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import GetInfoStep1Content from "./components/GetInfoStep1";
import GetInfoStep2Content from "./components/GetInfoStep2";
import PaginationItem from "@/components/pagination/Pagination";
import { navigate, navigateReset } from "@/helper/navigation";
import GetInfoStep3Content from "./components/GetInfoStep3";
import GetInfoStep4Content from "./components/GetInfoStep4";
import GetInfoStep5Content from "./components/GetInfoStep5";

const GetInfoScreen = () => {
  const width = Dimensions.get("window").width;
  const [idxContent, setIdxContent] = useState<number>(0);
  const ref = useRef<ICarouselInstance>(null);

  const renderRightHeader = () => {
    return (
      <TouchableOpacity onPress={() => navigateReset("HomeScreen")}>
        <Text style={styles.skip}>Skip</Text>
      </TouchableOpacity>
    );
  };

  const dataRender = [0, 1, 2, 3, 4];

  const renderFunction = ({ item, index }: any) => {
    switch (item) {
      case 0:
        return <GetInfoStep1Content />;
      case 1:
        return <GetInfoStep2Content />;
      case 2:
        return <GetInfoStep3Content />;
      case 3:
        return <GetInfoStep4Content />;
      default:
        return <GetInfoStep5Content />;
    }
  };

  return (
    <SafeScreen>
      <Header
        renderLogo={true}
        handleGoBack={() => ref.current?.prev()}
        rightContent={renderRightHeader()}
      ></Header>
      <View style={styles.container}>
        <Carousel
          ref={ref}
          loop={false}
          width={width}
          enabled={false}
          data={dataRender}
          onSnapToItem={(index) => setIdxContent(index)}
          renderItem={renderFunction}
        />
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.paginationContainer}>
          {dataRender.map((backgroundColor, index) => {
            return (
              <PaginationItem
                index={index}
                key={index}
                animValue={idxContent}
                length={dataRender.length}
              />
            );
          })}
        </View>
        <TouchableOpacity
          onPress={() => ref.current?.next()}
          style={styles.continueContent}
        >
          <Text style={styles.continue}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", width: "100%", flex: 1 },
  skip: {
    fontWeight: "500",
    fontFamily: "Inter-Medium",
    color: "#262626",
    textAlign: "left",
    fontSize: 14,
  },
  footerContainer: { height: 100, width: "100%", paddingVertical: 16 },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
    alignSelf: "center",
  },
  continueContent: {
    marginTop: 16,
    borderRadius: 24,
    backgroundColor: "#1b9cfc",
    width: 250,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  continue: {
    fontSize: 14,
    letterSpacing: 0,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
    color: "#fff",
    textAlign: "left",
  },
});

export default GetInfoScreen;
