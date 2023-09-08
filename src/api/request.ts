import { store } from '@src/redux'
import { Constants, type ENDPOINTS } from '@src/utils/constants'
import axios, { type AxiosInstance } from 'axios'

export default function Request(service: ENDPOINTS): AxiosInstance {
  const url = Constants.IS_DEV ? Constants.URL.DEV : Constants.URL.PROD

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

export function CustomRequest(url: string): AxiosInstance {
  const fullUrl = Constants.IS_DEV
    ? Constants.URL.CUSTOM_DEV
    : Constants.URL.CUSTOM

  const req = axios.create({
    baseURL: `${fullUrl}${url}`,
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
