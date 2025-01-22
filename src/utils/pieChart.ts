import { Slice } from "react-native-pie-chart";
import { getAllCoinTotalAmounts } from "./storage";
import { getInfoAboutCrypto } from "./getInfoAboutCrypto";

export const DEFAULT_DATA_FOR_PIE_CHART = [
  { value: 1, color: "rgba(0,0,0,0.1)" },
];

export const getPieChartData = async (): Promise<Slice[]> => {
  const totalAmounts = await getAllCoinTotalAmounts();

  let hasAtLeastOneCoin = false;

  const series = totalAmounts.map((totalAmount) => {
    const info = getInfoAboutCrypto(totalAmount.assetTicker);
    if (totalAmount.quantity > 0) {
      hasAtLeastOneCoin = true;
    }
    return {
      value: totalAmount.quantity,
      color: info?.backgroundColor || "black",
      label: {
        text: totalAmount.assetTicker,
        fill: info?.textColor || "white",
      },
    };
  });

  return hasAtLeastOneCoin ? series : DEFAULT_DATA_FOR_PIE_CHART;
};
