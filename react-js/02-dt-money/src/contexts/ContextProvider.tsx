import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { Transaction, TransactionPayload } from "../types/Transaction";
import { TransactionsContext } from "../hooks/useTransactionsContext";

// import { Container } from './styles';

type IAxiosResponse = AxiosResponse<{
  transactions: Transaction[];
}>;
const ContextProvider: React.FC = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function getTransactions() {
    try {
      const response: IAxiosResponse = await api.get("/transactions");

      setTransactions(response.data.transactions);
    } catch (err) {
      console.log("Erro na requisição => ", err);
    }
  }

  async function createTransaction(data: TransactionPayload) {
    try {
      const payload = { ...data, created_at: new Date() };

      const response = await api.post("/transactions", payload);

      const { transaction } = response.data;

      setTransactions([...transactions, transaction]);
    } catch (err) {
      console.log("Err", err);
    }
  }

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      <TransactionsContext.Provider
        value={{
          getTransactions,
          transactions,
          createTransaction,
        }}
      >
        {children}
      </TransactionsContext.Provider>
    </>
  );
};

export default ContextProvider;
