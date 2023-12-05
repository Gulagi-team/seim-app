import * as React from "react";
import { View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const PaginationItem: React.FC<{
  index: number;
  length: number;
  animValue: number;
}> = (props) => {
  const { index, length, animValue } = props;
  const width = 8;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue,
            inputRange,
            outputRange,
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      style={{
        backgroundColor: "#e5e5e5",
        width,
        height: width,
        borderRadius: 50,
        overflow: "hidden",
        marginLeft: 8,
        transform: [
          {
            rotateZ: "0deg",
          },
        ],
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor: "#1b9cfc",
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

export default PaginationItem;
