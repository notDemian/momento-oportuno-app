import React, { useCallback } from 'react'
import { Dimensions } from 'react-native'
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types'

import { Ad } from '@src/api'
import { MicrositeWithListings } from '@src/api/Micrositios/Micrositios.module'
import { ContentLoader } from '@src/components'
import { Box, Card, Carousel, Section } from '@src/components/elements'
import { RecommendedCardInfo } from '@src/components/RecommendedCardInfo'
import { useAnuncioByid, useMicrositiosStackNavigation } from '@src/hooks'
import { getImageUrl } from '@src/utils'

type ListingsByMicrositeProps = {
  user: MicrositeWithListings['user']
}

const Render = ({ item: { id } }: CarouselRenderItemInfo<Ad>) => {
  const { data: ad, error, isLoading: adLoading } = useAnuncioByid(id)
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
}) => {
  const renderItem = useCallback((props: CarouselRenderItemInfo<Ad>) => {
    return <Render {...props} />
  }, [])

  return user.listings && user.listings.length > 0 ? (
    <Section title={`Anuncios del usuario ${user.name}`}>
      <Carousel
        numItemsPerSlide={1.4}
        data={user.listings}
        width={Dimensions.get('window').width}
        renderItem={renderItem}
        height={250}
      />
    </Section>
  ) : null
}
