export type PaymentMethods =
  | 'Efectivo'
  | 'ATM Card'
  | 'Visa / Master'
  | 'Apple Pay'
  | 'Google Pay'

type PaymentMethodArr = {
  id: string
  name: PaymentMethods
  icon: string
}

export const paymentMethods: PaymentMethodArr[] = [
  {
    id: '1',
    name: 'Efectivo',
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
]
