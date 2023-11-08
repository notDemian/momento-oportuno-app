import { AddonsSchema } from '../Addons'

import * as z from 'zod'

export const TypePackagePojo = {
  MICROSITE: 'microsite',
  LISTING: 'listing',
  DIRECTORY: 'directory',
} as const

export const TypePackageSchema = z.union([
  z.literal(TypePackagePojo.MICROSITE),
  z.literal(TypePackagePojo.LISTING),
  z.literal(TypePackagePojo.DIRECTORY),
])

export type GetPackagesParams = {
  type?: TypePackage
  resource_id?: number
}

export type TypePackage = z.infer<typeof TypePackageSchema>

export const PackageSchema = z.object({
  id: z.number(),
  name: z.string(),
  label: z.string().nullable().optional(),
  type: TypePackageSchema,
  description: z.string().nullable().optional(),
  expire: z.number(),
  price: z.number(),
  display_price: z.string(),
  is_featured: z.number(),
  is_active: z.number(),
  is_multistate: z.number(),
  includes_video: z.number(),
  includes_printing: z.number(),
  max_number_of_characters: z.number(),
  number_of_images: z.number(),
  addons: AddonsSchema.array().nullable().optional(),
  created_at: z.coerce.date().nullable().optional(),
  updated_at: z.coerce.date().nullable().optional(),
})
export type Package = z.infer<typeof PackageSchema>

export const GetPackagesResponseSchema = z.object({
  data: z.array(PackageSchema),
})
export type GetPackagesResponse = z.infer<typeof GetPackagesResponseSchema>

export const UserPackageSchema = PackageSchema.merge(
  z.object({
    user_id: z.number(),
    package_id: z.number(),
  }),
)

export type UserPackage = z.infer<typeof UserPackageSchema>

export const GetUserPackagesSchema = z.object({
  data: z.array(UserPackageSchema),
})

export type GetUserPackages = z.infer<typeof GetUserPackagesSchema>
