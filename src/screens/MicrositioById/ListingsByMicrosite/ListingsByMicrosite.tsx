import React, { useCallback, useMemo } from 'react'
import { ListRenderItem } from 'react-native'

import { MicrositeWithListings } from '@src/api/Micrositios/Micrositios.module'
import { ContentLoader } from '@src/components'
import { Box, Card, List, Text } from '@src/components/elements'
import { RecommendedCardInfo } from '@src/components/RecommendedCardInfo'
import { useAnuncioByid, useMicrositiosStackNavigation } from '@src/hooks'
import { useAppTheme } from '@src/theme'
import { getImageUrl } from '@src/utils'

type ListingsByMicrositeProps = {
  user: MicrositeWithListings['user']
  name: string
}

const Render: ListRenderItem<{ id: number }> = ({ item: { id } }) => {
  const { data: ad, error, isLoading: adLoading } = useAnuncioByid(id, true)
  const nav = useMicrositiosStackNavigation()

  if (adLoading) return <ContentLoader />

  if (error || !ad) return <Box />

  const { image, media, title } = ad.data

  return (
    <Card
      key={id}
      coverImage={getImageUrl({ url: image, media: media?.[0] })}
      coverImageSize='m'
      title={title}
      marginLeft='m'
      titleProps={{
        numberOfLines: 1,
      }}
      backgroundColor={'white'}
      onPress={() => {
        nav.jumpTo('SearchTab', {
          screen: 'AnuncioDetailsModal',
          params: { data: { id } },
          initial: false,
        })
      }}
    >
      <RecommendedCardInfo data={ad.data} />
    </Card>
  )
}

export const ListingsByMicrosite: React.FC<ListingsByMicrositeProps> = ({
  user,
  name,
}) => {
  const renderItem = useCallback<ListRenderItem<{ id: number }>>((props) => {
    return (
      <Box width={300} height={250}>
        <Render {...props} />
      </Box>
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
          No hay anuncios
        </Text>
      </Box>
    )
  }, [])

  const theme = useAppTheme()

  const filtered = useMemo(() => {
    if (!user.listings) return []

    return user.listings.filter((item) => {
      return item.status === 'published'
    })
  }, [user.listings])

  return filtered.length > 0 ? (
    <List<{ id: number }>
      renderItem={renderItem}
      data={filtered}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={{
        alignItems: 'center',
        backgroundColor: theme.colors.background,
      }}
      scrollEnabled={false}
      nestedScrollEnabled={false}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => null}
    />
  ) : null
}
