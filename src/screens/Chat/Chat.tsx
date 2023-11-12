import { type FC, useCallback } from 'react'
import { ListRenderItem } from 'react-native'

import { MessageItem } from './MessageItem'

import { BaseChatMessage } from '@src/api'
import {
  Box,
  Button,
  ChatInputComponent,
  List,
  LoadingPageModal,
  RefreshControl,
  Text,
} from '@src/components'
import { useGetChatMessages } from '@src/hooks'
import { AccountStackParamList, ScreenProps } from '@src/navigation'
import { useAppTheme } from '@src/theme'

type ChatScreenProps = ScreenProps<AccountStackParamList, 'Chat'>
export const ChatScreen: FC<ChatScreenProps> = ({
  navigation,
  route: {
    params: { id },
  },
}) => {
  const {
    data: messages,
    error,
    isLoading,
    isSuccess,
    refetch,
  } = useGetChatMessages(id)

  const { colors } = useAppTheme()

  const renderItem = useCallback<ListRenderItem<BaseChatMessage>>(
    ({ item }) => {
      return <MessageItem message={item} />
    },
    [],
  )

  const ListEmptyComponent = useCallback(() => {
    return (
      <Box
        flex={1}
        justifyContent='center'
        alignItems='center'
        backgroundColor={'background'}
      >
        <Text variant='header' textAlign={'center'} m={'l'}>
          No tienes mensajes por el momento
        </Text>
        <Button
          onPress={() => navigation.goBack()}
          label='Regresar'
          variant='primary'
        />
      </Box>
    )
  }, [])

  if (isLoading) return <LoadingPageModal loading={isLoading} />

  if (error || !isSuccess) {
    return (
      <Box flex={1} justifyContent='center' alignItems='center'>
        <Text variant='header'>Hubo un error :{'('}</Text>
        <Button onPress={() => navigation.goBack()} label='Regresar' />
      </Box>
    )
  }

  const sorted = messages.sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  })

  return (
    <Box flex={1} backgroundColor={'background'}>
      <List
        renderItem={renderItem}
        data={sorted}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={{
          backgroundColor: colors.background,
        }}
        style={{
          backgroundColor: colors.background,
        }}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      />
      <ChatInputComponent chatId={id} />
    </Box>
  )
}
