import { availableCryptosList } from "./availableCryptosList";

export const getInfoAboutCrypto = (assetTicker: string) => {
  return availableCryptosList.find(
    (asset) => asset.assetTicker === assetTicker
  );
};
