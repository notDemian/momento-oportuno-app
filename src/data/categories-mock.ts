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

export type NewAnuncioCategorias = (typeof NEW_ANUNCIO_CATEGORIAS)[number]
