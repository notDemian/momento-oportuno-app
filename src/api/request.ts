import { type ENDPOINTS, Constants } from '@src/utils/constants'
import axios, { type AxiosInstance } from 'axios'

export default function Request(service: ENDPOINTS): AxiosInstance {
  const url = Constants.IS_DEV ? Constants.URL.DEV : Constants.URL.PROD

  return axios.create({
    baseURL: `${url}${service}`,
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export function CustomRequest(url: string): AxiosInstance {
  const fullUrl = Constants.IS_DEV
    ? Constants.URL.CUSTOM_DEV
    : Constants.URL.CUSTOM

  return axios.create({
    baseURL: `${fullUrl}${url}`,
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
