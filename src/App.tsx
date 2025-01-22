import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { initDatabase } from "./utils/storage";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navigator from "./navigator";

initDatabase();

export default function MainStack() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <Navigator />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}
