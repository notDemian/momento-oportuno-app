import Request from '../request'
import { Main_Anuncios, getAnuncioRes } from './Anuncios.type'

const api = Request('/listings')

const AnunciosServices = {
  async getAllAnuncios({
    page = 1,
    per_page = 12,
  }: {
    page?: number
    per_page?: number
  }): Promise<{
    data: Main_Anuncios
    nextPage: number
  }> {
    const { data } = await api.get<Main_Anuncios>(
      `?page=${page}&per_page=${per_page}`,
    )

    return { data, nextPage: page + 1 }
  },
  async getAnuncio(id: string | number): Promise<getAnuncioRes> {
    const { data } = await api.get<getAnuncioRes>(`/${id}`)

    return data
  },
}

export default AnunciosServices
