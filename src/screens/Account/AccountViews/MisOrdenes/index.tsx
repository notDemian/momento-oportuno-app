import { memo, useCallback } from 'react'
import { ListRenderItem } from 'react-native'

import { Anuncio } from '@src/api'
import { Box, Button, List, Text } from '@src/components'
import { SvgEmptyBox } from '@src/components/svgs'
import { useAccountStackNavigation } from '@src/hooks'

const MisOrdenes = () => {
  const nav = useAccountStackNavigation()

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
          Aún no tienes ningún pedido
        </Text>
        <SvgEmptyBox />
        <Button
          variant={'secondary'}
          label='Comprar paquete'
          margin={'l'}
          onPress={() => {
            nav.navigate('NewAnuncioForm')
          }}
        />
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

export default memo(MisOrdenes)
