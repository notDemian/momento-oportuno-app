import { useMutation, useQuery } from 'react-query'

import { ChatMutationsKeys, ChatQuerysKeys } from './chats.keys'

import { ChatsServices } from '@src/api'

const useGetChats = () => {
  return useQuery({
    queryFn: ChatsServices.getMyChats,
    queryKey: ChatQuerysKeys.getMyChats,
  })
}

const useInitChat = (chatId: number) => {
  return useMutation({
    mutationFn: () => ChatsServices.initializeChat(chatId),
    mutationKey: ChatMutationsKeys.initializeChat(chatId),
  })
}

const useGetChatMessages = (chatId: number) => {
  return useQuery({
    queryFn: () => ChatsServices.getMessages(chatId),
    queryKey: ChatQuerysKeys.getMessages(chatId),
  })
}

export type PostMessageBody = Parameters<typeof ChatsServices.postMessage>[0]

const usePostMessage = (chatId: number) => {
  return useMutation({
    mutationFn: (body: PostMessageBody) =>
      ChatsServices.postMessage(body, chatId),
    mutationKey: ChatMutationsKeys.postMessage(chatId),
  })
}

export { useGetChatMessages, useGetChats, useInitChat, usePostMessage }
