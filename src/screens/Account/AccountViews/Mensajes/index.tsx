import { memo, useCallback } from 'react'
import { ListRenderItem } from 'react-native'

import { Anuncio } from '@src/api'
import { Box, List, Text } from '@src/components'
import { SvgEmptyMsg } from '@src/components/svgs'

const Mensajes = () => {
  const renderItem = useCallback<ListRenderItem<Anuncio>>((anuncio) => {
    return <Text>{anuncio.item.content.rendered}</Text>
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
        {/* <Button
          label='Publicar aviso'
          variant={'secondary'}
          margin={'l'}
          onPress={() => {
            nav.navigate('NewAnuncioTab', { screen: 'NewAnuncioForm' })
          }}
        /> */}
      </Box>
    )
  }, [])

  return (
    <List<Anuncio>
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
