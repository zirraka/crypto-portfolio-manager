import React from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import { GraphPoint, LineGraph } from "react-native-graph";
import Balance from "./balance";

function HistoryGraphWithBalance({
  historyData,
  selectedGraphPoint,
}: {
  historyData: GraphPoint[];
  selectedGraphPoint: Animated.ValueXY;
}) {
  return (
    <>
      <Text style={styles.text}>Balance History</Text>
      <LineGraph
        points={historyData}
        onPointSelected={(p) =>
          selectedGraphPoint.setValue({ x: p.date.getTime(), y: p.value })
        }
        onGestureEnd={() => selectedGraphPoint.setValue({ x: 0, y: 0 })}
        color="#4484B2"
        animated
        style={styles.lineChart}
        enablePanGesture
        lineThickness={2}
        panGestureDelay={0}
      />
      <View style={styles.spacer} />
      <Balance
        selectedGraphPoint={selectedGraphPoint}
        balanceNow={historyData[historyData.length - 1].value}
      />
    </>
  );
}

const styles = StyleSheet.create({
  lineChart: {
    width: "100%",
    height: Dimensions.get("window").height * 0.25,
  },
  spacer: { height: 16 },
  text: {
    fontSize: 14,
    textAlign: "center",
    width: Dimensions.get("window").width - 80,
    marginTop: 16,
  },
});

export default HistoryGraphWithBalance;
