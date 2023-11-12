import { memo, useCallback } from 'react'
import { ListRenderItem } from 'react-native'

import { ChatItem } from './ChatItem'

import { Chat } from '@src/api'
import {
  Box,
  List,
  LoadingPageModal,
  RefreshControl,
  Text,
} from '@src/components'
import { SvgEmptyMsg } from '@src/components/svgs'
import { useGetMyChats } from '@src/hooks'

const Mensajes = () => {
  const {
    data: chats,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useGetMyChats()

  const renderItem = useCallback<ListRenderItem<Chat>>(({ item }) => {
    return <ChatItem chat={item} />
  }, [])

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
        <SvgEmptyMsg />
      </Box>
    )
  }, [])

  if (isLoading) return <LoadingPageModal loading={isLoading} />

  if (isError) return <Text>Hubo un error</Text>

  if (!isSuccess) return null

  const chatsSorted = chats.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  return (
    <List
      renderItem={renderItem}
      data={chatsSorted}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    />
  )
}

export default memo(Mensajes)
