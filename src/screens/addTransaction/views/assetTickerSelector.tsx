import React, { Dispatch, SetStateAction, useMemo, useRef } from "react";
import { Dimensions, StyleSheet, Text, Pressable, View } from "react-native";
import { BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import BottomsheetBackdrop from "../../../components/bottomsheetBackdrop";
import { CryptoInfo } from "../../../types";
import AssetInfoItem from "../../../components/assetInfoItem";
import { availableCryptosList } from "../../../utils/availableCryptosList";
import { getInfoAboutCrypto } from "../../../utils/getInfoAboutCrypto";

export const AssetTickerSelector = ({
  selectedAssetTicker,
  setSelectedAssetTicker,
  onSelectorOpen,
}: {
  selectedAssetTicker: string;
  setSelectedAssetTicker: Dispatch<SetStateAction<string>>;
  onSelectorOpen: () => void;
}) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const assetName = useMemo(() => {
    const info = getInfoAboutCrypto(selectedAssetTicker);

    return info?.name || "";
  }, [selectedAssetTicker]);

  return (
    <>
      <Pressable
        style={styles.container}
        onPress={() => {
          onSelectorOpen();
          bottomSheetRef.current?.present();
        }}
      >
        <View>
          <Text style={styles.assetTicker}>{selectedAssetTicker}</Text>
          <Text style={styles.name}>{assetName}</Text>
        </View>
        <MaterialIcons name="expand-more" size={24} color="black" />
      </Pressable>
      <BottomSheetModal
        ref={bottomSheetRef}
        maxDynamicContentSize={Dimensions.get("window").height * 0.8}
        backdropComponent={(props) => (
          <BottomsheetBackdrop
            {...props}
            animatedIndex={props.animatedIndex}
            ref={bottomSheetRef}
          />
        )}
      >
        <BottomSheetFlatList
          data={availableCryptosList}
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: CryptoInfo) => item.assetTicker}
          ListFooterComponent={() => <View style={styles.footer} />}
          renderItem={({ item }: { item: CryptoInfo }) => (
            <AssetInfoItem
              assetTicker={item.assetTicker}
              assetName={item.name}
              onPress={() => {
                setSelectedAssetTicker(item.assetTicker);
                bottomSheetRef.current?.dismiss();
              }}
            />
          )}
        />
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    height: 0.7 * Dimensions.get("window").height,
    paddingHorizontal: 16,
  },
  footer: {
    height: 50,
  },
  container: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
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
});
