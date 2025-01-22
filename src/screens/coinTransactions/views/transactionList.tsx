import { FlatList } from "react-native";
import { Transaction } from "../../../types";
import AssetInfoItem from "../../../components/assetInfoItem";
import { getInfoAboutCrypto } from "../../../utils/getInfoAboutCrypto";

function TransactionList({ transactions }: { transactions: Transaction[] }) {
  return (
    <FlatList
      style={{ width: "100%" }}
      data={transactions}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <AssetInfoItem
          assetTicker={item.assetTicker}
          assetName={getInfoAboutCrypto(item.assetTicker)?.name || ""}
          mainInfo={`${item.type === "Sell" ? "-" : ""} ${item.quantity} ${
            item.assetTicker
          }`}
          secondaryInfo={`${item.type === "Sell" ? "-" : ""} ${
            item.quantity * item.pricePerCoinInUSD
          } USD`}
          borderColor={item.type === "Sell" ? "red" : "green"}
        />
      )}
    />
  );
}

export default TransactionList;
