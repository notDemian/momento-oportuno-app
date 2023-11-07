import { memo, useCallback, useMemo, useState } from 'react'
import { ListRenderItem, Switch } from 'react-native'

import { Ad } from '@src/api'
import {
  ActivityIndicator,
  Box,
  Button,
  List,
  RefreshControl,
  Text,
} from '@src/components'
import SvgEmptyBox from '@src/components/svgs/SvgEmptyBox'
import { useAccountStackNavigation, useMisAnuncios } from '@src/hooks'
import { AnuncioItem } from '@src/screens/SearchScreen/AnuncioItem/AnuncioItem'

const MisAnuncios = () => {
  const nav = useAccountStackNavigation()

  const renderItem = useCallback<ListRenderItem<Ad>>((anuncio) => {
    return <AnuncioItem data={anuncio.item} isMyAds />
  }, [])

  const [isOnlyPublished, setIsOnlyPublished] = useState(true)

  const {
    data: myAds,
    isLoading,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useMisAnuncios()

  const fetchMore = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, fetchNextPage])

  const flattenData = useMemo(
    () =>
      (myAds?.pages.flatMap((page) => page.data) ?? []).filter((ad) => {
        if (isOnlyPublished) {
          return ad.status === 'published'
        }
        return true
      }),
    [myAds, isOnlyPublished],
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
      <Box flexDirection='row' justifyContent='center' alignItems='center'>
        <Text>Todos</Text>
        <Switch
          value={isOnlyPublished}
          onValueChange={(val) => {
            setIsOnlyPublished(val)
          }}
        />
        <Text>Solo publicados</Text>
      </Box>
      {isLoading || !flattenData ? (
        <Box flex={1} justifyContent='center' alignItems='center'>
          <ActivityIndicator />
        </Box>
      ) : (
        <List<Ad>
          renderItem={renderItem}
          data={flattenData}
          ListEmptyComponent={ListEmptyComponent}
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          onEndReached={fetchMore}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
        />
      )}
    </>
  )
}

export default memo(MisAnuncios)
