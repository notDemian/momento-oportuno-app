import Request from '../request'

import type {
  getMicrositioByIdRes,
  GetMicrositiosRes,
} from './Micrositios.type'

const api = Request('/microsites')

export class MicrositiosServices {
  static async getAllMicrositios() {
    const { data } = await api.get<GetMicrositiosRes>('/get')

    return data
  }

  static async getMicrositioById(id: number) {
    const { data } = await api.get<getMicrositioByIdRes>(`/get/${id}`)

    return data
  }
}

export default MicrositiosServices
