import { Dimensions, Pressable } from "react-native";
import AntDesignIcons from "@expo/vector-icons/AntDesign";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

function PlusButton({
  isVisible,
  onPress,
}: {
  isVisible: boolean;
  onPress: () => void;
}) {
  const insets = useSafeAreaInsets();

  if (!isVisible) {
    return null;
  }

  return (
    <LinearGradient
      colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.8)"]}
      style={{
        position: "absolute",
        zIndex: 1000,
        width: Dimensions.get("window").width,
        height: insets.bottom / 2 + 50,
        alignItems: "center",
        bottom: 0,
      }}
    >
      <Pressable onPress={onPress}>
        <AntDesignIcons name="pluscircle" size={50} />
      </Pressable>
    </LinearGradient>
  );
}

export default PlusButton;
