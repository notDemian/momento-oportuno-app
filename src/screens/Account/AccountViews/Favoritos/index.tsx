import { FC, memo, useCallback } from 'react'
import { ListRenderItem } from 'react-native'

import {
  Box,
  ContentLoader,
  List,
  LoadingPageModal,
  Text,
} from '@src/components'
import SvgEmptyBox from '@src/components/svgs/SvgEmptyBox'
import { useAnuncio, useFavorites } from '@src/hooks'
import { AnuncioItem } from '@src/screens/SearchScreen/AnuncioItem/AnuncioItem'

const RenderItem: FC<{ id: number }> = ({ id }) => {
  const { data } = useAnuncio(id)

  if (!data) return <ContentLoader />

  return <AnuncioItem data={data} isFav />
}
const Favoritos = () => {
  const { data, isLoading } = useFavorites()
  console.log({ data })

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

  const renderItem: ListRenderItem<number> = useCallback(({ item }) => {
    return <RenderItem id={item} />
  }, [])

  return (
    <>
      {isLoading && <LoadingPageModal loading />}
      <List<number>
        renderItem={renderItem}
        data={data ?? []}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </>
  )
}

export default memo(Favoritos)
