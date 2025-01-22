import { useEffect, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { GraphPoint } from "react-native-graph";

function Balance({
  selectedGraphPoint,
  balanceNow,
}: {
  selectedGraphPoint: Animated.ValueXY;
  balanceNow: number;
}) {
  const [graphPoint, setGraphPoint] = useState<GraphPoint | undefined>(
    undefined
  );

  useEffect(() => {
    selectedGraphPoint.addListener((value) => {
      if (value.x === 0 && value.y === 0) {
        setGraphPoint(undefined);
      } else {
        setGraphPoint({ value: value.y, date: new Date(value.x) });
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {graphPoint
          ? `Balance on ${graphPoint.date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}: `
          : "Balance now: "}
      </Text>
      <Text style={styles.balance}>
        {(graphPoint ? graphPoint?.value : balanceNow) + " USD"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "grey",
  },
  balance: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Balance;
