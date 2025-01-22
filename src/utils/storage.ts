import { CoinTotalAmount, Transaction } from "../types";
import * as SQLite from "expo-sqlite";

const DATABASE_KEY = "DB-3";
const TRANSACTIONS_HISTORY_TABLE_NAME = "transactions";
const COIN_TOTAL_AMOUNT_TABLE_NAME = "coinTotalAmount";

const db = SQLite.openDatabaseSync(DATABASE_KEY);

export const initDatabase = async () => {
  try {
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS ${TRANSACTIONS_HISTORY_TABLE_NAME} (
                id TEXT PRIMARY KEY,
                date TEXT,
                type TEXT,
                quantity INTEGER,
                pricePerCoinInUSD REAL,
                assetTicker TEXT
          )`
    );

    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS ${COIN_TOTAL_AMOUNT_TABLE_NAME} (
                id TEXT PRIMARY KEY,
                assetTicker TEXT,
                quantity INTEGER,
                pricePerCoinInUSD REAL
          )`
    );
  } catch (e) {
    console.error(e);
  }
};

export const saveTransaction = async (transaction: Omit<Transaction, "id">) => {
  try {
    const totalAmount = await getCoinTotalAmount(transaction.assetTicker);

    if (
      transaction.type === "Sell" &&
      totalAmount?.quantity &&
      totalAmount.quantity < transaction.quantity
    ) {
      throw new Error("Not enough coins to Sell");
    }

    await db.execAsync(
      `INSERT INTO ${TRANSACTIONS_HISTORY_TABLE_NAME} (id, date, type, quantity, pricePerCoinInUSD, assetTicker) 
         VALUES ('${new Date().getTime()}', '${transaction.date}', '${
        transaction.type
      }', '${transaction.quantity}', '${transaction.pricePerCoinInUSD}', '${
        transaction.assetTicker
      }')`
    );

    const newTotalQuantity = totalAmount
      ? transaction.type === "Buy"
        ? totalAmount.quantity + transaction.quantity
        : totalAmount.quantity - transaction.quantity
      : transaction.quantity;

    await db.execAsync(
      `INSERT OR REPLACE INTO ${COIN_TOTAL_AMOUNT_TABLE_NAME} (id, assetTicker, quantity, pricePerCoinInUSD) 
         VALUES ('${totalAmount?.id || new Date().getTime()}', '${
        transaction.assetTicker
      }', '${newTotalQuantity}', '${transaction.pricePerCoinInUSD}')`
    );
  } catch (e) {
    console.error(e);
  }
};

export const getAllTransactions = async (): Promise<Transaction[]> => {
  try {
    const res = await db.getAllAsync(
      `SELECT * FROM ${TRANSACTIONS_HISTORY_TABLE_NAME}`
    );

    return res as Transaction[];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getAllTransactionsForTicker = async (
  assetTicker: string
): Promise<Transaction[]> => {
  try {
    const res = await db.getAllAsync(
      `SELECT * FROM ${TRANSACTIONS_HISTORY_TABLE_NAME} WHERE assetTicker = '${assetTicker}'`
    );

    return res as Transaction[];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getCoinTotalAmount = async (
  assetTicker: string
): Promise<CoinTotalAmount | null> => {
  try {
    const res = await db.getFirstAsync(
      `SELECT * FROM ${COIN_TOTAL_AMOUNT_TABLE_NAME} WHERE assetTicker = '${assetTicker}'`
    );

    return res as CoinTotalAmount;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getAllCoinTotalAmounts = async (): Promise<CoinTotalAmount[]> => {
  try {
    const res = await db.getAllAsync(
      `SELECT * FROM ${COIN_TOTAL_AMOUNT_TABLE_NAME}`
    );

    return res as CoinTotalAmount[];
  } catch (e) {
    console.error(e);
    return [];
  }
};
