import { memo, useCallback } from 'react'
import { ListRenderItem } from 'react-native'

import { Ad } from '@src/api'
import { ActivityIndicator, Box, Button, List, Text } from '@src/components'
import SvgEmptyBox from '@src/components/svgs/SvgEmptyBox'
import { useAccountStackNavigation, useMisAnuncios } from '@src/hooks'
import { AnuncioItem } from '@src/screens/SearchScreen/AnuncioItem/AnuncioItem'

const MisAnuncios = () => {
  const nav = useAccountStackNavigation()

  const renderItem = useCallback<ListRenderItem<Ad>>((anuncio) => {
    return <AnuncioItem data={anuncio.item} isFav />
  }, [])

  const { data: myAds, isLoading } = useMisAnuncios()

  const ListEmptyComponent = useCallback(() => {
    return (
      <Box
        flex={1}
        justifyContent='center'
        alignItems='center'
        backgroundColor={'background'}
      >
        <Text variant='header' textAlign={'center'} m={'l'}>
          No tienes publicaciones activas ahora
        </Text>
        <SvgEmptyBox />
        <Button
          label='Publicar aviso'
          variant={'secondary'}
          margin={'l'}
          onPress={() => {
            nav.navigate('NewAnuncioForm')
          }}
        />
      </Box>
    )
  }, [])

  return (
    <>
      {isLoading || !myAds?.data ? (
        <Box flex={1} justifyContent='center' alignItems='center'>
          <ActivityIndicator />
        </Box>
      ) : (
        <List<Ad>
          renderItem={renderItem}
          data={myAds?.data}
          ListEmptyComponent={ListEmptyComponent}
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  )
}

export default memo(MisAnuncios)
