import { AdSchema } from '../Anuncios'

import { ImagePickerAsset } from 'expo-image-picker'
import * as z from 'zod'

export type MediaType = 'listing' | 'directory' | 'microsite'

export type UploadImageParams = {
  type?: MediaType
  resourceId: number
  photo: ImagePickerAsset | ImagePickerAsset[]
}

export const AppendImageResponseSchema = AdSchema.pick({
  id: true,
  title: true,
  slug: true,
  status: true,
  image: true,
  description: true,
  is_featured: true,
  is_multistate: true,
  send_to_print: true,
  is_active: true,
  auto_renew: true,
  user_id: true,
  user_package_id: true,
  state_id: true,
  expires_at: true,
  created_at: true,
  updated_at: true,
  category_id: true,
  media: true,
})

export type AppendImageResponse = z.infer<typeof AppendImageResponseSchema>
