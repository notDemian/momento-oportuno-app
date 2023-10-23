export const DirectoriosQuerys = {
  getAllDirectorios: 'getAllDirectorios',
  getDirectorioById: (id: number | undefined) =>
    ['getDirectorioById', id] as const,
  directoriosVariants: 'directoriosVariants',
  createDirectorio: 'createDirectorio',
} as const
