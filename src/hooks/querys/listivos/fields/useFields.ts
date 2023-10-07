import { useQuery } from 'react-query'

import { FieldsQuerys } from './fields.querys'

import { FieldsServices } from '@src/api'

export const useFields = (cat = 0) => {
  return useQuery({
    queryKey: [FieldsQuerys.getAllFields, cat],
    queryFn: FieldsServices.getAllFields,
    select(data) {
      const cats = data.find((d) => d.id === 14)
      const dependencies = cats?.terms?.find((t) => t.id === cat)?.dependencies
      const fields = data.filter((d) => dependencies?.includes(d.id))
      return fields
    },
  })
}
