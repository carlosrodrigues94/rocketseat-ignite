import { useContext } from "react";

import { createContext } from "react";
import { Transaction, TransactionPayload } from "../types/Transaction";

interface TransactionsContextProps {
  getTransactions: () => Promise<void>;
  createTransaction: (data: TransactionPayload) => Promise<void>;
  transactions: Transaction[];
}

const TransactionsContext = createContext<TransactionsContextProps>(
  {} as TransactionsContextProps
);

export { TransactionsContext };

export const useTransactionsContext = () => {
  const context = useContext(TransactionsContext);

  return context;
};
