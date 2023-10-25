import { ImagePickerAsset } from 'expo-image-picker'

export type MediaType = 'listing' | 'directory' | 'microsite'

export type UploadImageParams = {
  type: MediaType
  resourceId: number
  photo: ImagePickerAsset
}
