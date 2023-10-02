import Request from '../request'

import { getAnuncioRes, Main_Anuncios } from './Anuncios.type'

import { FilterParams } from '@src/redux/filter'

const api = Request('/listings')

const AnunciosServices = {
  async getAllAnuncios({
    page = 1,
    per_page = 12,
    category,
    query,
    state,
  }: {
    page?: number
    per_page?: number
  } & FilterParams): Promise<{
    data: Main_Anuncios
    nextPage: number
  }> {
    let q = ''
    if (query) {
      q += `&search=${query}`
    }
    if (category) {
      q += `&category=${category}`
    }
    if (state) {
      q += `&state=${state}`
    }

    const { data } = await api.get<Main_Anuncios>(
      `/get?page=${page}&per_page=${per_page}` + q,
    )

    return { data, nextPage: page + 1 }
  },
  async getAllAnunciosByState({
    page = 1,
    per_page = 12,
    state,
  }: {
    page?: number
    per_page?: number
    state: string | number
  }): Promise<{
    data: Main_Anuncios
    nextPage: number
  }> {
    const { data } = await api.get<Main_Anuncios>(
      `/get?page=${page}&per_page=${per_page}&state=${state}`,
    )

    return { data, nextPage: page + 1 }
  },

  async getAnuncio(id: string | number): Promise<getAnuncioRes> {
    const { data } = await api.get<getAnuncioRes>(`/get/${id}?nocache`)

    return data
  },
}

export default AnunciosServices
