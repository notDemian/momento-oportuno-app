import React from 'react'
import { Carousel, Section, Card, PlaceCardInfo } from '@src/components'
import { Dimensions } from 'react-native'
import { type SimplePlace, mockPlaces } from '@src/data'
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types'
import { PopularPlacesProps } from './PopularPlaces.type'

export const PopularPlaces: React.FC<PopularPlacesProps> = ({ navigation }) => {
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

  const onButtonActionPress = () => {
    navigation.navigate('PlaceList', { title: 'Popular Near You' })
  }

  const onPlaceItemPress = () => {
    navigation.navigate('PlaceDetails')
  }

  return (
    <Section
      title='Lugares'
      actionButtonText='Ver todos'
      onButtonActionPress={onButtonActionPress}
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
