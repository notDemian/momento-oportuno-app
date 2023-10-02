import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
FileSystem
ImagePicker

export async function ensureDirExists(dir: string) {
  const dirInfo = await FileSystem.getInfoAsync(dir)
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true })
  }
}
