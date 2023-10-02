import { useQuery } from 'react-query'

import { DirectoriosQuerys } from './directorios.query'

import { WoocommerceService } from '@src/api'
import { CLOG } from '@src/utils'
import { AxiosError } from 'axios'

export const useDirectoriosVariations = () => {
  return useQuery({
    queryFn: WoocommerceService.getDirectoriosVariants,
    queryKey: DirectoriosQuerys.directoriosVariants,
    onError(err: AxiosError) {
      CLOG(err.request)
    },
  })
}
