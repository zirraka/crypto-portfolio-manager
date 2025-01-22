import { createStackNavigator } from "@react-navigation/stack";
import PortfolioOverview from "./screens/portfolioOverview";
import CoinTransactions from "./screens/coinTransactions";
import AddTransaction from "./screens/addTransaction";
import { StackParamsList } from "./types";

const Stack = createStackNavigator<StackParamsList>();

export default function Navigator() {
  return (
    <Stack.Navigator
      initialRouteName="PortfolioOverview"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="PortfolioOverview" component={PortfolioOverview} />
      <Stack.Screen name="CoinTransactions" component={CoinTransactions} />
      <Stack.Screen name="AddTransaction" component={AddTransaction} />
    </Stack.Navigator>
  );
}
