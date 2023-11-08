export const MicrositiosQuerys = {
  getMicrositios: 'getMicrositios',
  getMicrositioById: (id: number) => ['getMicrositioById', id] as const,
  createMicrositio: 'createMicrositio',
} as const
