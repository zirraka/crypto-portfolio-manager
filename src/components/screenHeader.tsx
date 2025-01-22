import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const ScreenHeader = ({
  title,
  onPressBack,
}: {
  title: string;
  onPressBack?: () => void;
}) => {
  return (
    <View style={styles.container}>
      {onPressBack && (
        <Pressable onPress={onPressBack}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </Pressable>
      )}
      <Text style={styles.text}>{title}</Text>
      {onPressBack && <View style={styles.iconPlaceholder} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 16,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    width: Dimensions.get("window").width - 80,
  },
  iconPlaceholder: {
    width: 24,
  },
});

export default ScreenHeader;
