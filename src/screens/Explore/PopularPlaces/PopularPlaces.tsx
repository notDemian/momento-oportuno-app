import React from 'react'
import { Dimensions } from 'react-native'
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types'

import { Estado } from '@src/api'
import { Card, Carousel, ContentLoader, Section } from '@src/components'
import { mockPlaces } from '@src/data'
import { useExploreStackNavigation } from '@src/hooks'
import { CLOG } from '@src/utils'

export const PopularPlaces: React.FC<{
  estados: Estado[] | null | undefined
}> = ({ estados }) => {
  CLOG(estados?.[0])

  const renderItem = (props: CarouselRenderItemInfo<Estado>) => {
    const { image, title, id } = props.item
    return (
      <Card
        key={id}
        coverImage={image}
        coverImageSize='m'
        title={title}
        titleProps={{
          color: 'white',
        }}
        marginLeft='m'
        onPress={onPlaceItemPress}
        shouldFillCoverImage
      />
    )
  }

  const nav = useExploreStackNavigation()

  const onPlaceItemPress = () => {
    nav.navigate('SearchTab', { screen: 'Search' })
  }

  const onDirectory = () => {
    nav.navigate('MicroSitios')
  }

  return (
    <Section
      title='Lugares'
      actionButtonText='Ir a Directorio'
      onButtonActionPress={onDirectory}
    >
      {estados ? (
        <Carousel
          width={Dimensions.get('window').width}
          height={300}
          numItemsPerSlide={2.6}
          data={mockPlaces}
          snapEnabled
          renderItem={renderItem}
        />
      ) : (
        <Carousel
          width={Dimensions.get('window').width}
          height={300}
          numItemsPerSlide={2.6}
          data={new Array(4).fill(null)}
          snapEnabled
          renderItem={(props) => {
            return <ContentLoader />
          }}
        />
      )}
    </Section>
  )
}
