import React from "react";
import { StyleSheet, Text } from "react-native";

function NoTransactions({
  navigateToAddTransaction,
}: {
  navigateToAddTransaction: () => void;
}) {
  return (
    <>
      <Text style={styles.noTransactionsText}>No transactions to display</Text>
      <Text
        style={styles.addTransactionText}
        onPress={navigateToAddTransaction}
      >
        Click here to add a transactions
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  noTransactionsText: {
    textAlign: "center",
    marginTop: 32,
    fontSize: 16,
  },
  addTransactionText: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 16,
    color: "#808080",
  },
});

export default NoTransactions;
