import Request from '../request'

import type {
  getMicrositioByIdRes,
  GetMicrositiosRes,
} from './Micrositios.type'

const api = Request('/microsites')

const MicrositiosServices = {
  async getAllMicrositios() {
    const { data } = await api.get<GetMicrositiosRes>('/get')

    return data
  },

  async getMicrositioById(id: number) {
    const { data } = await api.get<getMicrositioByIdRes>(`/get/${id}`)

    return data
  },
}

export default MicrositiosServices
