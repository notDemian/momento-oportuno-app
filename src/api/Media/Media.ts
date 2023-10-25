import { Platform } from 'react-native'
import Request from '../request'

import { UploadImageParams } from './Media.type'

import { CLOG, Constants } from '@src/utils'

const api = Request(Constants.ENDPOINTS.MEDIA)

export class MediaServices {
  static async uploadImageToResource({
    type = 'listing',
    resourceId,
    photo,
  }: UploadImageParams) {
    const uri =
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', '')
    const filename = photo.uri.split('/').pop()
    const formData = new FormData()
    formData.append('photo', {
      uri,
      name: filename,
      type,
    })

    CLOG({
      onUploadImage: { uri, filename, type },
    })

    const { data } = await api.post(`${type}/${resourceId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    CLOG({ data })

    return data as any
  }
}
