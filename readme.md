# Crypto Portfolio Manager

This project is a React Native application designed to help users manage their cryptocurrency portfolios. It provides features such as adding transactions, viewing transaction history, and visualizing portfolio distribution using pie charts and graphs.

## Table of Contents

- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Storage Functions](#storage-functions)

## Features

- Add transactions for cryptocurrency buys and sells.
- View a history of transactions for each cryptocurrency.
- Visualize portfolio allocation with pie charts.
- Analyze historical trends using graphs.

## Setup Instructions

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the project:

   ```bash
    npx expo start
   ```

   and then press i to open the iOS emulator.

## Project Structure

- `App.tsx`: The entry point of the application that initializes the navigation and other core components.
- `navigator.tsx`: Configures the navigation between different screens.
- `screens/`: Contains the individual screen components for the app.
- `utils/`: Utility functions for various features such as data formatting and database interactions.
- `components/`: Reusable UI components.

## Storage Functions

This project uses `expo-sqlite` for local database storage. The database is initialized and managed using the following functions located in the `utils/storage.ts` file:

### Initialization

- **`initDatabase`**: Creates tables for storing transaction history and total coin amounts if they do not already exist.

### Transaction Management

- **`saveTransaction`**: Adds a new transaction to the transaction history and updates the total amount of the corresponding cryptocurrency. Handles validation for "Sell" transactions to ensure the user has enough coins.
- **`getAllTransactions`**: Retrieves all transactions from the database.
- **`getAllTransactionsForTicker`**: Retrieves all transactions associated with a specific cryptocurrency ticker.

### Coin Amount Management

- **`getCoinTotalAmount`**: Retrieves the total amount of a specific cryptocurrency held by the user.
- **`getAllCoinTotalAmounts`**: Retrieves the total amounts of all cryptocurrencies held by the user.
