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
    name: 'Pesca',
    icon: 'fishing',
  },
  {
    id: '3',
    name: 'Inmuebles',
    icon: 'house',
  },
  {
    id: '4',
    name: 'Vehiculos',
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
  | 'fishing'
  | 'house'
  | 'directions-car'
  | 'work'
