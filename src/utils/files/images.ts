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

// const handleUploadPhoto = async () => {
//   if (!photo) return
//   const uri =
//     Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', '')
//   const filename = photo.uri.split('/').pop()
//   const match = /\.(\w+)$/.exec(filename as string)
//   const ext = match?.[1]
//   const type = match ? `image/${match[1]}` : 'image'
//   const formData = new FormData()
//   formData.append('photo', {
//     uri,
//     name: `image.${ext}`,
//     type,
//   })

//   try {
//     const res = await axios.post(`${SERVER_URL}/api/upload`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     })

//     console.log({ json: res.data })
//   } catch (error: any) {
//     const err: AxiosError = error
//     console.log('error ------>')
//     CLOG({ err })
//   }
// }

// const handleChoosePhoto = async () => {
//   try {
//     const res = await launchImageLibraryAsync({
//       mediaTypes: MediaTypeOptions.Images,
//     })

//     if (res.assets && res.assets[0]) setPhoto(res.assets[0])
//   } catch (error: any) {
//     console.log('error', error.stack)
//   }
// }