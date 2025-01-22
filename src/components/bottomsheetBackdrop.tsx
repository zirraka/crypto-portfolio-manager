import React from "react";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Pressable, StyleSheet } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const BottomsheetBackdrop = React.forwardRef(
  (
    { animatedIndex }: { animatedIndex: SharedValue<number> },
    ref: React.Ref<BottomSheetModal | null>
  ) => {
    const containerAnimatedStyle = useAnimatedStyle(() => ({
      opacity: interpolate(animatedIndex.value, [-1, 0], [0, 0.5]),
    }));

    return (
      <Animated.View style={[styles.container, containerAnimatedStyle]}>
        <Pressable
          style={styles.pressable}
          onPress={() => {
            if (typeof ref === "object") {
              ref?.current?.dismiss();
            }
          }}
        ></Pressable>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "black",
    width: "100%",
    height: "100%",
  },
  pressable: {
    flex: 1,
  },
});

export default BottomsheetBackdrop;
