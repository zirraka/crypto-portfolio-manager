import { GraphPoint } from "react-native-graph";
import { getAllTransactions } from "./storage";

export const getHistoricalData = async (): Promise<GraphPoint[]> => {
  const transactions = await getAllTransactions();

  const groupedTransactions = transactions.reduce<Record<string, number>>(
    (acc, transaction) => {
      const date = new Date(transaction.date).toISOString().split("T")[0];
      const amount =
        transaction.quantity *
        transaction.pricePerCoinInUSD *
        (transaction.type === "Buy" ? 1 : -1);
      acc[date] = (acc[date] || 0) + amount;
      return acc;
    },
    {}
  );

  const sortedDates = Object.keys(groupedTransactions).sort((a, b) =>
    a.localeCompare(b)
  );

  const startDate = new Date(sortedDates[0]);
  const endDate = new Date(sortedDates[sortedDates.length - 1]);

  const datesList = generateDateListWithLimit(startDate, endDate);

  let accumulatedQuantity = 0;

  return datesList.map((date) => {
    accumulatedQuantity += groupedTransactions[date] || 0;
    return { value: accumulatedQuantity, date: new Date(date) };
  });
};

function generateDateListWithLimit(
  startDate: Date,
  endDate: Date,
  maxSize: number = 100
): string[] {
  const totalDays =
    Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000) + 1;
  const step = Math.max(1, Math.ceil(totalDays / maxSize));

  const dateList: string[] = [];
  for (
    let current = new Date(startDate), dayCount = 0;
    current <= endDate;
    dayCount++
  ) {
    if (dayCount % step === 0) {
      dateList.push(current.toISOString().split("T")[0]);
    }
    current.setDate(current.getDate() + 1);
  }

  return dateList;
}
