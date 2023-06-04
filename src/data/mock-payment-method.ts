type PaymentMethod = {
  id: string;
  name: string;
  icon: string;
};

export const paymentMethods: PaymentMethod[] = [
  {
    id: '1',
    name: 'Cash On Delivery',
    icon: 'cash',
  },
  {
    id: '2',
    name: 'ATM Card',
    icon: 'card',
  },
  {
    id: '3',
    name: 'Visa / Master',
    icon: 'card-outline',
  },
  {
    id: '5',
    name: 'Apple Pay',
    icon: 'logo-apple',
  },
  {
    id: '6',
    name: 'Google Pay',
    icon: 'logo-google',
  },
];
