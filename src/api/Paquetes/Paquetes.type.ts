export type GetALlPaquetesRes = Paquete[]

export interface Paquete {
  id: number
  name: string
  slug: string
  url: string
  label: string
  price: number
  displayPrice: string
  number: number
  expire: number
  featuredExpire: number
  categoryIds: number[]
  bumpsNumber: number
  bumpsInterval: number
  text: string
  isFeatured: boolean
  userAccountType: UserAccountType
  userAccountTypeLabel: UserAccountTypeLabel
}
export enum UserAccountType {
  Any = 'any',
}

export enum UserAccountTypeLabel {
  Cualquier = 'Cualquier',
}
