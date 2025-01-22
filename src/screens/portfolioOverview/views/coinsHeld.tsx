import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { CoinPreviewInfo } from "../../../types";
import AssetInfoItem from "../../../components/assetInfoItem";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";

function CoinsHeld({
  allCoins,
  navigateToCoinTransactions,
  historySheetMaxHeight,
}: {
  allCoins: CoinPreviewInfo[];
  navigateToCoinTransactions: (assetTicker: string) => void;
  historySheetMaxHeight: number;
}) {
  if (allCoins.length === 0) {
    return null;
  }

  return (
    <BottomSheet
      snapPoints={[
        0.3 * Dimensions.get("window").height,
        historySheetMaxHeight,
      ]}
      enableDynamicSizing={false}
      backgroundStyle={styles.bottomSheetBackground}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          animatedIndex={props.animatedIndex}
          pressBehavior="collapse"
        />
      )}
    >
      <BottomSheetFlatList
        data={allCoins}
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: CoinPreviewInfo) => item.assetTicker}
        ListFooterComponent={<View style={styles.listFooterComponent} />}
        renderItem={({ item }: { item: CoinPreviewInfo }) => (
          <AssetInfoItem
            assetTicker={item.assetTicker}
            assetName={item.name}
            mainInfo={`${item.quantity} ${item.assetTicker}`}
            secondaryInfo={`${item.value} USD`}
            onPress={() => navigateToCoinTransactions(item.assetTicker)}
          />
        )}
      />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
  },
  listFooterComponent: {
    height: 80,
  },
  bottomSheetBackground: {
    borderWidth: 1,
    borderColor: "#808080",
  },
});

export default CoinsHeld;
