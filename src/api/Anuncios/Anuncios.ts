import Request from '../request'
import { Main_Anuncios, getAnuncioRes } from './Anuncios.type'

const api = Request('/listings')

const AnunciosServices = {
  async getAllAnuncios(): Promise<Main_Anuncios> {
    const { data } = await api.get<Main_Anuncios>('/')

    return data
  },
  async getAnuncio(id: string | number): Promise<getAnuncioRes> {
    const { data } = await api.get<getAnuncioRes>(`/${id}`)

    return data
  },
}

export default AnunciosServices
