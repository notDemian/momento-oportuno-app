import { useMutation } from 'react-query'

import { MediaMutationsKeys } from './media.keys'

import { MediaServices } from '@src/api'

const useUploadImage = () => {
  return useMutation({
    mutationKey: MediaMutationsKeys.uploadImage,
    mutationFn: MediaServices.uploadImageToResource,
  })
}

export { useUploadImage }
