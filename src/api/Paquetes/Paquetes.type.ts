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
import * as z from 'zod'

export const DatumSchema = z.object({
  key: z.string(),
  name: z.string(),
  number: z.number(),
  expire: z.number(),
  featured_expire: z.number(),
  bumps_number: z.number(),
  bumps_interval: z.number(),
})
export type Datum = z.infer<typeof DatumSchema>

export const GetUserPaquetesSchema = z.union([
  z.array(DatumSchema),
  z.record(z.string(), DatumSchema.optional()),
])
export type GetUserPaquetes = z.infer<typeof GetUserPaquetesSchema>
