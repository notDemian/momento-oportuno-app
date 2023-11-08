// file: handleAxiosErr.ts

import { isAxiosError } from 'axios'

export default function handleAxiosErr(err: unknown) {
  if (!err) return
  if (!isAxiosError(err)) return

  if (err.response) {
    // Request made and server responded
    console.log(err.response.data)
    console.log(err.response.status)
    console.log(err.response.headers)
  } else if (err.request) {
    // The request was made but no response was received
    console.log(err.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', err.message)
  }

  return err
}
