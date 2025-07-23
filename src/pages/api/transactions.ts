// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { faker } from "@faker-js/faker";
import type { NextApiRequest, NextApiResponse } from "next";

export type CardType = "mastercard" | "amex" | "maestro" | "discover";

export interface Money {
  currencyCode: string;
  value: number;
}

export interface Transaction {
  ref: string;
  cardNumber: string;
  cardType: CardType;
  amount: Money;
  date: Date;
}

const mockTransactions = (count: number) => {
  faker.seed(0);
  return new Array(count).fill(0).map<Transaction>(() => ({
    ref: faker.git.commitSha(),
    cardNumber: `**** ${faker.number
      .int({ min: 0, max: 9999 })
      .toString()
      .padStart(4, "0")}`,
    cardType: faker.helpers.arrayElement([
      "mastercard",
      "amex",
      "maestro",
      "discover",
    ]),
    date: faker.date.recent(),
    amount: {
      currencyCode: "GBP",
      value: faker.number.float({ min: 0.01, max: 999.99, fractionDigits: 2 }),
    },
  }));
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Transaction[]>
) {
  res.status(200).json(mockTransactions(100));
}
