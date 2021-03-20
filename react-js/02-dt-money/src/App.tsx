import React, { useState } from "react";
import { Dashboard } from "./components/Dashboard";

import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import ReactModal from "react-modal";
import { createServer, Model } from "miragejs";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { Transaction } from "./types/Transaction";
import ContextProvider from "./contexts/ContextProvider";

const seedTransactions: Transaction[] = [
  {
    id: 1,
    title: "Freelancer Website",
    type: "deposit",
    amount: 6000,
    category: "Dev",
    created_at: new Date("2021-02-10 13:13:00").toString(),
  },
  {
    id: 2,
    title: "Aluguel",
    type: "deposit",
    category: "Casa",
    amount: 6000,
    created_at: new Date("2021-04-10 00:00:00").toString(),
  },
];
createServer({
  models: {
    transaction: Model,
  },

  seeds: function (server) {
    server.db.loadData({
      transactions: seedTransactions,
    });
  },

  routes: function () {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create("transaction", data);
    });
  },
});

ReactModal.setAppElement("#root");

function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(
    false
  );

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }
  return (
    <ContextProvider>
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
    </ContextProvider>
  );
}

export default App;
