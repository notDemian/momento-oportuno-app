import { useMutation } from 'react-query'

import { MediaMutationsKeys } from './media.keys'

import { MediaServices } from '@src/api'

const useUploadMedias = () => {
  return useMutation({
    mutationKey: MediaMutationsKeys.uploadImage,
    mutationFn: MediaServices.uploadMediasToResource,
  })
}

export { useUploadMedias }
