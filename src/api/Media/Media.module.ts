import { CLOG } from '@src/utils'
import * as FileSystem from 'expo-file-system'
import { ImagePickerAsset } from 'expo-image-picker'
import z from 'zod'

export const MediaSchema = z.object({
  id: z.number(),
  collection_name: z.string(),
  file_name: z.string(),
  mime_type: z.string(),
  size: z.number(),
  original_url: z.string(),
  preview_url: z.string(),
})
export type Media = z.infer<typeof MediaSchema>

export type BlobType = {
  uri: string
  name: string
  type: string
}
export function getBlob({ photo }: { photo: ImagePickerAsset }): BlobType {
  const uri = photo.uri
  const filename = photo.uri.split('/').pop() ?? ''
  const imgType = filename?.split('.').pop()
  const typeFD = `image/${imgType}`

  const blob = {
    uri,
    name: filename,
    type: typeFD,
  }

  return blob
}

// 1mb
const FILE_SIZE_LIMIT = 1000000 as const

export const VIDEO_MIME_TYPES = [
  'video/mp4',
  // 'video/quicktime',
  // 'video/x-msvideo',
  // 'video/x-ms-wmv',
] as const

export async function validateSize({ photo }: { photo: ImagePickerAsset }) {
  const file = await FileSystem.getInfoAsync(photo.uri)
  if (!file.exists) throw new ImageDoesntExistError()
  CLOG({ file })
  const size = file.size
  return size < FILE_SIZE_LIMIT
}

export class SomeImageUploadFailedError extends Error {
  constructor() {
    super('Error al subir una o más imágenes')
  }
}

export class ImageDoesntExistError extends Error {
  constructor() {
    super('La imagen no existe')
  }
}

export class ImageTooBigError extends Error {
  constructor() {
    super('La imagen es demasiado grande')
  }
}
