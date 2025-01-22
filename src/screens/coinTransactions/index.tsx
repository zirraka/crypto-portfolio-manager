import { useEffect, useState } from "react";
import { NavigationProps, Transaction } from "../../types";
import { getAllTransactionsForTicker } from "../../utils/storage";
import ScreenHeader from "../../components/screenHeader";
import TransactionList from "./views/transactionList";
import ScreenWrapper from "../../components/screenWrapper";

function CoinTransactions({
  navigation,
  route,
}: NavigationProps<"CoinTransactions">) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    getAllTransactionsForTicker(route.params.assetTicker).then((data) => {
      setTransactions(data);
    });
  }, []);

  return (
    <ScreenWrapper>
      <ScreenHeader
        title={`${route.params.assetTicker} Transactions`}
        onPressBack={() => navigation.goBack()}
      />
      <TransactionList transactions={transactions} />
    </ScreenWrapper>
  );
}

export default CoinTransactions;
