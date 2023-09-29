export type GetMicrositiosRes = Micrositio[]

export type getMicrositioByIdRes = Micrositio

export type Micrositio = {
  id: number
  title: string
  url: string
  image: boolean | string
  description: string
  member_since: string
  address: string
  phone: string
}
