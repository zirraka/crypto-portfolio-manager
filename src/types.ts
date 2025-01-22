import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export interface Transaction {
  id: string;
  date: string;
  type: "Buy" | "Sell";
  quantity: number;
  pricePerCoinInUSD: number;
  assetTicker: string;
}

export interface CoinTotalAmount {
  id: string;
  assetTicker: string;
  quantity: number;
  pricePerCoinInUSD: number;
}

export interface CryptoInfo {
  name: string;
  assetTicker: string;
  backgroundColor: string;
  textColor: string;
  fractionDigits: number;
}

export interface CoinPreviewInfo {
  id: string;
  assetTicker: string;
  name: string;
  quantity: number;
  value: number;
}

export type StackParamsList = {
  PortfolioOverview: undefined;
  CoinTransactions: { assetTicker: string };
  AddTransaction: undefined;
};

export interface NavigationProps<T extends keyof StackParamsList> {
  route: RouteProp<StackParamsList, T>;
  navigation: StackNavigationProp<StackParamsList, T>;
}
