import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Constants } from '../../../utils/constants'

import { ChatMutationsKeys, ChatQuerysKeys } from './chats.keys'

import {
  Pusher,
  // PusherMember,
  // PusherChannel,
  // PusherEvent,
  // PusherAuthorizerResult
} from '@pusher/pusher-websocket-react-native'
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

const instance = Pusher.getInstance()

const CHAT_PREFIX = 'chat.' as const

function getChatChannel(chatId: number) {
  return `${CHAT_PREFIX}${chatId}`
}

async function initialize({
  channelName,
  onEvent,
}: Pick<Parameters<typeof instance.subscribe>[0], 'channelName' | 'onEvent'>) {
  await instance.init({
    apiKey: Constants.PUSHER.key,
    cluster: Constants.PUSHER.cluster,
  })

  await instance.connect()

  const channel = await instance.subscribe({
    channelName,
    onEvent,
  })

  return channel
}

const useGetChatMessages = (chatId: number, props?: EnableProps) => {
  const [incomingMessage, setIncomingMessage] = useState<unknown>()

  useEffect(() => {
    async function init() {
      const channelName = getChatChannel(chatId)
      const channel = await initialize({
        channelName,
        onEvent: function (event) {
          console.log('event', event)
          setIncomingMessage(event)
        },
      })

      return channel.unsubscribe
    }
    init()
  }, [chatId])

  const { enabled = true } = props ?? {}
  const messageQuery = useQuery({
    queryFn: () => ChatsServices.getMessages(chatId),
    queryKey: ChatQuerysKeys.getMessages(chatId),
    enabled,

    // refetchInterval: 1000,
    refetchInterval: enabled ? ONE_MIN_MS : false,
  })

  return { ...messageQuery, incomingMessage }
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
