export interface Transaction {
  id: number;
  title: string;
  type: "deposit" | "withdraw";
  amount: number;
  category: string;
  created_at: string;
}

export type TransactionPayload = Omit<Transaction, "id" | "created_at">;
