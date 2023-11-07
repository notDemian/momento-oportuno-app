import { TypePackage } from '@src/api'

export const ResourcesQuerysKeys = {
  getResourceByIdAndType: (
    id: number | undefined,
    type: TypePackage | undefined,
  ) => ['resource', id, type] as const,
} as const
