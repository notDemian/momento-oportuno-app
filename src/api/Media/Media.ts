import Request from '../request'

import {
  AppendImageResponse,
  AppendImageResponseSchema,
  UploadImageParams,
} from './Media.type'

import { Constants } from '@src/utils'
import axios from 'axios'

const api = Request(Constants.ENDPOINTS.MEDIA)

const imageField = 'image'

export class MediaServices {
  static async uploadMediasToResource({
    type = 'listing',
    resourceId,
    photo,
  }: UploadImageParams): Promise<AppendImageResponse> {
    const formData = new FormData()

    if (Array.isArray(photo)) {
      photo.forEach((arrphoto) => {
        const uri = arrphoto.uri
        const filename = arrphoto.uri.split('/').pop() ?? ''
        const imgType = filename?.split('.').pop()
        const typeFD = `image/${imgType}`

        const blob = {
          uri,
          name: filename,
          type: typeFD,
        }

        formData.append(imageField, blob)
      })
    } else {
      const uri = photo.uri
      const filename = photo.uri.split('/').pop() ?? ''
      const imgType = filename?.split('.').pop() ?? ''
      const typeFD = `image/${imgType}`

      const blob = {
        uri,
        name: filename,
        type: typeFD,
      }

      formData.append(imageField, blob)
    }

    const { data } = await api.post(`${type}/${resourceId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    const parsed = AppendImageResponseSchema.parse(data)

    return parsed
  }

  static async testImg({ photo: photos }: Pick<UploadImageParams, 'photo'>) {
    const formData = new FormData()

    if (Array.isArray(photos)) {
      photos.forEach((photo) => {
        const uri = photo.uri
        const filename = photo.uri.split('/').pop() ?? ''
        const imgType = filename?.split('.').pop()
        const typeFD = `image/${imgType}`

        const blob = {
          uri,
          name: filename,
          type: typeFD,
        }

        formData.append(imageField, blob)
      })
    } else {
      const uri = photos.uri
      const filename = photos.uri.split('/').pop() ?? ''
      const imgType = filename?.split('.').pop()
      const typeFD = `image/${imgType}`

      const blob = {
        uri,
        name: filename,
        type: typeFD,
      }

      formData.append(imageField, blob)
    }

    const { data } = await axios.post(
      'http://192.168.0.167:3000/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )

    return data as any
  }
}
