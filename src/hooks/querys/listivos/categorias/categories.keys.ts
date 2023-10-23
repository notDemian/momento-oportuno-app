export const CategoriasQuerys = {
  getAllCategorias: 'getAllCategorias',
  getCategoryAttributes: (categoryId: number) => [
    'getCategoryAttributes',
    categoryId,
  ],
} as const
