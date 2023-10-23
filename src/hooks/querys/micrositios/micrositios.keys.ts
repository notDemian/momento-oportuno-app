export const MicrositiosQuerys = {
  getMicrositios: 'getMicrositios',
  getMicrositioById: (id: number) => ['getMicrositioById', id] as const,
} as const
