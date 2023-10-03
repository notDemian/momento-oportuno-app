import { useQuery } from 'react-query'

import { DirectoriosQuerys } from './directorios.query'

import { WoocommerceService } from '@src/api'

export const useDirectoriosVariations = () => {
  return useQuery({
    queryFn: WoocommerceService.getDirectoriosVariants,
    queryKey: DirectoriosQuerys.directoriosVariants,
  })
}
