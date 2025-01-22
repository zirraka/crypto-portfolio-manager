import React, { ReactElement } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function ScreenWrapper({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  return (
    <SafeAreaView style={styles.container}>
      <>{children}</>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
});

export default ScreenWrapper;
