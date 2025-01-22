import { getAllCoinTotalAmounts } from "./storage";
import { CoinPreviewInfo } from "../types";
import { getInfoAboutCrypto } from "./getInfoAboutCrypto";

export const getAllCoinsPreview = async (): Promise<CoinPreviewInfo[]> => {
  const totalAmounts = await getAllCoinTotalAmounts();

  const series = totalAmounts.map((totalAmount) => {
    const info = getInfoAboutCrypto(totalAmount.assetTicker);
    return {
      id: totalAmount.id,
      assetTicker: totalAmount.assetTicker,
      name: info?.name || "",
      quantity: totalAmount.quantity,
      value: totalAmount.quantity * totalAmount.pricePerCoinInUSD || 0,
    } as CoinPreviewInfo;
  });

  return series;
};
