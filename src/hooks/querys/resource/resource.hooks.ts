import { useQuery } from 'react-query'

import { ResourceMapping } from './resource.helpers'
import { ResourcesQuerysKeys } from './resource.keys'

import { TypePackage } from '@src/api'

const useResource = (id: number | undefined, type: TypePackage | undefined) => {
  return useQuery({
    queryKey: ResourcesQuerysKeys.getResourceByIdAndType(id, type),
    queryFn: async () => {
      if (!id || !type) return null

      const data = await ResourceMapping[type](id)

      return data
    },
    enabled: !!id && !!type,
  })
}

export { useResource }
