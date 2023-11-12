import Request from '../request'

import type {
  GetChatMessagesResponse,
  GetMyChatsResponse,
  InitializeChatResponse,
  PostMessageResponse,
  PostMessageSchema,
} from './Chats.type'
import {
  GetChatMessagesResponseSchema,
  GetMyChatsResponseSchema,
  InitializeChatResponseSchema,
  PostMessageResponseSchema,
} from './Chats.type'

import { Constants } from '@src/utils'

const api = Request(Constants.ENDPOINTS.CHATS)

export class ChatsServices {
  static async getMyChats(): Promise<GetMyChatsResponse> {
    const { data } = await api.get('/')

    const parsed = GetMyChatsResponseSchema.parse(data)

    return parsed
  }

  static async initializeChat(chatId: number): Promise<InitializeChatResponse> {
    const { data } = await api.post(`/${chatId}`)

    const parsed = InitializeChatResponseSchema.parse(data)

    return parsed
  }

  static async postMessage(
    body: PostMessageSchema,
    chatId: number,
  ): Promise<PostMessageResponse> {
    const { data } = await api.post(`/messages/${chatId}`, body)

    const parsed = PostMessageResponseSchema.parse(data)

    return parsed
  }

  static async getMessages(chatId: number): Promise<GetChatMessagesResponse> {
    const { data } = await api.get(`/messages/${chatId}`)

    const parsed = GetChatMessagesResponseSchema.parse(data)

    return parsed
  }
}
