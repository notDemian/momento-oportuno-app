import { useQuery } from 'react-query'

import { AddonsQueryKeys } from './addons.keys'

import { AddonsServices } from '@src/api'

const useAddons = () => {
  return useQuery({
    queryKey: AddonsQueryKeys.getAddons,
    queryFn: AddonsServices.getAddons,
  })
}

export { useAddons }
