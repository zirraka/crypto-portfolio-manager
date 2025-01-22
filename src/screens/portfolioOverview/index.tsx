import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Animated, Dimensions } from "react-native";
import { GraphPoint } from "react-native-graph";
import PieChart, { Slice } from "react-native-pie-chart";
import {
  DEFAULT_DATA_FOR_PIE_CHART,
  getPieChartData,
} from "../../utils/pieChart";
import { getAllCoinsPreview } from "../../utils/getAllCoinsPreview";
import { CoinPreviewInfo, NavigationProps } from "../../types";
import { getHistoricalData } from "../../utils/getHistoricalData";
import ScreenHeader from "../../components/screenHeader";
import HistoryGraphWithBalance from "./views/historyGraphWithBalance";
import NoTransactions from "./views/noTransactions";
import CoinsHeld from "./views/coinsHeld";
import ScreenWrapper from "../../components/screenWrapper";
import PlusButton from "./views/plusButton";

function PortfolioOverview({
  navigation,
}: NavigationProps<"PortfolioOverview">) {
  const [pieChartData, setPieChartData] = useState<Slice[]>(
    DEFAULT_DATA_FOR_PIE_CHART
  );
  const [allCoins, setAllCoins] = useState<CoinPreviewInfo[]>([]);
  const [historyData, setHistoryData] = useState<GraphPoint[]>([]);

  const selectedGraphPoint = useRef(
    new Animated.ValueXY({ x: 0, y: 0 })
  ).current;

  const historySheetMaxHeight = useMemo(() => {
    return Math.max(
      Math.min(
        allCoins.length * 70 + 90,
        0.8 * Dimensions.get("window").height
      ),
      0.5 * Dimensions.get("window").height
    );
  }, [allCoins]);

  const navigateToAddTransaction = useCallback(
    () => navigation.navigate("AddTransaction"),
    []
  );

  const navigateToCoinTransactions = useCallback((assetTicker: string) => {
    navigation.navigate("CoinTransactions", { assetTicker });
  }, []);

  useEffect(() => {
    getPieChartData().then((data) => setPieChartData(data));
    getAllCoinsPreview().then((data) => setAllCoins(data));
    getHistoricalData().then((data) => setHistoryData(data));
  }, []);

  return (
    <ScreenWrapper>
      <ScreenHeader title="Portfolio Overview" />
      <PieChart
        widthAndHeight={0.2 * Dimensions.get("window").height}
        series={pieChartData}
        cover={0.45}
        padAngle={0.01}
      />
      {historyData && historyData.length > 1 ? (
        <HistoryGraphWithBalance
          historyData={historyData}
          selectedGraphPoint={selectedGraphPoint}
        />
      ) : (
        <NoTransactions navigateToAddTransaction={navigateToAddTransaction} />
      )}
      <CoinsHeld
        allCoins={allCoins}
        navigateToCoinTransactions={navigateToCoinTransactions}
        historySheetMaxHeight={historySheetMaxHeight}
      />
      <PlusButton
        onPress={navigateToAddTransaction}
        isVisible={allCoins.length > 0}
      />
    </ScreenWrapper>
  );
}

export default PortfolioOverview;
