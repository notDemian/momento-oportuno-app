import { memo, useCallback } from 'react'
import { ListRenderItem } from 'react-native'

import { AdFavorite } from '@src/api'
import {
  ActivityIndicator,
  Box,
  List,
  RefreshControl,
  Text,
} from '@src/components'
import SvgEmptyBox from '@src/components/svgs/SvgEmptyBox'
import { useMyFavorites } from '@src/hooks'
import { AnuncioItem } from '@src/screens/SearchScreen/AnuncioItem/AnuncioItem'

const Favoritos = () => {
  const { data, isLoading, refetch } = useMyFavorites()

  const ListEmptyComponent = useCallback(() => {
    return !isLoading ? (
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
    ) : (
      <>
        <ActivityIndicator />
      </>
    )
  }, [isLoading])

  const renderItem: ListRenderItem<AdFavorite> = useCallback(({ item }) => {
    return <AnuncioItem data={item} isFav />
  }, [])

  return (
    <>
      {isLoading || !data?.data ? (
        <ActivityIndicator />
      ) : (
        <List<AdFavorite>
          renderItem={renderItem}
          data={data.data}
          ListEmptyComponent={ListEmptyComponent}
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
        />
      )}
    </>
  )
}

export default memo(Favoritos)
