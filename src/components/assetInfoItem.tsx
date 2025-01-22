import { Pressable, StyleSheet, Text, View } from "react-native";

function AssetInfoItem({
  assetTicker,
  assetName,
  mainInfo,
  secondaryInfo,
  onPress,
  borderColor,
}: {
  assetTicker: string;
  assetName: string;
  mainInfo?: string;
  secondaryInfo?: string;
  onPress?: () => void;
  borderColor?: string;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.container, { borderColor }]}>
      <View>
        <Text style={styles.assetTicker}>{assetTicker}</Text>
        <Text style={styles.name}>{assetName}</Text>
      </View>
      <View style={styles.amounts}>
        {mainInfo && (
          <Text style={styles.amount} numberOfLines={1}>
            {mainInfo}
          </Text>
        )}
        {secondaryInfo && (
          <Text style={styles.amount} numberOfLines={1}>
            {secondaryInfo}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  assetTicker: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  name: {
    fontSize: 14,
    color: "#777",
    fontWeight: "400",
  },
  amounts: {
    alignItems: "flex-end",
    width: "60%",
  },
  amount: {
    fontSize: 14,
    color: "#000",
    fontWeight: "400",
  },
});

export default AssetInfoItem;
