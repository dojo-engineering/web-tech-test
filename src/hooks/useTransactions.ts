import { Transaction } from "@/pages/api/transactions";
import { useEffect, useState } from "react";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>();

  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await fetch("/api/transactions", {
        method: "GET",
      }).then((response) => response.json());
      setTransactions(transactions);
    };

    void getTransactions();
  }, []);

  return transactions;
};
