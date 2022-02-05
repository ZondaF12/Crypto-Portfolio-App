import React, { useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const PortfolioContext = React.createContext();

export function usePortfolio() {
  return useContext(PortfolioContext);
}

// Add Coin
// {
//   id:
//   coinName:
// }

// Transaction
// {
//   id:
//   portfolioId:
//   amount:
//   price:
// }

export const PortfolioProvider = ({ children }) => {
  const [coins, setCoins] = useLocalStorage("coins", []);
  const [transactions, setTransactions] = useLocalStorage("transaction", []);

  console.log([coins, setCoins]);
  console.log([transactions, setTransactions]);

  function getCoinTransaction(coinId) {
    return transactions.filter((transaction) => transaction.coinId === coinId);
  }

  function addTransaction({ price, amount, coinId }) {
    setTransactions((prevTransactions) => {
      return [...prevTransactions, { id: uuidV4(), price, amount, coinId }];
    });
  }

  function addCoin({ name }) {
    setCoins((prevCoins) => {
      if (prevCoins.find((coin) => coin.name === name)) {
        return prevCoins;
      }
      return [...prevCoins, { id: uuidV4(), name }];
    });
  }

  function deleteCoin({ id }) {
    setCoins((prevCoins) => {
      return prevCoins.filter((coin) => coin.id !== id);
    });
  }

  function deleteTransaction({ id }) {
    setTransactions((prevTransactions) => {
      return prevTransactions.filter((transaction) => transaction.id !== id);
    });
  }

  return (
    <PortfolioContext.Provider
      value={{
        coins,
        transactions,
        getCoinTransaction,
        addTransaction,
        addCoin,
        deleteCoin,
        deleteTransaction,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
