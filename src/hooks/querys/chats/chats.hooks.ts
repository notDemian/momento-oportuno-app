import { useMutation, useQuery, useQueryClient } from 'react-query'

import { ChatMutationsKeys, ChatQuerysKeys } from './chats.keys'

import { ChatsServices } from '@src/api'

type EnableProps = {
  enabled?: boolean
}
const ONE_MIN_MS = 1000 * 60 * 0.2

const useGetMyChats = (props?: EnableProps) => {
  const { enabled = true } = props ?? {}

  return useQuery({
    queryFn: ChatsServices.getMyChats,
    queryKey: ChatQuerysKeys.getMyChats,
    enabled,
    refetchInterval: enabled ? ONE_MIN_MS : false,
  })
}

const useInitChat = (listingId: number) => {
  const qC = useQueryClient()

  return useMutation({
    mutationFn: () => ChatsServices.initializeChat(listingId),
    mutationKey: ChatMutationsKeys.initializeChat(listingId),
    onSuccess: () => {
      qC.invalidateQueries(ChatQuerysKeys.getMyChats)
    },
  })
}

const useGetChatMessages = (chatId: number, props?: EnableProps) => {
  const { enabled = true } = props ?? {}
  return useQuery({
    queryFn: () => ChatsServices.getMessages(chatId),
    queryKey: ChatQuerysKeys.getMessages(chatId),
    enabled,
    // refetchInterval: 1000,
    refetchInterval: enabled ? ONE_MIN_MS : false,
  })
}

export type PostMessageBody = Parameters<typeof ChatsServices.postMessage>[0]

const usePostMessage = (chatId: number) => {
  const qC = useQueryClient()

  return useMutation({
    mutationFn: (body: PostMessageBody) =>
      ChatsServices.postMessage(body, chatId),
    mutationKey: ChatMutationsKeys.postMessage(chatId),
    onSuccess: () => {
      qC.invalidateQueries(ChatQuerysKeys.getMessages(chatId))
    },
  })
}

export { useGetChatMessages, useGetMyChats, useInitChat, usePostMessage }
