export const NEW_ANUNCIO_CATEGORIAS = [
  'Comunidad',
  'Electrónicos',
  'Empleos',
  'Inmuebles',
  'Mascotas',
  'Moda',
  'Para niños',
  'Servicios',
  'Vehículos',
] as const

export const NEW_ANUNCIO_CATEGORIAS_OBJ = NEW_ANUNCIO_CATEGORIAS.reduce(
  (acc, cur) => ({ ...acc, [cur]: cur }),
  {} as Record<NewAnuncioCategorias, NewAnuncioCategorias>,
)

export type NewAnuncioCategorias = (typeof NEW_ANUNCIO_CATEGORIAS)[number]
