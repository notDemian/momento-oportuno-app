import Chance from 'chance'
const chance = new Chance();

export type OrderHistory = {
  id: string;
  date: string;
  name: string;
  totalItems: number;
  totalPrice: number;
};

export const orderHistoryList: OrderHistory[] = Array(10)
  .fill(0)
  .map((_) => ({
    id: chance.string({ length: 8, casing: 'upper', alpha: true, numeric: true }),
    date: new Date(chance.date()).toDateString(),
    name: chance.name(),
    totalPrice: chance.floating({
      min: 5,
      max: 60
    }),
    totalItems: chance.integer({
      max: 5
    }),
  }));
