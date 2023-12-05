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

import LogoSeim from "@/assets/images/logoSeim.png";
import { navigate } from "@/helper/navigation";
import Header from "@/components/Header";
import { SafeScreen } from "@/components/template";

import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import GetInfoStep1Content from "./components/GetInfoStep1";
import GetInfoStep2Content from "./components/GetInfoStep2";
import PaginationItem from "@/components/pagination/Pagination";

const GetInfoScreen = () => {
  const width = Dimensions.get("window").width;
  const [idxContent, setIdxContent] = useState<number>(0);
  const ref = useRef<ICarouselInstance>(null);
  const handleGoBack = () => {
    // navigate("GetInfoStep1");
    ref.current?.prev();
  };
  const handleGoNext = () => {
    // navigate("GetInfoStep1");
    ref.current?.next();
  };

  const dataRender = [0, 1, 2, 3, 4];

  const renderFunction = ({ item, index }: any) => {
    switch (item) {
      case 0:
        return <GetInfoStep1Content />;
      case 1:
        return <GetInfoStep2Content />;
      default:
        return <GetInfoStep1Content />;
    }
  };

  return (
    <SafeScreen>
      <Header renderLogo={true} handleGoBack={handleGoBack}></Header>
      <View style={{ alignItems: "center", width: "100%", flex: 1 }}>
        <Carousel
          ref={ref}
          loop={false}
          width={width}
          enabled={false}
          // height={600}
          // autoPlay={true}
          // style={{ backgroundColor: "gray" }}
          // next={handleGoNext(idxContent+1)}
          data={dataRender}
          // pagingEnabled={isPagingEnabled}
          // scrollAnimationDuration={1000}

          onSnapToItem={(index) => setIdxContent(index)}
          renderItem={renderFunction}
        />
      </View>
      <View style={{ height: 100, width: "100%", paddingVertical: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 100,
            alignSelf: "center",
          }}
        >
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
        <TouchableOpacity onPress={handleGoNext} style={styles.continueContent}>
          <Text style={styles.continue}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
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
