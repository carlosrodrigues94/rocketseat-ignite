import React from "react";
import { svgImages } from "../../assets";
import { useCurrencyFormat } from "../../hooks/useCurrencyFormat";
import { useTransactionsContext } from "../../hooks/useTransactionsContext";

import { Container } from "./styles";

export function Summary() {
  const { transactions } = useTransactionsContext();

  const summary = transactions.reduce(
    (accumulator, transaction) => {
      if (transaction.type === "deposit") {
        accumulator.deposits += transaction.amount;
        accumulator.total += transaction.amount;
      } else {
        accumulator.withdraws += transaction.amount;
        accumulator.total -= transaction.amount;
      }

      return accumulator;
    },
    { deposits: 0, withdraws: 0, total: 0 }
  );

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={svgImages.income} alt="income-img" />
        </header>
        <strong>{useCurrencyFormat(summary.deposits)}</strong>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src={svgImages.outcome} alt="income-img" />
        </header>
        <strong>-{useCurrencyFormat(summary.withdraws)}</strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Entradas</p>
          <img src={svgImages.total} alt="income-img" />
        </header>
        <strong>{useCurrencyFormat(summary.total)}</strong>
      </div>
    </Container>
  );
}
