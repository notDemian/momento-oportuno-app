import React from 'react'
import { Dimensions } from 'react-native'
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types'

import { Card,Carousel, Section } from '@src/components'
import { mockPlaces,type SimplePlace } from '@src/data'
import { useExploreStackNavigation } from '@src/hooks'

export const PopularPlaces: React.FC = () => {
  const renderItem = (props: CarouselRenderItemInfo<SimplePlace>) => {
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

  // const onButtonActionPress = () => {
  //   navigation.navigate('PlaceList', { title: 'Popular Near You' })
  // }

  const onPlaceItemPress = () => {
    nav.navigate('SearchTab', { screen: 'Search' })
  }

  return (
    <Section
      title='Lugares'
      // actionButtonText='Ver todos'
      // onButtonActionPress={onButtonActionPress}
    >
      <Carousel
        width={Dimensions.get('window').width}
        height={300}
        numItemsPerSlide={2.6}
        data={mockPlaces}
        snapEnabled
        renderItem={renderItem}
      />
    </Section>
  )
}
