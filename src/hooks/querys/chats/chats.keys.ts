export const ChatQuerysKeys = {
  getMyChats: 'getMyChats',
  getMessages: (chatId: number) => ['getMessages', chatId],
} as const

export const ChatMutationsKeys = {
  initializeChat: (chatId: number) => ['initializeChat', chatId],
  postMessage: (chatId: number) => ['postMessage', chatId],
} as const
