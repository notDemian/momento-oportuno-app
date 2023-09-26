export type Directorio = {
  id: number
  title: string
  location: string
  type: string
  hours: string
  address: string
  phone: string
  email: string
  user_id: number
  status: string
  expire: string
}

export type DirectorioMapped = Omit<
  Directorio,
  '_links' | 'acf' | 'date_gmt' | 'modified_gmt' | 'slug' | 'template'
>

export type GetAllDirectoriosRes = Directorio[]
