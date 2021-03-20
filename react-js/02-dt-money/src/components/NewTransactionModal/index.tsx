import { useState } from "react";
import ReactModal from "react-modal";
import { svgImages } from "../../assets";
import { useTransactionsContext } from "../../hooks/useTransactionsContext";
import { TransactionPayload } from "../../types/Transaction";

import { Form, TransactionType, ButtonTypeTransaction } from "./styles";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

type TypeTransaction = "deposit" | "withdraw";

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactionsContext();

  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState("");
  const [typeTransaction, setTypeTransaction] = useState<TypeTransaction>(
    "deposit"
  );

  const handleCreateNewTransaction = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const data: TransactionPayload = {
      title,
      amount: value,
      category,
      type: typeTransaction,
    };

    await createTransaction(data);

    setTitle("");
    setValue(0);
    setCategory("");
    setTypeTransaction("deposit");

    onRequestClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={svgImages.close} alt="icon-close-modal" />
      </button>
      <Form onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Título"
        />
        <input
          type="number"
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          placeholder="Valor"
        />
        <TransactionType>
          <ButtonTypeTransaction
            isActive={typeTransaction === "deposit"}
            type="button"
            activeColor="green"
            onClick={() => setTypeTransaction("deposit")}
          >
            <img src={svgImages.income} alt="income-buttom" />
            <span>Entrada</span>
          </ButtonTypeTransaction>

          <ButtonTypeTransaction
            isActive={typeTransaction === "withdraw"}
            activeColor="red"
            type="button"
            onClick={() => setTypeTransaction("withdraw")}
          >
            <img src={svgImages.outcome} alt="outcome-button" />
            <span>Saida</span>
          </ButtonTypeTransaction>
        </TransactionType>
        <input
          type="text"
          onChange={(event) => setCategory(event.target.value)}
          value={category}
          placeholder="Categoria"
        />
        <button type="submit" onClick={() => {}}>
          Cadastrar
        </button>
      </Form>
    </ReactModal>
  );
}
