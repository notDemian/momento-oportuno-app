import { Fragment, memo, useCallback } from 'react'
import { ListRenderItem } from 'react-native'

import {} from '@src/api'
import { Box, List, Text } from '@src/components'
import { SvgEmptyMsg } from '@src/components/svgs'
import { useGetChats } from '@src/hooks'

const Mensajes = () => {
  const { data: chats, isLoading } = useGetChats()

  const renderItem = useCallback<ListRenderItem<unknown>>((anuncio) => {
    return (
      <Fragment>
        <Text>hola!</Text>
      </Fragment>
    )
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

  return (
    <List
      renderItem={renderItem}
      data={[]}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default memo(Mensajes)
