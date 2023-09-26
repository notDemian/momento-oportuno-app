export type GetMicrositiosRes = Micrositio[]

export type getMicrositioByIdRes = Micrositio

export type Micrositio = {
  id: number
  title: string
  url: string
  image: boolean | string
  description: string
}
