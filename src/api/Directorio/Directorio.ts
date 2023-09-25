import Request from '../request'

import { GetAllDirectoriosRes } from './Directorio.type'

const api = Request('/directorio')

const DirectorioServices = {
  async getAllDirectorio() {
    const { data } = await api.get<GetAllDirectoriosRes>('/')

    return data
  },
}

export default DirectorioServices
