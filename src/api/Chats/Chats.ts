import Request from '../request'

import { PostMessageSchema } from './Chats.type'

import { Constants } from '@src/utils'

const api = Request(Constants.ENDPOINTS.CHATS)

export class ChatsServices {
  static async getMyChats() {
    const { data } = await api.get('/')

    return data
  }

  static async initializeChat(chatId: number) {
    const { data } = await api.post(`/${chatId}`)

    return data
  }

  static async postMessage(body: PostMessageSchema, chatId: number) {
    const { data } = await api.post(`/messages/${chatId}`, body)

    return data
  }

  static async getMessages(chatId: number) {
    const { data } = await api.get(`/messages/${chatId}`)

    return data
  }
}
