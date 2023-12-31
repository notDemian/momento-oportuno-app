import { MyAxiosInstance } from './request.type'

import { store } from '@src/redux'
import { Constants, type ENDPOINTS } from '@src/utils/constants'
import axios from 'axios'

export default function Request(service: ENDPOINTS): MyAxiosInstance {
  const url = Constants.API_URL

  const req = axios.create({
    baseURL: `${url}${service}`,
    timeout: 1000,
    maxBodyLength: Infinity,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  req.interceptors.request.use(
    (config) => {
      const { token } = store.getState().auth
      if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (err) => {
      Promise.reject(err)
    },
  )

  return req
}
