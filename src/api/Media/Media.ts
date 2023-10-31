import Request from '../request'

import {
  getBlob,
  ImageTooBigError,
  SomeImageUploadFailedError,
  validateSize,
} from './Media.module'
import {
  AppendImageResponse,
  AppendImageResponseSchema,
  UploadImageParams,
} from './Media.type'

import { CLOG, Constants } from '@src/utils'
import { AxiosResponse } from 'axios'

const api = Request(Constants.ENDPOINTS.MEDIA)

const imageField = 'image'

export class MediaServices {
  static async uploadMediasToResource({
    type = 'listing',
    resourceId,
    photo,
  }: UploadImageParams): Promise<AppendImageResponse> {
    for (const p of photo) {
      const isValid = await validateSize({ photo: p })
      if (!isValid) {
        throw new ImageTooBigError()
      }
    }

    const promises = photo.map((p) => {
      const formData = new FormData()

      formData.append(imageField, getBlob({ photo: p }))

      return api.post(`${type}/${resourceId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    })
    const awaited = await Promise.allSettled(promises)
    CLOG({
      awaited,
    })
    const rejeted = awaited.filter(
      (p): p is PromiseRejectedResult => p.status === 'rejected',
    )
    if (rejeted.length > 0) {
      throw new SomeImageUploadFailedError()
    }
    const fulfilled = awaited.filter(
      (p): p is PromiseFulfilledResult<AxiosResponse<unknown>> =>
        p.status === 'fulfilled',
    )

    const values = fulfilled.map((p) => p.value.data)

    const data = values[values.length - 1]

    const parsed = AppendImageResponseSchema.parse(data)

    return parsed
  }

  // static async testImg({ photo: photos }: Pick<UploadImageParams, 'photo'>) {
  //   const formData = new FormData()

  //   if (Array.isArray(photos)) {
  //     photos.forEach((photo) => {
  //       const uri = photo.uri
  //       const filename = photo.uri.split('/').pop() ?? ''
  //       const imgType = filename?.split('.').pop()
  //       const typeFD = `image/${imgType}`

  //       const blob = {
  //         uri,
  //         name: filename,
  //         type: typeFD,
  //       }

  //       formData.append(imageField, blob)
  //     })
  //   } else {
  //     const uri = photos.uri
  //     const filename = photos.uri.split('/').pop() ?? ''
  //     const imgType = filename?.split('.').pop()
  //     const typeFD = `image/${imgType}`

  //     const blob = {
  //       uri,
  //       name: filename,
  //       type: typeFD,
  //     }

  //     formData.append(imageField, blob)
  //   }

  //   const { data } = await axios.post(
  //     'http://192.168.0.167:3000/upload',
  //     formData,
  //     {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     },
  //   )

  //   return data as any
  // }
}
