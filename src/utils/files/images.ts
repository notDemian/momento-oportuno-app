import { ensureDirExists } from './files'

import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'

export const getImagesDir = () => {
  return `${FileSystem.documentDirectory}images` as const
}

export const getImageUri = (filename: string) => {
  return `${getImagesDir()}/${filename}` as const
}

export async function ensureDirImgExists() {
  await ensureDirExists(getImagesDir())
}

export async function selectImages({
  selectionLimit = 3,
  allowsMultipleSelection = true,
}): Promise<ImagePicker.ImagePickerResult | null> {
  // try {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsMultipleSelection: true,
  //     // base64: true,
  //     selectionLimit: 3,
  //   })
  //   if (result.canceled) {
  //     onCancel && onCancel()
  //     return
  //   }
  //   setImages(result.assets.splice(0, 3))
  // } catch (error) {
  //   onError && onError(error)
  // }
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection,
      selectionLimit,
    })
    return result
  } catch (error) {
    return null
  }
}

export async function saveImage(img: ImagePicker.ImagePickerAsset) {
  await ensureDirImgExists()
  const filename = img.uri.split('/').pop() ?? new Date().getTime() + '.jpg'
  const dest = getImageUri(filename)
  await FileSystem.copyAsync({ from: img.uri, to: dest })
}

export function uploadImage({
  imageUri,
  fieldName,
  type,
  url,
  extraHeaders,
}: {
  url: string
  imageUri: string
  fieldName: string
  type: string
  extraHeaders?: Record<string, string>
}) {
  return FileSystem.uploadAsync(url, imageUri, {
    fieldName,
    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    httpMethod: 'POST',
    mimeType: type,
    headers: extraHeaders,
  })
}
