import Request from '../request'

import { GetAllDirectoriosRes } from './Directorio.type'

const api = Request('/directories')

const DirectorioServices = {
  async getAllDirectorio() {
    const { data } = await api.get<GetAllDirectoriosRes>('/get')

    return data
  },
}

export default DirectorioServices
