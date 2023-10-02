import { type GetALlCategoriasRes } from './Categorias.type'

import Request from '@src/api/request'
import { Constants } from '@src/utils'

const api = Request(Constants.ENDPOINTS.Listivos_CATEGORIAS)

const CategoriasServices = {
  async getAllCategorias(): Promise<GetALlCategoriasRes> {
    const { data } = await api.get<GetALlCategoriasRes>('/')

    return data
  },
  async getCategoriasByParent(parent = 0): Promise<GetALlCategoriasRes> {
    const { data } = await api.get<GetALlCategoriasRes>(
      `/?parent=${parent}&per_page=100`,
    )

    return data
  },
}

export default CategoriasServices
