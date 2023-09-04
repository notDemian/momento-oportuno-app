import { memo, useCallback } from 'react'
import { ListRenderItem } from 'react-native'

import { Anuncio } from '@src/api'
import { Box, List, Text } from '@src/components'
import SvgEmptyBox from '@src/components/svgs/SvgEmptyBox'

const Favoritos = () => {
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
          No has agregado publicaciones a favoritos
        </Text>
        <SvgEmptyBox />
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

export default memo(Favoritos)
