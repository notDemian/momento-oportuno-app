type Category = {
  id: string
  name: string
  icon: mockCategoriesIcons
}

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Mascotas',
    icon: 'pets',
  },
  {
    id: '2',
    name: 'Electrónicos',
    icon: 'computer',
  },
  {
    id: '3',
    name: 'Inmuebles',
    icon: 'house',
  },
  {
    id: '4',
    name: 'Vehículos',
    icon: 'directions-car',
  },
  {
    id: '5',
    name: 'Empleos',
    icon: 'work',
  },
]

export type mockCategoriesIcons =
  | 'pets'
  | 'computer'
  | 'house'
  | 'directions-car'
  | 'work'
